import React, { useState, useEffect, useRef } from 'react';
import T from './T';

// MapMyIndia API configuration
const MAPMYINDIA_API_KEY = 'acfa3b7a76a76a7f36b17e3130cb0812';
const MAPMYINDIA_BASE_URL = 'https://apis.mapmyindia.com/advancedmaps/v1';

// Indian cities with coordinates for street vendor marketplace
const indianCities = [
  { name: 'Delhi', lat: 28.6139, lng: 77.2090, vendors: 1250, markets: ['Chandni Chowk', 'Karol Bagh', 'Lajpat Nagar'] },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, vendors: 980, markets: ['Crawford Market', 'Linking Road', 'Colaba Causeway'] },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946, vendors: 750, markets: ['Commercial Street', 'Brigade Road', 'Chickpet'] },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, vendors: 650, markets: ['T. Nagar', 'Pondy Bazaar', 'Express Avenue'] },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, vendors: 580, markets: ['New Market', 'Gariahat', 'Shyama Charan'] },
  { name: 'Hyderabad', lat: 17.3850, lng: 78.4867, vendors: 520, markets: ['Laad Bazaar', 'Begum Bazaar', 'Sultan Bazaar'] },
  { name: 'Pune', lat: 18.5204, lng: 73.8567, vendors: 480, markets: ['Laxmi Road', 'FC Road', 'Camp Area'] },
  { name: 'Ahmedabad', lat: 23.0225, lng: 72.5714, vendors: 420, markets: ['Law Garden', 'Manek Chowk', 'Relief Road'] },
  { name: 'Jaipur', lat: 26.9124, lng: 75.7873, vendors: 380, markets: ['Johari Bazaar', 'Bapu Bazaar', 'Tripolia Bazaar'] },
  { name: 'Lucknow', lat: 26.8467, lng: 80.9462, vendors: 320, markets: ['Hazratganj', 'Aminabad', 'Chowk'] }
];

