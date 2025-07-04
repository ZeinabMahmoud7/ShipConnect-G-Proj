// PaymentModal.jsx
import React, { useState } from 'react';
import {
  FaCcVisa, FaCcMastercard, FaPlus, FaUser,
  FaCreditCard, FaLock, FaCalendar
} from 'react-icons/fa';
import { CheckCircle, XCircle, MessageCircle } from 'lucide-react';

export default function PaymentModal({ offerId, onClose, onConfirm }) {
  const [cards, setCards] = useState([
    { id: 1, type: 'Visa', bank: 'Axis Bank', last4: '2345', icon: <FaCcVisa className="text-blue-600 text-2xl" /> },
    { id: 2, type: 'MasterCard', bank: 'Axis Bank', last4: '6789', icon: <FaCcMastercard className="text-red-600 text-2xl" /> },
  ]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [confirmStep, setConfirmStep] = useState('checkout');
  const [showAddCardForm, setShowAddCardForm] = useState(false);
  const [newCard, setNewCard] = useState({ name: '', number: '', cvv: '', expiry: '' });
  const [errors, setErrors] = useState({});

  const validateCard = () => {
    const errs = {};
    if (!newCard.name.trim()) errs.name = 'Name is required';
    if (!/^\d{16}$/.test(newCard.number)) errs.number = 'Card number must be 16 digits';
    if (!/^\d{3,4}$/.test(newCard.cvv)) errs.cvv = 'CVV must be 3 or 4 digits';
    if (!/^(0[1-9]|1[0-2])\/(\d{2})$/.test(newCard.expiry)) errs.expiry = 'Expiry must be in MM/YY format';
    return errs;
  };

  const handleAddCard = () => {
    const validationErrors = validateCard();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const last4 = newCard.number.slice(-4);
    const newCardData = {
      id: Date.now(),
      type: 'Visa',
      bank: newCard.name,
      last4,
      icon: <FaCcVisa className="text-blue-600 text-2xl" />,
    };
    setCards([...cards, newCardData]);
    setShowAddCardForm(false);
    setSelectedCard(newCardData.id);
    setNewCard({ name: '', number: '', cvv: '', expiry: '' });
    setErrors({});
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-[90%] max-w-md rounded-xl p-6 relative text-center min-h-[360px] flex flex-col justify-center items-center">
        <button onClick={onClose} className="absolute top-2 right-4 text-gray-500 hover:text-red-500 text-2xl font-bold">&times;</button>

        {/* Step 1: Card Selection */}
        {confirmStep === 'checkout' && !showAddCardForm && (
          <>
            <h2 className="text-lg font-semibold text-[#1E2A3C] mb-6">Select Card for payment</h2>
            <div className="bg-[#F1F5FA] rounded-xl p-5 w-full">
              <h3 className="text-sm text-gray-600 mb-4 flex items-center justify-center gap-2">
                <FaCreditCard className="text-gray-600" /> Your Credit Cards
              </h3>
              <div className="space-y-3 mb-4">
                {cards.map((card) => (
                  <div
                    key={card.id}
                    onClick={() => setSelectedCard(card.id)}
                    className={`flex items-center justify-between p-3 rounded-lg cursor-pointer border transition-all ${
                      selectedCard === card.id ? 'border-blue-500 bg-white' : 'border-gray-300'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {card.icon}
                      <span className="text-sm text-gray-700">
                        {card.bank} ****{card.last4}
                      </span>
                    </div>
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                      selectedCard === card.id ? 'border-blue-600' : 'border-gray-400'
                    }`}>
                      {selectedCard === card.id && <div className="w-2 h-2 bg-blue-600 rounded-full"></div>}
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setShowAddCardForm(true)}
                className="w-full flex items-center justify-center gap-2 bg-[#D3E4FA] hover:bg-[#bcd8f7] text-[#204C80] py-2 rounded-md mb-4"
              >
                <FaPlus /> Add Card
              </button>

              <button
                disabled={!selectedCard}
                onClick={() => setConfirmStep('confirm')}
                className={`w-full py-2 rounded-md font-semibold ${
                  selectedCard ? 'bg-[#A9BFCF] text-white hover:bg-[#90a6b7]' : 'bg-[#DDE3EB] text-gray-400 cursor-not-allowed'
                }`}
              >
                Checkout
              </button>
            </div>
          </>
        )}

        {/* Step 2: Add Card Form */}
        {showAddCardForm && (
          <div className="bg-[#F1F5FA] rounded-xl p-5 w-full">
            <h3 className="text-sm text-gray-600 mb-4 flex items-center justify-center gap-2">
              <FaCreditCard className="text-gray-600" /> Add New Card
            </h3>
            <div className="space-y-4">
              {/* Name */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-full px-3 py-2 gap-2">
                  <FaUser className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter Name"
                    value={newCard.name}
                    onChange={(e) => setNewCard({ ...newCard, name: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.name && <span className="text-red-500 text-xs ml-3 mt-1">{errors.name}</span>}
              </div>

              {/* Number */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-full px-3 py-2 gap-2">
                  <FaCreditCard className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter Card Number"
                    value={newCard.number}
                    onChange={(e) => setNewCard({ ...newCard, number: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.number && <span className="text-red-500 text-xs ml-3 mt-1">{errors.number}</span>}
              </div>

              {/* CVV */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-full px-3 py-2 gap-2">
                  <FaLock className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="Enter CVV"
                    value={newCard.cvv}
                    onChange={(e) => setNewCard({ ...newCard, cvv: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.cvv && <span className="text-red-500 text-xs ml-3 mt-1">{errors.cvv}</span>}
              </div>

              {/* Expiry */}
              <div className="flex flex-col">
                <div className="flex items-center border rounded-full px-3 py-2 gap-2">
                  <FaCalendar className="text-gray-500" />
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={newCard.expiry}
                    onChange={(e) => setNewCard({ ...newCard, expiry: e.target.value })}
                    className="w-full bg-transparent outline-none text-sm"
                  />
                </div>
                {errors.expiry && <span className="text-red-500 text-xs ml-3 mt-1">{errors.expiry}</span>}
              </div>

              <button onClick={handleAddCard} className="w-full bg-[#204C80] text-white py-2 rounded-full mt-4">
                Add
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm Checkout */}
        {confirmStep === 'confirm' && (
          <>
            <p className="text-[#1E2A3C] font-semibold text-lg mb-6">Confirm checkout</p>
            <div className="flex justify-center gap-4">
              <button onClick={onClose} className="flex items-center gap-1 border border-[#204C80] text-[#204C80] px-4 py-2 rounded-full hover:bg-[#EDF4FB]">
                <XCircle size={16} /> Cancel
              </button>
              <button onClick={() => setConfirmStep('done')} className="flex items-center gap-1 bg-[#204C80] text-white px-4 py-2 rounded-full hover:bg-[#16365C]">
                <CheckCircle size={16} /> Confirm
              </button>
            </div>
          </>
        )}

        {/* Step 4: Done - Show success message and Connect */}
        {confirmStep === 'done' && (
          <div className="flex flex-col items-center gap-3">
            <CheckCircle className="text-[#23D481] w-6 h-6" />
            <p className="text-[#23D481] font-bold text-center leading-snug text-[16px]">
              Done and can contact with <br /> shipping company
            </p>
          <button
  onClick={() => onConfirm(offerId)}
  className="bg-[#23D481] text-white text-sm px-6 py-2 rounded-full flex items-center gap-2"
>
  <MessageCircle size={16} /> Connect
</button>

          </div>
        )}
      </div>
    </div>
  );
}
