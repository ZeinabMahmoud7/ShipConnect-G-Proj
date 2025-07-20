import { createContext, useContext, useState, useEffect } from "react";

const ShipmentContext = createContext();

export const ShipmentProvider = ({ children, initialData }) => {
  const [shipmentData, setShipmentData] = useState(initialData || {});

  // This useEffect ensures that if initialData (from the parent component) changes,
  // the context's internal state (shipmentData) is updated.
  useEffect(() => {
    setShipmentData(initialData || {});
  }, [initialData]); // Re-run this effect whenever initialData changes

  return (
    <ShipmentContext.Provider value={{ shipmentData, setShipmentData }}>
      {children}
    </ShipmentContext.Provider>
  );
};

export const useShipment = () => useContext(ShipmentContext);
