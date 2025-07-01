import React, { createContext, useState, useContext } from 'react';

const OffersContext = createContext();

export const OffersProvider = ({ children }) => {
  const [offers] = useState([
    {
      id: 'abc123',
      company: 'Swift Shipping',
      rating: 4.9,
      date: '05-05-2025',
      cost: 150,
    },
    {
      id: 'xyz789',
      company: 'Fast Express',
      rating: 4.7,
      date: '07-06-2025',
      cost: 175,
    },
  ]);

  const [approvedChats, setApprovedChats] = useState([]);
 const [messages, setMessages] = useState({
  abc123: [
    { from: 'Swift Shipping', text: 'hello,shipmnnts will be packaged' },
    { from: 'Me', text: 'ok , that is good' },
  ]
});

  const [input, setInput] = useState('');
const [activeChatId, setActiveChatId] = useState("abc123");


  const handleApprove = (id) => {
    if (!approvedChats.includes(id)) {
      setApprovedChats((prev) => [...prev, id]);
    }
  };

  const onSend = () => {
    if (!input.trim() || !activeChatId) return;

    setMessages((prev) => ({
      ...prev,
      [activeChatId]: [...(prev[activeChatId] || []), { from: 'Me', text: input }],
    }));
    setInput('');
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
      }}
    >
      {children}
    </OffersContext.Provider>
  );
};

// Custom hook
export const useOffers = () => useContext(OffersContext);