const IndianMap = ({ onLocationSelect, selectedLocation }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [selectedCity, setSelectedCity] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 20.5937, lng: 78.9629 }); // Center of India
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [markers, setMarkers] = useState([]);

  // Load MapMyIndia script
  useEffect(() => {
    const loadMapMyIndiaScript = () => {
      if (window.mappls) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://apis.mapmyindia.com/advancedmaps/api/${MAPMYINDIA_API_KEY}/map_sdk?layer=vector&v=3.0&callback=initializeMap`;
      script.async = true;
      script.defer = true;
      
      window.initializeMap = () => {
        initializeMap();
      };

      document.head.appendChild(script);
    };

    loadMapMyIndiaScript();

    return () => {
      // Cleanup
      if (window.initializeMap) {
        delete window.initializeMap;
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.mappls) return;

    try {
      const mapInstance = new window.mappls.Map(mapRef.current, {
        center: [mapCenter.lng, mapCenter.lat],
        zoom: 5,
        search: true,
        traffic: true,
        geolocation: true,
        clickableIcons: true,
        backgroundColor: '#f0f8ff'
      });

      mapInstance.on('load', () => {
        setIsMapLoaded(true);
        addCityMarkers(mapInstance);
      });

      setMap(mapInstance);
    } catch (error) {
      console.error('Error initializing MapMyIndia map:', error);
      setIsMapLoaded(false);
    }
  };

  const addCityMarkers = (mapInstance) => {
    const newMarkers = [];

    indianCities.forEach((city) => {
      try {
        // Create custom marker for each city
        const marker = new window.mappls.Marker({
          map: mapInstance,
          position: [city.lng, city.lat],
          title: city.name,
          icon: {
            url: 'data:image/svg+xml;base64,' + btoa(`
              <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 25 15 25s15-16.716 15-25C30 6.716 23.284 0 15 0z" fill="#FF6B35"/>
                <circle cx="15" cy="15" r="8" fill="white"/>
                <text x="15" y="19" text-anchor="middle" font-family="Arial" font-size="10" font-weight="bold" fill="#FF6B35">🏪</text>
              </svg>
            `),
            size: [30, 40],
            anchor: [15, 40]
          }
        });

        // Add click event to marker
        marker.on('click', () => {
          handleCityClick(city, mapInstance);
        });

        newMarkers.push(marker);
      } catch (error) {
        console.error(`Error creating marker for ${city.name}:`, error);
      }
    });

    setMarkers(newMarkers);
  };

  const handleCityClick = (city, mapInstance = map) => {
    setSelectedCity(city);
    
    if (mapInstance) {
      // Zoom to selected city
      mapInstance.flyTo({
        center: [city.lng, city.lat],
        zoom: 12,
        duration: 2000
      });

      // Add info popup
      try {
        const popup = new window.mappls.Popup({
          offset: [0, -40],
          closeButton: true,
          closeOnClick: false
        })
        .setLngLat([city.lng, city.lat])
        .setHTML(`
          <div class="p-3 min-w-[200px]">
            <h3 class="font-bold text-lg text-gray-900 mb-2">📍 ${city.name}</h3>
            <p class="text-sm text-gray-600 mb-2">
              <strong>Active Vendors:</strong> <span class="text-orange-600">${city.vendors}</span>
            </p>
            <p class="text-sm text-gray-600 mb-2">
              <strong>Popular Markets:</strong>
            </p>
            <div class="flex flex-wrap gap-1">
              ${city.markets.map(market => 
                `<span class="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">${market}</span>`
              ).join('')}
            </div>
          </div>
        `)
        .addTo(mapInstance);
      } catch (error) {
        console.error('Error creating popup:', error);
      }
    }

    if (onLocationSelect) {
      onLocationSelect({
        address: `${city.name}, India`,
        coordinates: { lat: city.lat, lng: city.lng },
        city: city.name,
        vendors: city.vendors,
        markets: city.markets
      });
    }
  };

  // Search for places using MapMyIndia API
  const searchPlaces = async (query) => {
    try {
      const response = await fetch(
        `${MAPMYINDIA_BASE_URL}/${MAPMYINDIA_API_KEY}/atlas/1.0/search?query=${encodeURIComponent(query)}&region=IND&limit=10`
      );
      const data = await response.json();
      return data.results || [];
    } catch (error) {
      console.error('Error searching places:', error);
      return [];
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          🗺️ <T>Indian Street Vendor Locations</T>
        </h3>
        <p className="text-gray-600">
          <T>Select a city to view local vendors and markets</T>
        </p>
      </div>

      {/* MapMyIndia Interactive Map */}
      <div className="relative bg-gradient-to-br from-green-100 to-blue-100 rounded-lg mb-6 overflow-hidden" style={{ height: '500px' }}>
        <div 
          ref={mapRef} 
          className="w-full h-full"
          style={{ minHeight: '500px' }}
        />
        
        {!isMapLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-100 to-blue-100">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
              <div className="text-6xl mb-4">🇮🇳</div>
              <h4 className="text-lg font-semibold text-gray-700 mb-2">
                <T>Loading India Street Vendor Network</T>
              </h4>
              <p className="text-sm text-gray-600">
                <T>Powered by MapMyIndia</T>
              </p>
            </div>
          </div>
        )}

        {/* Map Controls */}
        {isMapLoaded && (
          <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-2">
            <div className="flex flex-col space-y-2">
              <button
                onClick={() => map && map.flyTo({ center: [78.9629, 20.5937], zoom: 5 })}
                className="px-3 py-2 bg-orange-500 text-white rounded text-sm hover:bg-orange-600 transition-colors"
                title="Reset to India view"
              >
                🇮🇳 <T>India</T>
              </button>
              <button
                onClick={() => {
                  if (navigator.geolocation && map) {
                    navigator.geolocation.getCurrentPosition((position) => {
                      map.flyTo({
                        center: [position.coords.longitude, position.coords.latitude],
                        zoom: 15
                      });
                    });
                  }
                }}
                className="px-3 py-2 bg-blue-500 text-white rounded text-sm hover:bg-blue-600 transition-colors"
                title="Go to current location"
              >
                📍 <T>My Location</T>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* City Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {indianCities.map((city) => (
          <button
            key={city.name}
            onClick={() => handleCityClick(city)}
            className={`p-3 rounded-lg border-2 transition-all duration-300 text-left ${
              selectedCity?.name === city.name
                ? 'border-orange-500 bg-orange-50 shadow-md'
                : 'border-gray-200 hover:border-orange-300 hover:bg-orange-50'
            }`}
          >
            <div className="font-semibold text-gray-900">{city.name}</div>
            <div className="text-xs text-gray-600">{city.vendors} vendors</div>
          </button>
        ))}
      </div>

      {/* Selected City Details */}
      {selectedCity && (
        <div className="mt-6 p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
          <h4 className="font-bold text-lg text-gray-900 mb-2">
            📍 {selectedCity.name}
          </h4>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600 mb-1">
                <T>Active Vendors</T>: <span className="font-semibold text-orange-600">{selectedCity.vendors}</span>
              </p>
              <p className="text-sm text-gray-600">
                <T>Coordinates</T>: {selectedCity.lat.toFixed(4)}, {selectedCity.lng.toFixed(4)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1 font-medium">
                <T>Popular Markets</T>:
              </p>
              <div className="flex flex-wrap gap-1">
                {selectedCity.markets.map((market, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs"
                  >
                    {market}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default IndianMap;