import React, { useState, useEffect, useRef } from 'react';
import T from './T';

// MapMyIndia API configuration
const MAPMYINDIA_API_KEY = 'acfa3b7a76a76a7f36b17e3130cb0812';

const LocationPicker = ({ onLocationSelect, initialLocation = '' }) => {
  const [location, setLocation] = useState(initialLocation);
  const [suggestions, setSuggestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const searchTimeoutRef = useRef(null);

  // Popular Indian cities and markets for quick selection
  const popularLocations = [
    { name: 'Chandni Chowk, Delhi', city: 'Delhi', coordinates: { lat: 28.6506, lng: 77.2334 } },
    { name: 'Crawford Market, Mumbai', city: 'Mumbai', coordinates: { lat: 18.9467, lng: 72.8342 } },
    { name: 'Commercial Street, Bangalore', city: 'Bangalore', coordinates: { lat: 12.9716, lng: 77.5946 } },
    { name: 'T. Nagar, Chennai', city: 'Chennai', coordinates: { lat: 13.0418, lng: 80.2341 } },
    { name: 'New Market, Kolkata', city: 'Kolkata', coordinates: { lat: 22.5726, lng: 88.3639 } },
    { name: 'Laad Bazaar, Hyderabad', city: 'Hyderabad', coordinates: { lat: 17.3616, lng: 78.4747 } },
    { name: 'Laxmi Road, Pune', city: 'Pune', coordinates: { lat: 18.5204, lng: 73.8567 } },
    { name: 'Law Garden, Ahmedabad', city: 'Ahmedabad', coordinates: { lat: 23.0225, lng: 72.5714 } }
  ];

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  // Search for Indian places using MapMyIndia API
  const searchPlaces = async (query) => {
    if (!query || query.length < 3) {
      setSuggestions([]);
      return;
    }

    setIsLoading(true);
    try {
      // First try popular locations for quick matches
      const popularMatches = popularLocations
        .filter(loc => 
          loc.name.toLowerCase().includes(query.toLowerCase()) ||
          loc.city.toLowerCase().includes(query.toLowerCase())
        )
        .map((loc, index) => ({
          id: `popular_${index}`,
          description: loc.name,
          city: loc.city,
          coordinates: loc.coordinates,
          type: 'popular'
        }));

      if (popularMatches.length > 0) {
        setSuggestions(popularMatches.slice(0, 5));
        setIsLoading(false);
        return;
      }

      // Try MapMyIndia Autosuggest API
      try {
        const response = await fetch(
          `https://atlas.mapmyindia.com/api/places/search/json?query=${encodeURIComponent(query)}&region=IND&tokenizeAddress=true`,
          {
            headers: {
              'Authorization': `Bearer ${MAPMYINDIA_API_KEY}`,
              'Content-Type': 'application/json'
            }
          }
        );

        if (response.ok) {
          const data = await response.json();
          const places = data.suggestedLocations || [];
          
          const formattedSuggestions = places.slice(0, 6).map((place, index) => ({
            id: `api_${index}`,
            description: place.placeAddress || place.placeName,
            city: place.city,
            state: place.state,
            coordinates: {
              lat: parseFloat(place.latitude) || 0,
              lng: parseFloat(place.longitude) || 0
            },
            type: 'api'
          }));

          setSuggestions(formattedSuggestions);
        } else {
          throw new Error('API request failed');
        }
      } catch (apiError) {
        console.warn('MapMyIndia API failed, using fallback:', apiError);
        
        // Fallback to Indian cities and markets
        const indianLocations = [
          { name: 'Karol Bagh Market, New Delhi', city: 'Delhi', coordinates: { lat: 28.6519, lng: 77.1909 } },
          { name: 'Palika Bazaar, New Delhi', city: 'Delhi', coordinates: { lat: 28.6315, lng: 77.2167 } },
          { name: 'Nehru Place, New Delhi', city: 'Delhi', coordinates: { lat: 28.5494, lng: 77.2500 } },
          { name: 'Linking Road, Mumbai', city: 'Mumbai', coordinates: { lat: 19.0544, lng: 72.8347 } },
          { name: 'Colaba Causeway, Mumbai', city: 'Mumbai', coordinates: { lat: 18.9067, lng: 72.8147 } },
          { name: 'Brigade Road, Bangalore', city: 'Bangalore', coordinates: { lat: 12.9698, lng: 77.6205 } },
          { name: 'Chickpet, Bangalore', city: 'Bangalore', coordinates: { lat: 12.9698, lng: 77.5804 } },
          { name: 'Pondy Bazaar, Chennai', city: 'Chennai', coordinates: { lat: 13.0418, lng: 80.2341 } },
          { name: 'Express Avenue, Chennai', city: 'Chennai', coordinates: { lat: 13.0569, lng: 80.2091 } },
          { name: 'Gariahat Market, Kolkata', city: 'Kolkata', coordinates: { lat: 22.5204, lng: 88.3607 } }
        ];

        const fallbackSuggestions = indianLocations
          .filter(loc => 
            loc.name.toLowerCase().includes(query.toLowerCase()) ||
            loc.city.toLowerCase().includes(query.toLowerCase())
          )
          .map((loc, index) => ({
            id: `fallback_${index}`,
            description: loc.name,
            city: loc.city,
            coordinates: loc.coordinates,
            type: 'fallback'
          }));

        setSuggestions(fallbackSuggestions.slice(0, 5));
      }
    } catch (error) {
      console.error('Error searching places:', error);
      setSuggestions([]);
    }
    setIsLoading(false);
  };

  const handleLocationChange = (e) => {
    const value = e.target.value;
    setLocation(value);

    // Clear previous timeout
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    // Debounce search
    searchTimeoutRef.current = setTimeout(() => {
      searchPlaces(value);
    }, 300);
  };

  const selectLocation = (place) => {
    setLocation(place.description);
    setSelectedLocation(place);
    setSuggestions([]);
    
    if (onLocationSelect) {
      onLocationSelect({
        address: place.description,
        coordinates: place.coordinates,
        city: place.city,
        state: place.state,
        type: place.type
      });
    }
  };

  const handleQuickLocationSelect = (location) => {
    setLocation(location.name);
    setSelectedLocation({
      description: location.name,
      city: location.city,
      coordinates: location.coordinates,
      type: 'popular'
    });

    if (onLocationSelect) {
      onLocationSelect({
        address: location.name,
        coordinates: location.coordinates,
        city: location.city,
        type: 'popular'
      });
    }
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          
          // Use reverse geocoding with MapMyIndia API or fallback
          const locationName = `Current Location (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`;
          setLocation(locationName);
          setSelectedLocation({
            description: locationName,
            coordinates: coords,
            type: 'current'
          });

          if (onLocationSelect) {
            onLocationSelect({
              address: locationName,
              coordinates: coords,
              type: 'current'
            });
          }
        },
        (error) => {
          console.error('Error getting location:', error);
          alert('Unable to get your current location. Please select from the list or enter manually.');
        }
      );
    } else {
      alert('Geolocation is not supported by this browser. Please select from the list or enter manually.');
    }
  };

  return (
    <div className="space-y-4">
      <div className="relative">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          <T>Market Location</T> 📍
        </label>
        <div className="flex space-x-2">
          <div className="flex-1 relative">
            <input
              type="text"
              value={location}
              onChange={handleLocationChange}
              placeholder="Search Indian cities, markets, or areas..."
              className="w-full px-4 py-2 pr-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              required
            />
            
            {/* Loading indicator */}
            {isLoading && (
              <div className="absolute right-3 top-2.5">
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-orange-500 border-t-transparent"></div>
              </div>
            )}
            
            {/* Suggestions Dropdown */}
            {suggestions.length > 0 && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {suggestions.map((place) => (
                  <button
                    key={place.id}
                    type="button"
                    onClick={() => selectLocation(place)}
                    className="w-full px-4 py-3 text-left hover:bg-orange-50 focus:bg-orange-50 focus:outline-none border-b border-gray-100 last:border-b-0"
                  >
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {place.description}
                        </p>
                        {place.city && (
                          <p className="text-xs text-orange-600">
                            {place.city}{place.state && `, ${place.state}`}
                          </p>
                        )}
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
          
          <button
            type="button"
            onClick={getCurrentLocation}
            className="px-4 py-2 bg-orange-100 text-orange-700 rounded-lg hover:bg-orange-200 focus:outline-none focus:ring-2 focus:ring-orange-500 transition-colors"
            title="Use current location"
          >
            📍
          </button>
        </div>
      </div>

      {/* Quick Location Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <T>Popular Markets</T> 🏪
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          {popularLocations.slice(0, 6).map((location, index) => (
            <button
              key={index}
              type="button"
              onClick={() => handleQuickLocationSelect(location)}
              className={`px-3 py-2 text-sm text-left rounded-lg border transition-all duration-200 ${
                selectedLocation?.description === location.name
                  ? 'bg-orange-100 border-orange-500 text-orange-800'
                  : 'bg-gray-50 border-gray-200 text-gray-700 hover:bg-orange-50 hover:border-orange-300'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className="text-orange-500">🏪</span>
                <span className="truncate">{location.name}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Location Display */}
      {selectedLocation && (
        <div className="p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-200">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                </svg>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-semibold text-gray-900">
                <T>Selected Location</T>
              </h4>
              <p className="text-sm text-gray-600 mt-1">
                {selectedLocation.description}
              </p>
              {selectedLocation.coordinates && (
                <p className="text-xs text-gray-500 mt-1">
                  <T>Coordinates</T>: {selectedLocation.coordinates.lat.toFixed(4)}, {selectedLocation.coordinates.lng.toFixed(4)}
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      <p className="text-xs text-gray-500">
        <T>This helps other vendors find orders in their area</T>
      </p>
    </div>
  );
};

export default LocationPicker;