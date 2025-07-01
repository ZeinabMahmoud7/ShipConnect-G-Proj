// 📁 context/ShipmentContext.js
import React, { createContext, useContext, useState, useEffect } from 'react'
import { mockShipments } from '../data/mockShipments'

const ShipmentContext = createContext()

export function ShipmentProvider({ children }) {
  const [shipments, setShipments] = useState([])

  // ✅ Load from localStorage first if exists, otherwise mock data
  useEffect(() => {
    const updated = mockShipments.map((s) => {
      const saved = localStorage.getItem(`shipment_${s.id}`)
      return saved ? JSON.parse(saved) : s
    })
    setShipments(updated)
  }, [])

  // ✅ Update shipment by ID
  const updateShipment = (updatedShipment) => {
    setShipments((prev) => {
      const newData = prev.map((s) =>
        s.id === updatedShipment.id ? { ...s, ...updatedShipment } : s
      )
      // Save to localStorage
      localStorage.setItem(`shipment_${updatedShipment.id}`, JSON.stringify(updatedShipment))
      return newData
    })
  }

  const getShipmentById = (id) => shipments.find((s) => s.id === id)

  return (
    <ShipmentContext.Provider value={{ shipments, getShipmentById, updateShipment }}>
      {children}
    </ShipmentContext.Provider>
  )
}

export const useShipment = () => useContext(ShipmentContext)
