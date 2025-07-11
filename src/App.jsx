import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/LayoutDashboardStartUp';
import Dashboard from './pages/DashboardStartup';
import Offers from './pages/OffersStartup';
import ChatPanel from './Components/ChatPanel/ChatPanel';
import { OffersProvider } from './Context/OffersContext';
import ContactForm from './Components/ContactForm/ContactForm';
import SettingStartup from './pages/SettingStartup';
import ContactStartup from './pages/ContactStartup';
import HomePage from './pages/HomeShipConnect';
import ShipmentsList from './pages/ShipmentListStartUp';
import ShipmentDetails from './pages/ShipmentDetailsStartUp';
import { mockShipments } from './Context/data/mockShipments';
import { mockShipping } from './Context/data/mockShipping';
import { useState } from 'react';
import AddShipment from './Components/AddShipment';
import ContactUs from './pages/ContactHome';
import DashboardShipping from './pages/DashboardShipping';
import LayoutShipping from './Layout/LayoutDashboardShipping';
import ContactShipping from './pages/ContactShipping';
import SettingShipping from './pages/SettingShipping';
import OffersShipping from './pages/OffersShipping';
import OffersShippingDetailes from './pages/OffersShippingDetailes';
import ShipmentsListShipping from './pages/ShipmentsListShipping';
import DeliverShippingShipment from './pages/DeliverShippingShipment';
import OnTransitShippingShipment from './pages/OnTransitShippingShipment';
import TrackShipment from './pages/TrackShipment';
import PendingShippingShipment from './pages/PendingShippingShipment';
import { AuthProvider } from './Context/AuthContext';
import LoginForm from './Components/Auth/LoginForms';
import StartupRegisterForm from './Components/Auth/StartupRegisterForm';
import CompanyRegisterForm from './Components/Auth/CompanyRegisterForm';
import ForgotPassword from './Components/Auth/ForgotPassword';
import { Toaster } from 'react-hot-toast';

function App() {
  const [shipments, setShipments] = useState(mockShipments);
  const [shipmentsShipping, setShipmentsShipping] = useState(mockShipping);
  const handleAddShipment = (newShipment) => {
    setShipments((prev) => [newShipment, ...prev]);
  };

  return (
    <BrowserRouter>
      <AuthProvider>
        <OffersProvider>
          <Toaster position="top-right" reverseOrder={false} />

          <Routes>

            {/* Home page route */}
            <Route path="/" element={<HomePage />} />
            <Route path="/contact-us" element={<ContactUs />} />

            {/* Login routes */}
            <Route path="/login" element={<LoginForm />} />
            <Route path="/register/startup" element={<StartupRegisterForm />} />
            <Route path="/register/company" element={<CompanyRegisterForm />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />

            {/* Dashboard StartUp routes */}
            <Route path="/dashboard" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="offers" element={<Offers />} />
              <Route path="settings" element={<SettingStartup />} />
              <Route path="/dashboard/offers/chat/:id" element={<ChatPanel />} />
              <Route path="contact" element={<ContactStartup />} />

              <Route
                path="shipments"
                element={
                  <ShipmentsList
                    shipments={shipments}
                    setShipments={setShipments}
                  />
                }
              />

              <Route
                path="shipments/shipment/:id"
                element={
                  <ShipmentDetails
                    shipments={shipments}
                    setShipments={setShipments}
                  />
                }
              />

              <Route
                path="add-shipment"
                element={<AddShipment onAddShipment={handleAddShipment} />}
              />
            </Route>
            {/* Dashboard Shipping routes */}
            <Route path="/dashboardShipping" element={<LayoutShipping />}>
              <Route index element={<DashboardShipping />} />
              <Route path="contactShipping" element={<ContactShipping />} />
              <Route path="settingsShipping" element={<SettingShipping />} />

              {/* صفحة العروض */}
              <Route path="offersShipping" element={<OffersShipping />} />

              {/* صفحة التفاصيل الخاصة بالعروض */}
              <Route path="shipping-details" element={<OffersShippingDetailes />} />


              <Route
                path="shipmentsShipping"
                element={
                  <ShipmentsListShipping
                    shipments={shipmentsShipping}
                    setShipments={setShipmentsShipping}
                  />
                }
              />
              <Route path="shipmentsShipping/shipment/:id" element={<DeliverShippingShipment />} />
              <Route path="shipmentsShipping/transit/:id" element={<OnTransitShippingShipment />} />
              <Route path="shipmentsShipping/Pending/:id" element={<PendingShippingShipment />} />
              <Route path="track/:id" element={<TrackShipment />} />

            </Route>


          </Routes>
        </OffersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
