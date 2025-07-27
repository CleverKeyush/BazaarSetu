import React, { useEffect, useRef, useState } from 'react';
import 'ol/ol.css';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';
import Circle from 'ol/geom/Circle';
import { fromLonLat, toLonLat } from 'ol/proj';
import { Style, Icon, Text, Fill, Stroke, Circle as CircleStyle } from 'ol/style';
import Overlay from 'ol/Overlay';
import { useAuth } from '../context/AuthContext';
import T from './T';

// Mock data for suppliers with delivery ranges
const mockSuppliers = [
  {
    id: 'sup-1',
    name: 'Mumbai Spice Suppliers',
    type: 'supplier',
    category: 'Spices & Seasonings',
    coordinates: [72.8777, 19.0760], // Mumbai
    deliveryRange: 25, // km
    products: ['Garam Masala', 'Turmeric', 'Red Chili Powder', 'Coriander Seeds'],
    rating: 4.8,
    priceRange: '₹50-500/kg',
    contact: '+91 98765 43210',
    address: 'Crawford Market, Mumbai',
    description: 'Premium quality spices sourced directly from farms',
    image: '🌶️',
    businessHours: '9:00 AM - 7:00 PM',
    minimumOrder: '₹1,000'
  },
  {
    id: 'sup-2',
    name: 'Fresh Veggie Hub',
    type: 'supplier',
    category: 'Fresh Vegetables',
    coordinates: [72.8311, 18.9067], // South Mumbai
    deliveryRange: 15,
    products: ['Onions', 'Tomatoes', 'Potatoes', 'Green Vegetables'],
    rating: 4.6,
    priceRange: '₹20-80/kg',
    contact: '+91 98765 43211',
    address: 'Colaba Market, Mumbai',
    description: 'Farm-fresh vegetables delivered daily',
    image: '🥬',
    businessHours: '6:00 AM - 2:00 PM',
    minimumOrder: '₹500'
  },
  {
    id: 'sup-3',
    name: 'Grain Masters',
    type: 'supplier',
    category: 'Rice & Grains',
    coordinates: [72.8400, 19.0544], // Bandra
    deliveryRange: 30,
    products: ['Basmati Rice', 'Wheat', 'Pulses', 'Quinoa'],
    rating: 4.9,
    priceRange: '₹40-200/kg',
    contact: '+91 98765 43212',
    address: 'Bandra West, Mumbai',
    description: 'Premium grains and cereals wholesale',
    image: '🍛',
    businessHours: '8:00 AM - 6:00 PM',
    minimumOrder: '₹2,000'
  },
  {
    id: 'sup-4',
    name: 'Delhi Spice Market',
    type: 'supplier',
    category: 'Spices & Seasonings',
    coordinates: [77.2090, 28.6139], // Delhi
    deliveryRange: 40,
    products: ['Whole Spices', 'Ground Spices', 'Spice Mixes', 'Dry Fruits'],
    rating: 4.7,
    priceRange: '₹60-800/kg',
    contact: '+91 98765 43213',
    address: 'Khari Baoli, Delhi',
    description: 'Largest spice market in Asia',
    image: '🌶️',
    businessHours: '10:00 AM - 8:00 PM',
    minimumOrder: '₹1,500'
  },
  {
    id: 'sup-5',
    name: 'Bangalore Fresh Produce',
    type: 'supplier',
    category: 'Fresh Vegetables',
    coordinates: [77.5946, 12.9716], // Bangalore
    deliveryRange: 20,
    products: ['Organic Vegetables', 'Fruits', 'Herbs', 'Leafy Greens'],
    rating: 4.8,
    priceRange: '₹30-120/kg',
    contact: '+91 98765 43214',
    address: 'KR Market, Bangalore',
    description: 'Organic and conventional fresh produce',
    image: '🥬',
    businessHours: '5:00 AM - 12:00 PM',
    minimumOrder: '₹800'
  }
];

