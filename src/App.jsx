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
import { useState } from 'react';
import AddShipment from './Components/AddShipment';
import ContactUs from './pages/ContactHome';
function App() {
  const [shipments, setShipments] = useState(mockShipments);

  const handleAddShipment = (newShipment) => {
    setShipments((prev) => [newShipment, ...prev]);
  };

  return (
    <BrowserRouter>
      <OffersProvider>
        <Routes>
          {/* Home page route */}
          <Route path="/" element={<HomePage />} />
         <Route path="/contact-us" element={<ContactUs />} />

          {/* Dashboard routes */}
          <Route path="/dashboard" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="offers" element={<Offers />} />
            <Route path="settings" element={<SettingStartup />} />
            <Route path="offers/chat/:id" element={<ChatPanel />} />
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
        </Routes>
      </OffersProvider>
    </BrowserRouter>
  );
}

export default App;
