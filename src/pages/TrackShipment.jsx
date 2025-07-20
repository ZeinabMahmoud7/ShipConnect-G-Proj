import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { MapContainer, TileLayer, Marker, Polyline, Popup, CircleMarker, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS for map styling
import L from 'leaflet'; // Import Leaflet library to create custom icons

// Fix for default marker icon issues with Webpack/React (still good to keep for general Leaflet usage)
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom SVG Icon for Origin/Destination
const createCustomMarkerIcon = (color, type) => {
  const svgContent = `
    <svg width="24" height="24" viewBox="0 0 24 24" fill="${color}" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z"></path>
      <circle cx="12" cy="9" r="3"></circle>
    </svg>
  `;
  return L.divIcon({
    html: svgContent,
    className: '', // Important to leave empty to avoid default Leaflet styling
    iconSize: [24, 24],
    iconAnchor: [12, 24], // Center the icon at the bottom point
    popupAnchor: [0, -24] // Adjust popup position relative to icon
  });
};

const originIcon = createCustomMarkerIcon('#1A3D65', 'origin'); // Dark blue for origin
const destinationIcon = createCustomMarkerIcon('#F26C1D', 'destination'); // Orange for destination

// Component to handle map view changes
function MapViewUpdater({ center, zoom }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, zoom);
    }
  }, [center, zoom, map]);
  return null;
}

export default function TrackShipment() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [trackingData, setTrackingData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrackingDetailsMock = () => {
      if (!id) {
        setError("No shipment ID provided for tracking.");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      let mockResponse;

      // --- Dynamic Mock Data Simulation ---
      if (id === 'MOCK123') {
        mockResponse = {
          success: true,
          message: "Success",
          data: {
            status: "In Transit",
            lastUpdated: new Date().toISOString(),
            origin: "Warehouse A, New York",
            destination: "Customer Address, Los Angeles",
            originCoords: [40.7128, -74.0060], // New York City
            destinationCoords: [34.0522, -118.2437], // Los Angeles
            events: [
              {
                location: "Warehouse A, New York",
                description: "Shipment picked up",
                timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
                coords: [40.7128, -74.0060]
              },
              {
                location: "Sorting Facility, Chicago",
                description: "Arrived at sorting facility",
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                coords: [41.8781, -87.6298]
              },
              {
                location: "In Transit",
                description: "Departed sorting facility, en route to destination",
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                coords: [37.0902, -95.7129]
              },
              {
                location: "Local Distribution Hub, Los Angeles",
                description: "Arrived at local distribution hub",
                timestamp: new Date().toISOString(),
                coords: [34.0522, -118.2437]
              },
            ],
          },
        };
      } else if (id === 'MOCK456') {
        mockResponse = {
          success: true,
          message: "Success",
          data: {
            status: "Delivered",
            lastUpdated: new Date().toISOString(),
            origin: "Port of Hamburg, Germany",
            destination: "Warehouse B, Berlin, Germany",
            originCoords: [53.5511, 9.9937], // Hamburg
            destinationCoords: [52.5200, 13.4050], // Berlin
            events: [
              {
                location: "Port of Hamburg, Germany",
                description: "Shipment arrived at port",
                timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
                coords: [53.5511, 9.9937]
              },
              {
                location: "Customs Clearance, Hamburg",
                description: "Cleared customs",
                timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
                coords: [53.5511, 9.9937]
              },
              {
                location: "In Transit to Berlin",
                description: "Departed Hamburg, en route to Berlin",
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                coords: [52.9, 11.5]
              },
              {
                location: "Warehouse B, Berlin, Germany",
                description: "Delivered to destination",
                timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
                coords: [52.5200, 13.4050]
              },
            ],
          },
        };
      } else if (id === '63') {
        mockResponse = {
          success: true,
          message: "Success",
          data: {
            status: "Out for Delivery",
            lastUpdated: new Date().toISOString(),
            origin: "Local Hub, Cairo, Egypt",
            destination: "Customer Address, Giza, Egypt",
            originCoords: [30.0444, 31.2357], // Cairo
            destinationCoords: [30.0131, 31.2089], // Giza (near Cairo)
            events: [
              {
                location: "Cairo Main Sorting Center",
                description: "Shipment arrived at sorting center",
                timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
                coords: [30.0444, 31.2357]
              },
              {
                location: "Local Hub, Cairo",
                description: "Processed for local delivery",
                timestamp: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
                coords: [30.0444, 31.2357]
              },
              {
                location: "On Delivery Vehicle",
                description: "Out for delivery",
                timestamp: new Date().toISOString(),
                coords: [30.02, 31.22]
              },
            ],
          },
        };
      }
      else {
        mockResponse = {
          success: false,
          message: `Shipment ID ${id} not found in mock data.`,
          data: null,
        };
      }

      // Simulate network delay
      setTimeout(() => {
        if (mockResponse.success) {
          setTrackingData(mockResponse.data);
          //toast.success(`Tracking details loaded for Shipment ID: ${id}`);
        } else {
          setError(mockResponse.message);
          toast.error(`Failed to load tracking details: ${mockResponse.message}`);
        }
        setLoading(false);
      }, 1000);
    };

    fetchTrackingDetailsMock();
  }, [id]);

  // Determine the current location for the map marker
  const currentLocation = trackingData?.events?.[trackingData.events.length - 1]?.coords;
  const pathCoords = trackingData ? [trackingData.originCoords, ...trackingData.events.map(e => e.coords), trackingData.destinationCoords].filter(Boolean) : [];

  // Determine the map center and zoom level dynamically
  const mapCenter = currentLocation || trackingData?.originCoords;
  const mapZoom = currentLocation ? 12 : 5; // Zoom in more if at a specific current location

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
            onClick={() => navigate(-1)}
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
            Shipment Tracking: {id}
          </h2>
        </div>

        {trackingData ? (
          <div className="space-y-6">
            {/* Map Section */}
            {trackingData.originCoords && trackingData.destinationCoords && (
              <div className="w-full h-96 rounded-lg overflow-hidden shadow-md mb-6">
                <MapContainer
                  center={mapCenter} // Use dynamic center
                  zoom={mapZoom}     // Use dynamic zoom
                  scrollWheelZoom={false}
                  className="w-full h-full"
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />

                  {/* Component to update map view when props change */}
                  <MapViewUpdater center={mapCenter} zoom={mapZoom} />

                  {/* Origin Marker using custom icon */}
                  <Marker position={trackingData.originCoords} icon={originIcon}>
                    <Popup>Origin: {trackingData.origin}</Popup>
                  </Marker>

                  {/* Destination Marker using custom icon */}
                  <Marker position={trackingData.destinationCoords} icon={destinationIcon}>
                    <Popup>Destination: {trackingData.destination}</Popup>
                  </Marker>

                  {/* Current Location Marker (CircleMarker doesn't use external images) */}
                  {currentLocation && (
                    <CircleMarker
                      center={currentLocation}
                      radius={8}
                      color="red"
                      fillColor="#f03"
                      fillOpacity={0.5}
                    >
                      <Popup>Current Location: {trackingData.events[trackingData.events.length - 1].location}</Popup>
                    </CircleMarker>
                  )}

                  {/* Path Polyline */}
                  {pathCoords.length > 1 && (
                    <Polyline positions={pathCoords} color="blue" weight={3} />
                  )}

                </MapContainer>
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

            {trackingData.events && trackingData.events.length > 0 && (
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
            )}

            {!trackingData.events || trackingData.events.length === 0 && (
              <p className="text-gray-500 text-center mt-8 italic">No detailed tracking events available.</p>
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
