import axios from 'axios';
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext'; // Import useAuth to get the current user's ID
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode the token
import toast from 'react-hot-toast'; // Import toast for notifications

const OffersContext = createContext();

export const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState([]); // Original data from the API
  const [approvedChats, setApprovedChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [activeChatId, setActiveChatId] = useState('');

  const { user } = useAuth(); // Get the authenticated user from AuthContext
  // Use user?.userId as currentUserId. For testing without full auth, you might temporarily mock it.
  const currentUserId = user?.userId || "MOCK_USER_ID_FOR_TESTING"; // TEMPORARY MOCK: REMOVE IN PRODUCTION

  // Helper function to find the active offer data
  const findActiveOfferData = useCallback((idToFind) => {
    if (!offers || offers.length === 0) {
      return null;
    }
    // Flatten the offers array from all shipments and find the matching offer
    const foundOffer = offers.flatMap(shipment => shipment.offers).find(o => o.offerId.toString() === idToFind);
    // Log the found offer data to help diagnose missing properties
    console.log("activeOfferData found by findActiveOfferData:", foundOffer);
    return foundOffer;
  }, [offers]); // Dependency on 'offers' state

  // Function to fetch messages for a specific chat
  const fetchMessages = useCallback(async (offerId) => {
    if (!offerId || !currentUserId) {
      console.warn("Cannot fetch messages: offerId or currentUserId is missing.");
      return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Authentication token not found.");
      toast.error("Authentication required to fetch messages.");
      return;
    }

    const activeOfferData = findActiveOfferData(offerId);
    console.log("activeOfferData used for fetching messages API call:", activeOfferData); // Added log

    if (!activeOfferData) {
      console.error(`Active offer with ID ${offerId} not found in current offers data for fetching messages.`);
      toast.error("Selected chat not found. Please re-select.");
      return;
    }

    // Extract receiverId and shipmentId from the found offer data
    // IMPORTANT: Based on your console logs, activeOfferData does NOT contain 'companyId' or 'shipmentId'.
    // You MUST inspect the full API response from /api/Offer/ShipmentOffers to find the correct property names.
    // For now, these will likely still be undefined if your API response doesn't include them.
    const receiverId = activeOfferData.companyId; // Reverted to companyId, but might still be undefined
    const shipmentId = activeOfferData.shipmentId; // Might still be undefined

    if (!receiverId || shipmentId === undefined) { // Check for undefined or null for shipmentId
        console.error(`Missing receiverId (${receiverId}) or shipmentId (${shipmentId}) for offer ${offerId}. Cannot fetch messages.`);
        toast.error("Chat details incomplete. Cannot fetch messages.");
        return;
    }

    console.log(`Fetching messages for Offer ID: ${offerId}, Sender: ${currentUserId}, Receiver: ${receiverId}, Shipment: ${shipmentId}`);

    try {
      const response = await axios.get('/api/Chat/messages', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          SenderId: currentUserId, // Current user is the sender
          ReceiverId: receiverId, // The company is the receiver
          ShipmentId: shipmentId, // The associated shipment ID
          PageIndex: 0,
          PageSize: 100 // Fetch a reasonable number of messages
        }
      });

      if (response.data?.success && response.data?.data?.items) {
        const fetchedMsgs = response.data.data.items.map(msg => ({
          from: msg.senderId === currentUserId ? 'Me' : activeOfferData.company, // Determine sender
          text: msg.content,
          sentAt: msg.sentAt
        }));
        setMessages(prev => ({
          ...prev,
          [offerId]: fetchedMsgs
        }));
        console.log(`Successfully fetched messages for offer ${offerId}:`, fetchedMsgs);
      } else {
        console.error("Failed to fetch messages:", response.data?.message);
        toast.error(`Failed to fetch messages: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (err) {
      console.error(`❌ Error fetching messages for offer ${offerId}:`, err);
      toast.error("Error fetching messages. Please try again.");
    }
  }, [currentUserId, findActiveOfferData]); // Add findActiveOfferData to dependencies

  // Fetch Offers from API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error("Authentication token not found for fetching offers.");
          toast.error("Authentication required to fetch offers.");
          return;
        }

        const response = await axios.get('/api/Offer/ShipmentOffers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const shipmentList = response.data?.data || [];
        setOffers(shipmentList);
        console.log("✅ Full API Shipment List (OffersContext):", shipmentList); // Log full list
        
        // Log individual offer objects for detailed inspection
        shipmentList.forEach((shipment, sIdx) => {
          shipment.offers.forEach((offer, oIdx) => {
            console.log(`Individual Offer Object (Shipment ${sIdx}, Offer ${oIdx}):`, offer);
          });
        });


        // Initialize messages state for each offer, but don't fetch yet
        const initialMessages = {};
        shipmentList.forEach((shipment) => {
          shipment.offers.forEach((offer) => {
            const id = offer.offerId.toString();
            initialMessages[id] = []; // Start with an empty array, messages will be fetched on activation
          });
        });
        setMessages(initialMessages);

        // Select the first offer to activate the conversation (if any)
        // This should run AFTER offers are set
     if (!activeChatId && shipmentList.length > 0) {
  const firstOfferId = shipmentList[0]?.offers?.[0]?.offerId?.toString();
  if (firstOfferId && isOfferPaid(firstOfferId)) {
    setActiveChatId(firstOfferId);
  }
}


      } catch (err) {
        console.error('❌ Error fetching offers:', err);
        toast.error("Error fetching offers. Please try again.");
      }
    };

    fetchOffers();
  }, [activeChatId]); // Re-run when activeChatId changes to ensure initial fetch if not set


  // Effect to fetch messages when activeChatId changes, and offers are loaded
  useEffect(() => {
    if (activeChatId && offers.length > 0) { // Ensure offers are loaded before trying to fetch messages
      fetchMessages(activeChatId);
    }
  }, [activeChatId, offers, fetchMessages]); // Add offers and fetchMessages to dependencies

  const handleApprove = (id) => {
    if (!approvedChats.includes(id)) {
      setApprovedChats((prev) => [...prev, id]);
    }
  };

  const onSend = async () => {
    if (!input.trim() || !activeChatId || !currentUserId) {
        console.warn("Cannot send message: input, activeChatId, or currentUserId is missing.");
        toast.error("Please type a message and select a chat to send.");
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Authentication token not found.");
      toast.error("Authentication required to send messages.");
      return;
    }

    const activeOfferData = findActiveOfferData(activeChatId);
    console.log("activeOfferData used for sending message API call:", activeOfferData); // Added log

    if (!activeOfferData) {
      console.error(`Active offer with ID ${activeChatId} not found in current offers data for sending message.`);
      toast.error("Selected chat not found. Please re-select.");
      return;
    }

    // Extract receiverId and shipmentId from the found offer data
    // IMPORTANT: Based on your console logs, activeOfferData does NOT contain 'companyId' or 'shipmentId'.
    // You MUST inspect the full API response from /api/Offer/ShipmentOffers to find the correct property names.
    const receiverId = activeOfferData.companyId; // Might still be undefined
    const shipmentId = activeOfferData.shipmentId; // Might still be undefined

    if (!receiverId || shipmentId === undefined) { // Check for undefined or null for shipmentId
        console.error(`Missing receiverId (${receiverId}) or shipmentId (${shipmentId}) for offer ${activeChatId}. Cannot send message.`);
        toast.error("Chat details incomplete. Cannot send message.");
        return;
    }

    const messagePayload = {
      content: input,
      senderId: currentUserId,
      receiverId: receiverId,
      shipmentId: shipmentId
    };

    console.log("Attempting to send message with payload:", messagePayload);

    try {
      const response = await axios.post('/api/Chat/send', messagePayload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.data?.success) {
        console.log("Message sent successfully:", response.data.data);
        // Optimistically update UI with the sent message
        setMessages((prev) => ({
          ...prev,
          [activeChatId]: [
            ...(prev[activeChatId] || []),
            { from: 'Me', text: input, sentAt: new Date().toISOString() }, // Add sentAt for consistency
          ],
        }));
        setInput('');
        // Re-fetch messages after sending to ensure consistency with backend
        fetchMessages(activeChatId);
      } else {
        console.error("Failed to send message:", response.data?.message);
        toast.error(`Failed to send message: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      toast.error("Failed to send message. Please try again.");
    }
  };
const markOfferPaid = (id) => {
  const key = "paidOffers";
  const paid = JSON.parse(localStorage.getItem(key) || "[]");
  const idStr = String(id);
  if (!paid.includes(idStr)) {
    const updated = [...paid, idStr];
    localStorage.setItem(key, JSON.stringify(updated));
    console.log(`[OffersContext] marked offer ${idStr} as PAID.`);
  }
};

const isOfferPaid = (id) => {
  const paid = JSON.parse(localStorage.getItem("paidOffers") || "[]");
  return paid.includes(String(id));
};

  return (
<OffersContext.Provider
  value={{
    offers,
    approvedChats,
    messages,
    input,
    setInput,
    activeChatId,
    setActiveChatId,
    handleApprove,
    onSend,
    isOfferPaid,        // ✅
    markOfferPaid,      // ✅
  }}
>

      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => useContext(OffersContext);
