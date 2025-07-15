import axios from 'axios';
import React, { createContext, useState, useContext, useEffect } from 'react';

const OffersContext = createContext();

export const OffersProvider = ({ children }) => {
  const [offers, setOffers] = useState([]); // البيانات الأصلية من الـ API
  const [approvedChats, setApprovedChats] = useState([]);
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState('');
  const [activeChatId, setActiveChatId] = useState('');

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
        console.log("✅ API Shipment List:", shipmentList);

        // تجهيز محادثات وهمية لكل offerId
        const initialMessages = {};
        shipmentList.forEach((shipment) => {
          shipment.offers.forEach((offer) => {
            const id = offer.offerId.toString();
            initialMessages[id] = [
              {
                from: shipment.shipmentCode,
                text: 'Hello, we are interested.',
              },
            ];
          });
        });
        setMessages(initialMessages);

        // اختيار أول عرض لتفعيل المحادثة (إن وجد)
        if (!activeChatId && shipmentList.length > 0) {
          const firstOfferId = shipmentList[0]?.offers?.[0]?.offerId?.toString();
          if (firstOfferId) {
            setActiveChatId(firstOfferId);
          }
        }

      } catch (err) {
        console.error('❌ Error fetching offers:', err);
      }
    };

    fetchOffers();
  }, []);

  const handleApprove = (id) => {
    if (!approvedChats.includes(id)) {
      setApprovedChats((prev) => [...prev, id]);
    }
  };

  const onSend = () => {
    if (!input.trim() || !activeChatId) return;

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [
        ...(prev[activeChatId] || []),
        { from: 'Me', text: input },
      ],
    }));
    setInput('');
  };

  return (
    <OffersContext.Provider
      value={{
        offers,            // [{ shipmentCode, offers: [...] }, ...]
        approvedChats,     // [offerId, ...]
        messages,          // { offerId: [...], ... }
        input,
        setInput,
        activeChatId,
        setActiveChatId,
        handleApprove,
        onSend,
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};

export const useOffers = () => useContext(OffersContext);