// Mock data for vendors/restaurants
const mockVendors = [
  {
    id: 'ven-1',
    name: 'Spice Palace Restaurant',
    type: 'vendor',
    category: 'Fine Dining',
    coordinates: [72.8265, 19.0990], // Juhu, Mumbai
    requirements: ['Spices', 'Vegetables', 'Rice'],
    rating: 4.5,
    cuisine: 'North Indian',
    contact: '+91 98765 54321',
    address: 'Juhu Beach Road, Mumbai',
    description: 'Premium North Indian restaurant',
    image: '🍽️',
    businessHours: '12:00 PM - 11:00 PM',
    avgOrderValue: '₹5,000-15,000'
  },
  {
    id: 'ven-2',
    name: 'Mumbai Street Kitchen',
    type: 'vendor',
    category: 'Street Food',
    coordinates: [72.8697, 19.1136], // Andheri
    requirements: ['Vegetables', 'Spices', 'Oil'],
    rating: 4.3,
    cuisine: 'Street Food',
    contact: '+91 98765 54322',
    address: 'Andheri West, Mumbai',
    description: 'Authentic Mumbai street food',
    image: '🍔',
    businessHours: '6:00 PM - 2:00 AM',
    avgOrderValue: '₹2,000-8,000'
  },
  {
    id: 'ven-3',
    name: 'Green Garden Cafe',
    type: 'vendor',
    category: 'Healthy Food',
    coordinates: [72.8484, 19.1868], // Malad
    requirements: ['Organic Vegetables', 'Fruits', 'Grains'],
    rating: 4.7,
    cuisine: 'Continental',
    contact: '+91 98765 54323',
    address: 'Malad West, Mumbai',
    description: 'Healthy and organic food cafe',
    image: '🥗',
    businessHours: '8:00 AM - 10:00 PM',
    avgOrderValue: '₹3,000-12,000'
  },
  {
    id: 'ven-4',
    name: 'Delhi Dhaba',
    type: 'vendor',
    category: 'Traditional',
    coordinates: [77.2090, 28.6139], // Delhi
    requirements: ['Spices', 'Rice', 'Vegetables'],
    rating: 4.4,
    cuisine: 'Punjabi',
    contact: '+91 98765 54324',
    address: 'Connaught Place, Delhi',
    description: 'Traditional Punjabi dhaba',
    image: '🍛',
    businessHours: '11:00 AM - 11:00 PM',
    avgOrderValue: '₹4,000-10,000'
  },
  {
    id: 'ven-5',
    name: 'South Spice Corner',
    type: 'vendor',
    category: 'South Indian',
    coordinates: [77.5946, 12.9716], // Bangalore
    requirements: ['Rice', 'Spices', 'Vegetables'],
    rating: 4.6,
    cuisine: 'South Indian',
    contact: '+91 98765 54325',
    address: 'Brigade Road, Bangalore',
    description: 'Authentic South Indian cuisine',
    image: '🥞',
    businessHours: '7:00 AM - 10:00 PM',
    avgOrderValue: '₹2,500-9,000'
  }
];

