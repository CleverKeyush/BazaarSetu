import React, { useState, useEffect, useRef } from 'react';

const MapView = ({ 
  center = { lat: 40.7128, lng: -74.0060 }, 
  zoom = 10, 
  markers = [], 
  onLocationSelect,
  height = '400px',
  showLocationPicker = false 
}) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Mock Google Maps API - In production, use actual Google Maps API
  useEffect(() => {
    // Simulate Google Maps API loading
    const timer = setTimeout(() => {
      setIsLoaded(true);
      initializeMap();
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const initializeMap = () => {
    // Mock map initialization
    const mockMap = {
      center,
      zoom,
      markers: []
    };
    setMap(mockMap);
  };

  const handleMapClick = (event) => {
    if (showLocationPicker && onLocationSelect) {
      const location = {
        lat: center.lat + (Math.random() - 0.5) * 0.1,
        lng: center.lng + (Math.random() - 0.5) * 0.1
      };
      setSelectedLocation(location);
      onLocationSelect(location);
    }
  };

  const getMarkerColor = (type) => {
    switch (type) {
      case 'vendor': return '#3B82F6'; // Blue
      case 'supplier': return '#10B981'; // Green
      case 'group_order': return '#F59E0B'; // Yellow
      case 'selected': return '#EF4444'; // Red
      default: return '#6B7280'; // Gray
    }
  };

  if (!isLoaded) {
    return (
      <div 
        className="flex items-center justify-center bg-gray-100 rounded-lg"
        style={{ height }}
      >
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
          <p className="text-gray-600 text-sm">Loading map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div 
        ref={mapRef}
        className="bg-gray-200 rounded-lg relative overflow-hidden cursor-pointer"
        style={{ height }}
        onClick={handleMapClick}
      >
        {/* Mock Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-green-100">
          <div className="absolute inset-0 opacity-20">
            <svg width="100%" height="100%" className="text-gray-400">
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </div>
        </div>

        {/* Map Center Indicator */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="w-4 h-4 bg-blue-600 rounded-full border-2 border-white shadow-lg"></div>
        </div>

        {/* Mock Markers */}
        {markers.map((marker, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
            style={{
              left: `${50 + (marker.position?.lng || 0) * 100}%`,
              top: `${50 - (marker.position?.lat || 0) * 100}%`
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (marker.onClick) marker.onClick(marker);
            }}
          >
            <div 
              className="w-6 h-6 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs font-bold"
              style={{ backgroundColor: getMarkerColor(marker.type) }}
              title={marker.title}
            >
              {marker.type === 'vendor' && '🏢'}
              {marker.type === 'supplier' && '🏭'}
              {marker.type === 'group_order' && '📦'}
              {marker.type === 'selected' && '📍'}
            </div>
            {marker.showInfo && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-white p-2 rounded shadow-lg text-xs whitespace-nowrap z-10">
                <div className="font-semibold">{marker.title}</div>
                {marker.description && <div className="text-gray-600">{marker.description}</div>}
              </div>
            )}
          </div>
        ))}

        {/* Selected Location Marker */}
        {selectedLocation && (
          <div
            className="absolute transform -translate-x-1/2 -translate-y-1/2"
            style={{
              left: `${50 + selectedLocation.lng * 100}%`,
              top: `${50 - selectedLocation.lat * 100}%`
            }}
          >
            <div className="w-6 h-6 bg-red-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center text-white text-xs">
              📍
            </div>
          </div>
        )}

        {/* Map Controls */}
        <div className="absolute top-4 right-4 flex flex-col space-y-2">
          <button 
            className="bg-white p-2 rounded shadow hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              // Zoom in logic
            }}
          >
            <span className="text-lg">+</span>
          </button>
          <button 
            className="bg-white p-2 rounded shadow hover:bg-gray-50"
            onClick={(e) => {
              e.stopPropagation();
              // Zoom out logic
            }}
          >
            <span className="text-lg">−</span>
          </button>
        </div>

        {/* Location Picker Instructions */}
        {showLocationPicker && (
          <div className="absolute bottom-4 left-4 bg-white p-3 rounded shadow-lg text-sm">
            <p className="font-semibold text-gray-900">📍 Click to set location</p>
            <p className="text-gray-600">Click anywhere on the map to select delivery location</p>
          </div>
        )}
      </div>

      {/* Map Legend */}
      <div className="mt-4 flex flex-wrap gap-4 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
          <span>Vendors</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded-full"></div>
          <span>Suppliers</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-yellow-500 rounded-full"></div>
          <span>Group Orders</span>
        </div>
        {selectedLocation && (
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-red-500 rounded-full"></div>
            <span>Selected Location</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default MapView;