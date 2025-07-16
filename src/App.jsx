import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './Layout/LayoutDashboardStartUp';
import Dashboard from './pages/Dashboard/DashboardStartup';
import Offers from './pages/Offers/OffersStartup';
import ChatPanel from './Components/ChatPanel/ChatPanel';
import { OffersProvider } from './Context/OffersContext';
import ContactForm from './Components/ContactForm/ContactForm';
import SettingStartup from './pages/Setting/SettingStartup';
import ContactStartup from './pages/Contact/ContactStartup';
import HomePage from './pages/Home/HomeShipConnect';
import ShipmentsList from './pages/ShippmentList/ShipmentListStartUp';
import ShipmentDetails from './pages/ShipmentDetailsStartUp';
import { mockShipments } from './Context/data/mockShipments';
import { mockShipping } from './Context/data/mockShipping';
import { useState } from 'react';
import AddShipment from './Components/AddShipment';
import ContactUs from './pages/Contact/ContactHome';
import DashboardShipping from './pages/Dashboard/DashboardShipping';
import LayoutShipping from './Layout/LayoutDashboardShipping';
import ContactShipping from './pages/Contact/ContactShipping';
import SettingShipping from './pages/Setting/SettingShipping';
import OffersShipping from './pages/Offers/OffersShipping';
import OffersShippingDetailes from './pages/Offers/OffersShippingDetailes';
import ShipmentsListShipping from './pages/ShippmentList/ShipmentsListShipping';

import DeliverShippingShipment from './pages/CompanyStatus/DeliverShippingShipment';
import OnTransitShippingShipment from './pages/CompanyStatus/OnTransitShippingShipment';
import PendingShippingShipment from './pages/CompanyStatus/PendingShippingShipment';

import DeliverStartupShipment from './pages/StartupStatus/DeliverStartupShipment';
import OnTransitStartupShipment from './pages/StartupStatus/OnTransitStartupShipment';
import PendingStartupShipment from './pages/StartupStatus/PendingStartupShipment';

import TrackShipment from './pages/TrackShipment';
import { AuthProvider } from './Context/AuthContext';
import LoginForm from './Components/Auth/LoginForms';
import StartupRegisterForm from './Components/Auth/StartupRegisterForm';
import CompanyRegisterForm from './Components/Auth/CompanyRegisterForm';
import ForgotPassword from './Components/Auth/ForgotPassword';
import { Toaster } from 'react-hot-toast';
import ProtectedRoute from "./Components/Auth/ProtectedRoute "
import LayoutAdmin from './Layout/LayoutDashboardAdmin';
import DashboardAdmin from './pages/AdminPages/DashboardAdmin';
import SettingAdmin from './pages/AdminPages/SettingAdmin';
import PartnersPage from './pages/AdminPages/Partners';
import ShippingProfile from './pages/AdminPages/ShippingProfile';
import NotFound from './pages/Not Found/NotFound';
import StartUpProfile from './pages/AdminPages/StartUpProfile';
import ShippingDetailes from './pages/AdminPages/Shippingdetailes';
import StartUpDetailes from './pages/AdminPages/StartUpdetailes';
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
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Layout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="offers" element={<Offers />} />
              <Route path="/dashboard/offers/chat/:id" element={<ChatPanel />} />

              <Route path="settings" element={<SettingStartup />} />
              <Route path="contact" element={<ContactStartup />} />

              {/* <Route path="shipments/shipment/:id" element={ <ShipmentDetails shipments={shipments} setShipments={setShipments}/>}/> */}
              <Route path="shipments" element={<ShipmentsList shipments={shipments} setShipments={setShipments} />} />
              <Route path="shipmentsStartup/shipment/:id" element={<DeliverStartupShipment />} />
              <Route path="shipmentsStartup/transit/:id" element={<OnTransitStartupShipment />} />
              <Route path="shipmentsStartup/pending/:id" element={<PendingStartupShipment />} />

              <Route path="add-shipment" element={<AddShipment onAddShipment={handleAddShipment} />} />
            </Route>

            {/* Dashboard Shipping routes */}
            <Route path="/dashboardShipping" element={
              <ProtectedRoute >
                <LayoutShipping />
              </ProtectedRoute>}>
              <Route index element={<DashboardShipping />} />
              <Route path="offersShipping" element={<OffersShipping />} /> {/* صفحة العروض */}
            <Route path="shipping-details/:id" element={<OffersShippingDetailes />} />


              <Route path="settingsShipping" element={<SettingShipping />} />
              <Route path="contactShipping" element={<ContactShipping />} />

             

              <Route path="shipmentsShipping" element={<ShipmentsListShipping shipments={shipmentsShipping} setShipments={setShipmentsShipping} />} />
              <Route path="shipmentsShipping/shipment/:id" element={<DeliverShippingShipment />} />
              <Route path="shipmentsShipping/transit/:id" element={<OnTransitShippingShipment />} />
              <Route path="shipmentsShipping/Pending/:id" element={<PendingShippingShipment />} />

              <Route path="track/:id" element={<TrackShipment />} />
            </Route>
                   {/* Dashboard LayoutAdmin routes */}
               <Route path="/dashboardAdmin" element={<LayoutAdmin />}>
                <Route index element={<DashboardAdmin />} />
                <Route path="SettingAdmin" element={<SettingAdmin />} />
                <Route path="Partners" element={<PartnersPage />} />
                <Route path="shipping-details/:id" element={<ShippingProfile />} /> 
                   <Route path="startup-details/:id" element={<StartUpProfile />} /> 
                    <Route path="shipping-profile/:id" element={<ShippingDetailes />} /> 
                    <Route path="startup-profile/:id" element={<StartUpDetailes />} /> 
              </Route>

              {/* Not Found Page */}
              <Route path="*" element={<NotFound />} />
          </Routes>
        </OffersProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;