const LocationBasedMap = ({ userLocation, onLocationSelect }) => {
  const { user } = useAuth();
  const mapRef = useRef();
  const popupRef = useRef();
  const [map, setMap] = useState(null);
  const [popup, setPopup] = useState(null);
  const [currentLocation, setCurrentLocation] = useState(userLocation);
  const [nearbyEntities, setNearbyEntities] = useState([]);
  const [selectedRadius, setSelectedRadius] = useState(25); // Default 25km radius
  const [loading, setLoading] = useState(false);

  // Calculate distance between two coordinates
  const calculateDistance = (coord1, coord2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (coord2[1] - coord1[1]) * Math.PI / 180;
    const dLon = (coord2[0] - coord1[0]) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(coord1[1] * Math.PI / 180) * Math.cos(coord2[1] * Math.PI / 180) * 
      Math.sin(dLon/2) * Math.sin(dLon/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Get current location
  const getCurrentLocation = () => {
    setLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = [position.coords.longitude, position.coords.latitude];
          setCurrentLocation(coords);
          if (map) {
            map.getView().animate({
              center: fromLonLat(coords),
              zoom: 12,
              duration: 1000,
            });
          }
          setLoading(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to Mumbai coordinates
          const fallbackCoords = [72.8777, 19.0760];
          setCurrentLocation(fallbackCoords);
          if (map) {
            map.getView().animate({
              center: fromLonLat(fallbackCoords),
              zoom: 12,
              duration: 1000,
            });
          }
          setLoading(false);
        }
      );
    } else {
      setLoading(false);
    }
  };

  // Filter entities based on user type and location
  const filterNearbyEntities = () => {
    if (!currentLocation) return;

    let entities = [];
    
    if (user?.userType === 'vendor') {
      // Vendors see suppliers
      entities = mockSuppliers.filter(supplier => {
        const distance = calculateDistance(currentLocation, supplier.coordinates);
        return distance <= supplier.deliveryRange;
      });
    } else if (user?.userType === 'supplier') {
      // Suppliers see vendors within their delivery range
      entities = mockVendors.filter(vendor => {
        const distance = calculateDistance(currentLocation, vendor.coordinates);
        return distance <= selectedRadius;
      });
    }

    // Add distance to each entity
    entities = entities.map(entity => ({
      ...entity,
      distance: calculateDistance(currentLocation, entity.coordinates)
    }));

    // Sort by distance
    entities.sort((a, b) => a.distance - b.distance);
    
    setNearbyEntities(entities);
  };

  useEffect(() => {
    if (currentLocation) {
      filterNearbyEntities();
    }
  }, [currentLocation, selectedRadius, user]);

  useEffect(() => {
    // Initialize the map
    const initialMap = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
      ],
      view: new View({
        center: fromLonLat(currentLocation || [72.8777, 19.0760]),
        zoom: 12,
      }),
    });

    // Create popup overlay
    const popupOverlay = new Overlay({
      element: popupRef.current,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -10],
    });

    initialMap.addOverlay(popupOverlay);

    // Create vector layers
    const vectorSource = new VectorSource();
    const vectorLayer = new VectorLayer({
      source: vectorSource,
    });

    initialMap.addLayer(vectorLayer);

    // Add current location marker
    if (currentLocation) {
      const currentLocationFeature = new Feature({
        geometry: new Point(fromLonLat(currentLocation)),
        type: 'currentLocation'
      });

      currentLocationFeature.setStyle(
        new Style({
          image: new CircleStyle({
            radius: 8,
            fill: new Fill({ color: '#4285F4' }),
            stroke: new Stroke({ color: '#ffffff', width: 2 }),
          }),
          text: new Text({
            text: 'You',
            offsetY: -25,
            fill: new Fill({ color: '#4285F4' }),
            stroke: new Stroke({ color: '#fff', width: 2 }),
            font: '12px Arial',
          }),
        })
      );

      vectorSource.addFeature(currentLocationFeature);

      // Add radius circle for suppliers
      if (user?.userType === 'supplier') {
        const radiusFeature = new Feature({
          geometry: new Circle(fromLonLat(currentLocation), selectedRadius * 1000), // Convert km to meters
          type: 'deliveryRadius'
        });

        radiusFeature.setStyle(
          new Style({
            stroke: new Stroke({
              color: 'rgba(66, 133, 244, 0.5)',
              width: 2,
            }),
            fill: new Fill({
              color: 'rgba(66, 133, 244, 0.1)',
            }),
          })
        );

        vectorSource.addFeature(radiusFeature);
      }
    }

    // Add nearby entities
    nearbyEntities.forEach((entity) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat(entity.coordinates)),
        entity: entity,
      });

      const isSupplier = entity.type === 'supplier';
      const color = isSupplier ? '#10B981' : '#F59E0B'; // Green for suppliers, Orange for vendors

      feature.setStyle(
        new Style({
          image: new Icon({
            src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
              <svg width="30" height="40" viewBox="0 0 30 40" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 0C6.716 0 0 6.716 0 15c0 8.284 15 25 15 25s15-16.716 15-25C30 6.716 23.284 0 15 0z" fill="${color}"/>
                <circle cx="15" cy="15" r="8" fill="white"/>
                <circle cx="15" cy="15" r="4" fill="${color}"/>
              </svg>
            `)}`,
            scale: 1,
          }),
          text: new Text({
            text: entity.name,
            offsetY: 25,
            fill: new Fill({ color: '#000' }),
            stroke: new Stroke({ color: '#fff', width: 2 }),
            font: '11px Arial',
          }),
        })
      );

      vectorSource.addFeature(feature);
    });

    // Handle click events
    initialMap.on('click', (event) => {
      const feature = initialMap.forEachFeatureAtPixel(event.pixel, (feature) => feature);
      
      if (feature && feature.get('entity')) {
        const entity = feature.get('entity');
        const coordinate = event.coordinate;
        
        // Show popup
        popupOverlay.setPosition(coordinate);
        setPopup(entity);
        
        // Notify parent component
        if (onLocationSelect) {
          onLocationSelect(entity);
        }
      } else {
        // Hide popup
        popupOverlay.setPosition(undefined);
        setPopup(null);
      }
    });

    setMap(initialMap);

    return () => {
      initialMap.setTarget(null);
    };
  }, [currentLocation, nearbyEntities, selectedRadius, user]);

  return (
    <div className="relative">
      {/* Controls */}
      <div className="absolute top-4 left-4 z-10 bg-white rounded-lg shadow-lg p-4 max-w-sm">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-gray-900">
            {user?.userType === 'vendor' ? (
              <T>🚚 Find Suppliers</T>
            ) : (
              <T>🍽️ Find Vendors</T>
            )}
          </h3>
          <button
            onClick={getCurrentLocation}
            disabled={loading}
            className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? <T>📍 Locating...</T> : <T>📍 My Location</T>}
          </button>
        </div>

        {user?.userType === 'supplier' && (
          <div className="mb-3">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              <T>Delivery Range</T>
            </label>
            <select
              value={selectedRadius}
              onChange={(e) => setSelectedRadius(Number(e.target.value))}
              className="w-full border border-gray-300 rounded px-3 py-1 text-sm"
            >
              <option value={10}>10 km</option>
              <option value={15}>15 km</option>
              <option value={20}>20 km</option>
              <option value={25}>25 km</option>
              <option value={30}>30 km</option>
              <option value={40}>40 km</option>
              <option value={50}>50 km</option>
            </select>
          </div>
        )}

        <div className="text-sm text-gray-600">
          <p className="mb-1">
            <T>Found: {nearbyEntities.length} {user?.userType === 'vendor' ? 'suppliers' : 'vendors'}</T>
          </p>
          {currentLocation && (
            <p className="text-xs text-gray-500">
              <T>📍 Your location: {currentLocation[1].toFixed(4)}, {currentLocation[0].toFixed(4)}</T>
            </p>
          )}
        </div>
      </div>

      {/* Map */}
      <div 
        ref={mapRef} 
        className="w-full h-96 rounded-lg border border-gray-300"
        style={{ height: '500px' }}
      />
      
      {/* Popup */}
      <div
        ref={popupRef}
        className={`absolute bg-white rounded-lg shadow-lg p-4 max-w-sm border border-gray-200 ${
          popup ? 'block' : 'hidden'
        }`}
        style={{ minWidth: '300px' }}
      >
        {popup && (
          <div>
            <div className="flex items-center space-x-3 mb-3">
              <div className="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-2xl">
                {popup.image}
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-900">{popup.name}</h3>
                <p className="text-sm text-blue-600 font-medium">{popup.category}</p>
              </div>
            </div>
            
            <div className="space-y-2 text-sm mb-3">
              <div className="flex justify-between">
                <span className="text-gray-600"><T>Distance</T>:</span>
                <span className="font-medium">{popup.distance?.toFixed(1)} km</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600"><T>Rating</T>:</span>
                <span className="font-medium">⭐ {popup.rating}</span>
              </div>
              {popup.type === 'supplier' ? (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600"><T>Price Range</T>:</span>
                    <span className="font-medium text-green-600">{popup.priceRange}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600"><T>Delivery Range</T>:</span>
                    <span className="font-medium">{popup.deliveryRange} km</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600"><T>Min Order</T>:</span>
                    <span className="font-medium">{popup.minimumOrder}</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between">
                    <span className="text-gray-600"><T>Cuisine</T>:</span>
                    <span className="font-medium">{popup.cuisine}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600"><T>Avg Order</T>:</span>
                    <span className="font-medium text-green-600">{popup.avgOrderValue}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between">
                <span className="text-gray-600"><T>Hours</T>:</span>
                <span className="font-medium text-xs">{popup.businessHours}</span>
              </div>
            </div>
            
            <div className="mb-3">
              <p className="text-sm text-gray-600 mb-2 font-medium">
                {popup.type === 'supplier' ? <T>Products</T> : <T>Requirements</T>}:
              </p>
              <div className="flex flex-wrap gap-1">
                {(popup.products || popup.requirements)?.slice(0, 3).map((item, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                  >
                    {item}
                  </span>
                ))}
                {(popup.products || popup.requirements)?.length > 3 && (
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                    +{(popup.products || popup.requirements).length - 3} more
                  </span>
                )}
              </div>
            </div>
            
            <div className="mb-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">{popup.description}</p>
              <p className="text-xs text-gray-400 mt-1">📍 {popup.address}</p>
              <p className="text-xs text-gray-400">📞 {popup.contact}</p>
            </div>
            
            <div className="flex space-x-2">
              <button className="flex-1 bg-green-600 text-white py-2 px-3 rounded text-sm hover:bg-green-700 transition-colors">
                <T>📞 Contact</T>
              </button>
              <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded text-sm hover:bg-blue-700 transition-colors">
                <T>📋 View Details</T>
              </button>
            </div>
            
            <button
              onClick={() => {
                setPopup(null);
                if (map) {
                  map.getOverlays().getArray()[0].setPosition(undefined);
                }
              }}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white rounded-lg shadow-lg p-3">
        <h4 className="text-sm font-semibold text-gray-900 mb-2">
          <T>Map Legend</T>
        </h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
            <span><T>Your Location</T></span>
          </div>
          {user?.userType === 'vendor' && (
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span><T>Suppliers</T></span>
            </div>
          )}
          {user?.userType === 'supplier' && (
            <>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span><T>Vendors</T></span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 border border-blue-500 rounded-full bg-blue-100"></div>
                <span><T>Delivery Range</T></span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default LocationBasedMap;