import { createContext, useContext, useState } from "react";

const ShipmentContext = createContext();

export const ShipmentProvider = ({ children, initialData }) => {
  const [shipmentData, setShipmentData] = useState(initialData || {});
  return (
    <ShipmentContext.Provider value={{ shipmentData, setShipmentData }}>
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipment = () => useContext(ShipmentContext);
