import axios from 'axios';
import React, { createContext, useState, useContext, useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext'; // Import useAuth to get the current user's ID
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode the token

const OffersContext = createContext();

export const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState([]); // Original data from the API
  const [approvedChats, setApprovedChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [activeChatId, setActiveChatId] = useState('');
  const { user } = useAuth(); // Get the authenticated user from AuthContext
  const currentUserId = user?.userId; // Assuming email is the senderId for the current user

  // Helper function to find the active offer data
  const findActiveOfferData = useCallback((idToFind) => {
    if (!offers || offers.length === 0) {
      return null;
    }
    // Flatten the offers array from all shipments and find the matching offer
    const foundOffer = offers.flatMap(shipment => shipment.offers).find(o => o.offerId.toString() === idToFind);
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
      return;
    }

    const activeOfferData = findActiveOfferData(offerId);

    if (!activeOfferData) {
      console.error(`Active offer with ID ${offerId} not found in current offers data for fetching messages.`);
      // Do not proceed with API call if activeOfferData is not found
      return;
    }

    // Extract receiverId and shipmentId from the found offer data
    // IMPORTANT: Ensure these properties (companyId, shipmentId) exist in your actual offer objects
    const receiverId = activeOfferData.companyId; // Assuming 'companyId' is the receiver ID
    const shipmentId = activeOfferData.shipmentId; // Assuming 'shipmentId' is the shipment ID

    if (!receiverId || shipmentId === undefined) { // Check for undefined or null for shipmentId
        console.error(`Missing receiverId (${receiverId}) or shipmentId (${shipmentId}) for offer ${offerId}. Cannot fetch messages.`);
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
      }
    } catch (err) {
      console.error(`❌ Error fetching messages for offer ${offerId}:`, err);
    }
  }, [currentUserId, findActiveOfferData]); // Add findActiveOfferData to dependencies

  // Fetch Offers from API
  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('/api/Offer/ShipmentOffers', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const shipmentList = response.data?.data || [];
        setOffers(shipmentList);
        console.log("✅ API Shipment List (OffersContext):", shipmentList);

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
        return;
    }

    const token = localStorage.getItem('token');
    if (!token) {
      console.error("Authentication token not found.");
      return;
    }

    const activeOfferData = findActiveOfferData(activeChatId);

    if (!activeOfferData) {
      console.error(`Active offer with ID ${activeChatId} not found in current offers data for sending message.`);
      return;
    }

    // Extract receiverId and shipmentId from the found offer data
    const receiverId = activeOfferData.companyId; // Assuming 'companyId' is the receiver ID
    const shipmentId = activeOfferData.shipmentId; // Assuming 'shipmentId' is the shipment ID

    if (!receiverId || shipmentId === undefined) { // Check for undefined or null for shipmentId
        console.error(`Missing receiverId (${receiverId}) or shipmentId (${shipmentId}) for offer ${activeChatId}. Cannot send message.`);
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
        // Display a toast error to the user
        // toast.error(`Failed to send message: ${response.data?.message || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('❌ Error sending message:', error);
      // Display a toast error to the user
      // toast.error("Failed to send message. Please try again.");
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
