import React from 'react';
import { useNavigate } from 'react-router-dom';
import OffersList from '../Components/OffersList/OffersList';
import { useOffers } from '../Context/OffersContext';// استدعاء الكونتكست

export default function Offers() {
  const navigate = useNavigate();

  // هنا بنستخرج البيانات والدوال من الكونتكست بدل ما نكتب useState هنا
  const {
    offers,
    approvedChats,
    handleApprove,
    setActiveChatId,
  } = useOffers();

  // لما المستخدم يختار شركة، نحدد الشات وننقل لصفحة الدردشة
  const handleConnect = (id) => {
    setActiveChatId(id);
    navigate(`/offers/chat/${id}`);
  };

  return (
    <div>
      <OffersList
        offers={offers}
        approvedChats={approvedChats}
        onApprove={(id) => {
          handleApprove(id);     // قبول العرض
          handleConnect(id);     // الانتقال إلى الشات
        }}
        onConnect={handleConnect}
      />
    </div>
  );
}
