import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MapContainer, TileLayer, Marker, Polyline, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';
import { useAuth } from '../../Context/AuthContext';

// Fix for default marker icon issues with Webpack/React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom SVG Icon for Origin/Destination
const createCustomMarkerIcon = (color) => {
  const svgContent = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
      <circle cx="12" cy="9" r="3"></circle>
    </svg>
  `;
  return L.divIcon({
    html: svgContent,
    className: '',
    iconSize: [24, 24],
    iconAnchor: [12, 24],
    popupAnchor: [0, -24]
  });
};

const originIcon = createCustomMarkerIcon('#1A3D65'); // Dark blue for origin
const destinationIcon = createCustomMarkerIcon('#F26C1D'); // Orange for destination

// Component to handle map view changes
function MapViewUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center && map) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

// Helper function to generate mock tracking data with coordinates
const generateMockTrackingData = (originAddress, destinationAddress, status, shipmentId) => {
  // Simple mapping for common Egyptian cities to approximate coordinates
  const cityCoords = {
    "cairo": [30.0444, 31.2357],
    "giza": [30.0131, 31.2089],
    "alexandria": [31.2001, 29.9187],
    "luxor": [25.6870, 32.6396],
    "assiut": [27.1809, 31.1837],
    "suez": [29.9737, 32.5263],
    // Add more cities as needed
  };

  const getCoordsForAddress = (address) => {
    const lowerCaseAddress = address.toLowerCase();
    for (const city in cityCoords) {
      if (lowerCaseAddress.includes(city)) {
        return cityCoords[city];
      }
    }
    // Fallback if city not recognized (e.g., generic Egypt center)
    return [26.8206, 30.8025]; // Center of Egypt
  };

  const originCoords = getCoordsForAddress(originAddress);
  const destinationCoords = getCoordsForAddress(destinationAddress);

  const events = [];
  const now = new Date();

  // Simulate events based on status
  if (status === "Delivered") {
    events.push({
      location: originAddress,
      description: "Shipment picked up",
      timestamp: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days ago
      coords: originCoords
    });
    events.push({
      location: "Intermediate Hub",
      description: "Arrived at sorting facility",
      timestamp: new Date(now.getTime() - 3 * 24 * 60 * 60 * 1000).toISOString(), // 3 days ago
      coords: [(originCoords[0] + destinationCoords[0]) / 2, (originCoords[1] + destinationCoords[1]) / 2]
    });
    events.push({
      location: destinationAddress,
      description: "Delivered to destination",
      timestamp: new Date(now.getTime() - 1 * 60 * 60 * 1000).toISOString(), // 1 hour ago
      coords: destinationCoords
    });
  } else if (status === "In Transit" || status === "Out for Delivery") {
    events.push({
      location: originAddress,
      description: "Shipment picked up",
      timestamp: new Date(now.getTime() - 2 * 24 * 60 * 60 * 1000).toISOString(), // 2 days ago
      coords: originCoords
    });
    events.push({
      location: "Current Transit Point",
      description: "En route to destination",
      timestamp: new Date(now.getTime() - 30 * 60 * 1000).toISOString(), // 30 mins ago
      coords: [(originCoords[0] * 0.2 + destinationCoords[0] * 0.8), (originCoords[1] * 0.2 + destinationCoords[1] * 0.8)] // Closer to destination
    });
  } else { // Pending, Preparing, etc.
    events.push({
      location: originAddress,
      description: "Shipment registered",
      timestamp: new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
      coords: originCoords
    });
  }

  return {
    originCoords,
    destinationCoords,
    events
  };
};

export default function TrackShippingCompanyShipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isMapDataSimulated, setIsMapDataSimulated] = useState(false); // New state for simulation message

  useEffect(() => {
    const fetchTrackingDetails = async () => {
      if (!id) {
        setError("No shipment ID provided for tracking.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      setIsMapDataSimulated(false); // Reset simulation flag

      try {
        // *** IMPORTANT CHANGE: Using /api/Shipment/ShippingCompany/{Id} for shipping company users ***
        const response = await axios.get(`/api/Shipment/ShippingCompany/${id}`, {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        });

        if (response.data.success) {
          const apiData = response.data.data;

          // Basic data from API
          const baseMappedData = {
            status: apiData.status || 'N/A',
            lastUpdated: apiData.requestDate || new Date().toISOString(),
            origin: apiData.senderAddress || 'N/A',
            destination: apiData.destinationAddress || 'N/A',
          };

          // Generate simulated map data
          const simulatedMapData = generateMockTrackingData(
            baseMappedData.origin,
            baseMappedData.destination,
            baseMappedData.status,
            id
          );

          setTrackingData({
            ...baseMappedData,
            originCoords: simulatedMapData.originCoords,
            destinationCoords: simulatedMapData.destinationCoords,
            events: simulatedMapData.events,
          });
          setIsMapDataSimulated(true); // Set flag as map data is simulated

        } else {
          setError(response.data.message || `Shipment ID ${id} not found for shipping company user.`);
          toast.error(`Failed to load tracking details: ${response.data.message || 'Unknown error'}`);
        }
      } catch (err) {
        console.error('❌ Error fetching tracking details:', err);
        setError(err.response?.data?.message || 'Failed to fetch tracking details. Please try again.');
        toast.error(`Error: ${err.response?.data?.message || 'Failed to fetch tracking details.'}`);
      } finally {
        setLoading(false);
      }
    };

    if (user?.token) {
      fetchTrackingDetails();
    } else {
      setError("Authentication required to view tracking details.");
      setLoading(false);
    }
  }, [id, user]);

  const currentLocation = trackingData?.events?.[trackingData.events.length - 1]?.coords;
  const pathCoords = trackingData ? [
    trackingData.originCoords,
    ...(trackingData.events || []).map(e => e.coords),
    trackingData.destinationCoords
  ].filter(Boolean) : [];

  // Determine map center and zoom based on available data
  const mapCenter = currentLocation || trackingData?.originCoords || [30.0444, 31.2357]; // Default to Cairo
  const mapZoom = currentLocation ? 12 : (pathCoords.length > 2 ? 6 : 5); // Zoom out for full path, zoom in for current location

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-customGray">
        <p className="text-primaryBlue text-lg">Loading tracking details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-customGray p-4">
        <p className="text-red-500 text-lg mb-4">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="bg-brandOrange hover:bg-orange-600 text-white px-6 py-3 rounded-full transition duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="bg-customGray min-h-screen p-4 sm:p-6 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 sm:p-8">
        <div className="flex items-center mb-6 border-b pb-4 border-borderGray">
          <button
            onClick={() => navigate('/dashboardShipping/shipmentsShipping')} 
            className="p-2 rounded-md hover:bg-gray-100"
            aria-label="Go back"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 19 19"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11.875 4.75C11.875 4.75 7.125 8.24838 7.125 9.5C7.125 10.7516 11.875 14.25 11.875 14.25"
                stroke="#0b3e86ff"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <h2 className="text-3xl font-bold text-primaryBlue">
            Shipment Tracking (Shipping Company): {id} {/* Updated title */}
          </h2>
        </div>

        {trackingData ? (
          <div className="space-y-6">
            {isMapDataSimulated && (
              <div className="text-center text-sm text-yellow-700 bg-yellow-50 border border-yellow-200 p-3 rounded-lg mb-4">
                Note: Map data is simulated as real-time coordinate data is not available from the API.
              </div>
            )}

            {/* Map Section - Renders only if originCoords and destinationCoords are available (even if simulated) */}
            {trackingData.originCoords && trackingData.destinationCoords ? (
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-md mb-6">
                <MapContainer
                  center={mapCenter}
                  zoom={mapZoom}
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <MapViewUpdater center={mapCenter} zoom={mapZoom} />
                  <Marker position={trackingData.originCoords} icon={originIcon}>
                    <Popup>Origin: {trackingData.origin}</Popup>
                  </Marker>
                  <Marker position={trackingData.destinationCoords} icon={destinationIcon}>
                    <Popup>Destination: {trackingData.destination}</Popup>
                  </Marker>
                  {currentLocation && (
                    <CircleMarker
                      center={currentLocation}
                      radius={8}
                      color="red"
                      fillColor="#f03"
                      fillOpacity={0.5}
                    >
                      <Popup>Current Location: {trackingData.events[trackingData.events.length - 1]?.location || 'N/A'}</Popup>
                    </CircleMarker>
                  )}
                  {pathCoords.length > 1 && (
                    <Polyline positions={pathCoords} color="blue" weight={3} />
                  )}
                </MapContainer>
              </div>
            ) : (
              <div className="text-center text-gray-500 italic p-4 bg-gray-100 rounded-lg">
                Map tracking is not available for this shipment.
              </div>
            )}

            {/* Existing Textual Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Current Status:</p>
                <p className="text-primaryBlack font-semibold text-lg">{trackingData.status || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Last Updated:</p>
                <p className="text-primaryBlack font-semibold text-lg">
                  {trackingData.lastUpdated ? new Date(trackingData.lastUpdated).toLocaleString() : 'N/A'}
                </p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Origin:</p>
                <p className="text-primaryBlack font-semibold text-lg">{trackingData.origin || 'N/A'}</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="text-gray-600 text-sm">Destination:</p>
                <p className="text-primaryBlack font-semibold text-lg">{trackingData.destination || 'N/A'}</p>
              </div>
            </div>

            {/* Tracking History Section - Renders only if events are available (even if simulated) */}
            {trackingData.events && trackingData.events.length > 0 ? (
              <div className="mt-8 ">
                <h3 className="text-xl font-bold text-primaryBlue mb-4 ">Tracking History</h3>
                <div className="relative border-l-2 border-brandOrange pl-[2px]">
                  {trackingData.events.map((event, index) => (
                    <div key={index} className="mb-6 relative pl-4">
                      <div className="absolute -left-3 top-0 mt-1 w-5 h-5 bg-brandOrange rounded-full border-2 border-white"></div>
                      <p className="text-gray-800 font-semibold">{event.location}</p>
                      <p className="text-gray-600 text-sm">{event.description}</p>
                      <p className="text-gray-500 text-xs">
                        {event.timestamp ? new Date(event.timestamp).toLocaleString() : 'N/A'}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center text-gray-500 italic mt-8 p-4 bg-gray-100 rounded-lg">
                No detailed tracking events available for this shipment.
              </div>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-500 italic">
            No tracking data available for this shipment.
          </div>
        )}
      </div>
    </div>
  );
}
