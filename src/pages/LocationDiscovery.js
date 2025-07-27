import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import LocationBasedMap from '../components/LocationBasedMap';
import LocationStats from '../components/LocationStats';
import DemoGuide from '../components/DemoGuide';
import AnimatedBackground from '../components/AnimatedBackground';
import EnhancedCard from '../components/EnhancedCard';
import InteractiveButton from '../components/InteractiveButton';
import T from '../components/T';

const LocationDiscovery = () => {
  const { user } = useAuth();
  const [selectedEntity, setSelectedEntity] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState('prompt');
  const [nearbyList, setNearbyList] = useState([]);

  useEffect(() => {
    // Check location permission status
    if (navigator.permissions) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        setLocationPermission(result.state);
      });
    }

    // Get user's current location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
        },
        (error) => {
          console.error('Error getting location:', error);
          // Fallback to Mumbai coordinates
          setUserLocation([72.8777, 19.0760]);
        }
      );
    } else {
      // Fallback to Mumbai coordinates
      setUserLocation([72.8777, 19.0760]);
    }
  }, []);

  const handleEntitySelect = (entity) => {
    setSelectedEntity(entity);
  };

  const handleContactEntity = (entity) => {
    // In a real app, this would open a contact form or messaging system
    alert(`Contacting ${entity.name} at ${entity.contact}`);
  };

  const handleRequestQuote = (entity) => {
    // In a real app, this would open a quote request form
    alert(`Requesting quote from ${entity.name}`);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center">
          <EnhancedCard animation="scale" glow={true} className="text-center max-w-md">
            <div className="text-8xl mb-6 animate-bounce">🔒</div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-red-600 to-orange-600 bg-clip-text text-transparent mb-4">
              <T>Authentication Required</T>
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              <T>Please log in to access location-based discovery</T>
            </p>
            <InteractiveButton
              to="/login"
              variant="gradient"
              size="lg"
              animation="glow"
              icon="🚀"
            >
              <T>Login Now</T>
            </InteractiveButton>
          </EnhancedCard>
        </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="container mx-auto px-4 py-8">
        {/* Enhanced Header */}
        <div className="text-center mb-12">
          <div className="inline-block p-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-6 shadow-2xl animate-bounce">
            <span className="text-6xl">
              {user.userType === 'vendor' ? '🚚' : '🍽️'}
            </span>
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            {user.userType === 'vendor' ? (
              <T>Find Local Food Suppliers</T>
            ) : (
              <T>Discover Nearby Food Vendors</T>
            )}
          </h1>
          <p className="text-gray-700 text-xl max-w-3xl mx-auto leading-relaxed">
            {user.userType === 'vendor' ? (
              <T>Connect with suppliers in your area for fresh ingredients and raw materials</T>
            ) : (
              <T>Find restaurants and food vendors within your delivery range</T>
            )}
          </p>
        </div>

        {/* Enhanced Location Permission Notice */}
        {locationPermission === 'denied' && (
          <EnhancedCard className="mb-8 bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200" animation="slide-up">
            <div className="flex items-center">
              <div className="text-yellow-600 mr-4 text-3xl animate-bounce">⚠️</div>
              <div>
                <h3 className="font-bold text-yellow-800 text-lg mb-2">
                  <T>Location Access Denied</T>
                </h3>
                <p className="text-yellow-700">
                  <T>Please enable location access in your browser settings for better results. We'll use Mumbai as the default location.</T>
                </p>
              </div>
            </div>
          </EnhancedCard>
        )}

        {/* Demo Guide */}
        <DemoGuide />

        {/* Enhanced User Info Card */}
        <EnhancedCard className="mb-8" hover={true} glow={true} animation="fade-in">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <div className="relative">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full flex items-center justify-center text-3xl shadow-xl animate-pulse">
                  {user.userType === 'vendor' ? '🍽️' : '🏪'}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center animate-ping">
                  <span className="text-white text-xs">✓</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{user.name}</h2>
                <p className="text-gray-600 text-lg">{user.company}</p>
                <p className="text-sm font-medium px-3 py-1 bg-blue-100 text-blue-800 rounded-full inline-block mt-1">
                  {user.userType === 'vendor' ? <T>Food Vendor</T> : <T>Food Supplier</T>}
                </p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-gray-600 mb-2">
                <T>Looking for</T>:
              </p>
              <p className="font-bold text-xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
                {user.userType === 'vendor' ? (
                  <T>🚚 Local Suppliers</T>
                ) : (
                  <T>🍽️ Food Vendors</T>
                )}
              </p>
            </div>
          </div>
        </EnhancedCard>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-gray-900">
                  {user.userType === 'vendor' ? (
                    <T>🗺️ Suppliers Near You</T>
                  ) : (
                    <T>🗺️ Vendors in Your Area</T>
                  )}
                </h3>
                <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-100 px-3 py-1 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span><T>Live Location</T></span>
                </div>
              </div>
              
              {userLocation ? (
                <LocationBasedMap 
                  userLocation={userLocation}
                  onLocationSelect={handleEntitySelect}
                />
              ) : (
                <div className="h-96 bg-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
                    <p className="text-gray-600">
                      <T>Loading map and detecting your location...</T>
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Selected Entity Details */}
          <div className="lg:col-span-1 space-y-6">
            {/* Location Statistics */}
            <LocationStats nearbyEntities={nearbyList} userLocation={userLocation} />
            
            {selectedEntity ? (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-400 rounded-full flex items-center justify-center text-3xl">
                    {selectedEntity.image}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{selectedEntity.name}</h3>
                    <p className="text-blue-600 font-medium">{selectedEntity.category}</p>
                    <p className="text-sm text-gray-500">{selectedEntity.distance?.toFixed(1)} km away</p>
                  </div>
                </div>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between">
                    <span className="text-gray-600"><T>Rating</T>:</span>
                    <span className="font-medium">⭐ {selectedEntity.rating}</span>
                  </div>
                  
                  {selectedEntity.type === 'supplier' ? (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600"><T>Price Range</T>:</span>
                        <span className="font-medium text-green-600">{selectedEntity.priceRange}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600"><T>Delivery Range</T>:</span>
                        <span className="font-medium">{selectedEntity.deliveryRange} km</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600"><T>Min Order</T>:</span>
                        <span className="font-medium">{selectedEntity.minimumOrder}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600"><T>Cuisine</T>:</span>
                        <span className="font-medium">{selectedEntity.cuisine}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600"><T>Avg Order</T>:</span>
                        <span className="font-medium text-green-600">{selectedEntity.avgOrderValue}</span>
                      </div>
                    </>
                  )}
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600"><T>Hours</T>:</span>
                    <span className="font-medium text-sm">{selectedEntity.businessHours}</span>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm text-gray-600 mb-2 font-medium">
                    {selectedEntity.type === 'supplier' ? <T>Products Available</T> : <T>Requirements</T>}:
                  </p>
                  <div className="flex flex-wrap gap-1">
                    {(selectedEntity.products || selectedEntity.requirements)?.map((item, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <p className="text-sm text-gray-700">{selectedEntity.description}</p>
                  <p className="text-xs text-gray-500 mt-2">📍 {selectedEntity.address}</p>
                  <p className="text-xs text-gray-500">📞 {selectedEntity.contact}</p>
                </div>

                <div className="space-y-2">
                  <button 
                    onClick={() => handleContactEntity(selectedEntity)}
                    className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium"
                  >
                    <T>📞 Contact Now</T>
                  </button>
                  <button 
                    onClick={() => handleRequestQuote(selectedEntity)}
                    className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                  >
                    <T>📋 Request Quote</T>
                  </button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <div className="text-center py-8">
                  <div className="text-6xl mb-4">
                    {user.userType === 'vendor' ? '🚚' : '🍽️'}
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    {user.userType === 'vendor' ? (
                      <T>Select a Supplier</T>
                    ) : (
                      <T>Select a Vendor</T>
                    )}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {user.userType === 'vendor' ? (
                      <T>Click on any supplier marker on the map to view details and contact information</T>
                    ) : (
                      <T>Click on any vendor marker on the map to view details and contact information</T>
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Tips */}
        <div className="mt-8 bg-white rounded-xl shadow-lg p-6 border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">
            <T>💡 Quick Tips for Better Results</T>
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="text-blue-500 mt-1">📍</div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    <T>Enable Location Access</T>
                  </h4>
                  <p className="text-sm text-gray-600">
                    <T>Allow location access for accurate distance calculations and better matches</T>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-green-500 mt-1">🎯</div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    {user.userType === 'vendor' ? (
                      <T>Check Delivery Ranges</T>
                    ) : (
                      <T>Set Your Delivery Range</T>
                    )}
                  </h4>
                  <p className="text-sm text-gray-600">
                    {user.userType === 'vendor' ? (
                      <T>Each supplier has a specific delivery range - make sure you're within it</T>
                    ) : (
                      <T>Adjust your delivery range to find more vendors in your service area</T>
                    )}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="text-orange-500 mt-1">⏰</div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    <T>Check Business Hours</T>
                  </h4>
                  <p className="text-sm text-gray-600">
                    <T>Contact suppliers/vendors during their business hours for faster response</T>
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="text-purple-500 mt-1">💰</div>
                <div>
                  <h4 className="font-medium text-gray-900">
                    <T>Review Minimum Orders</T>
                  </h4>
                  <p className="text-sm text-gray-600">
                    {user.userType === 'vendor' ? (
                      <T>Check minimum order requirements before contacting suppliers</T>
                    ) : (
                      <T>Consider vendor order volumes when setting your minimum requirements</T>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationDiscovery;