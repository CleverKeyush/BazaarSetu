import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MandiPrices from '../components/MandiPrices';
import OpenLayersMap, { streetFoodVendors } from '../components/OpenLayersMap';
import VendorSpendingTracker from '../components/VendorSpendingTracker';
import { useAuth } from '../context/AuthContext';
import T from '../components/T';

const VendorDashboard = () => {
  const { user } = useAuth();
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [vendorLocation, setVendorLocation] = useState({
    city: 'Delhi',
    state: 'Delhi',
    coordinates: { lat: 28.6139, lng: 77.2090 }
  });
  const [recentOrders, setRecentOrders] = useState([]);
  const [nearbySuppliers, setNearbySuppliers] = useState([]);
  const [bulkOrders, setBulkOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Get vendor location (in production, this would come from user profile or geolocation)
    detectVendorLocation();
    fetchLocationBasedData();
  }, []); // Remove vendorLocation.city dependency to prevent re-renders

  const detectVendorLocation = () => {
    // Mock location detection based on user profile or geolocation
    // In production, this would use actual geolocation API or user profile data
    const mockLocations = {
      'vendor-1': { city: 'Delhi', state: 'Delhi', coordinates: { lat: 28.6139, lng: 77.2090 } },
      'demo-vendor': { city: 'Delhi', state: 'Delhi', coordinates: { lat: 28.6139, lng: 77.2090 } }
    };

    const userLocation = mockLocations[user?.id] || mockLocations['demo-vendor'];
    setVendorLocation(userLocation);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Radius of the Earth in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in kilometers
  };

  const fetchLocationBasedData = async () => {
    try {
      setLoading(true);

      // Mock data with various locations
      const allOrders = [
        {
          id: 'F1234',
          product: 'Spice Masala Mix - 50kg',
          supplier: 'Rajesh Spice Co.',
          location: 'Khari Baoli, Delhi',
          coordinates: { lat: 28.6562, lng: 77.2410 },
          status: 'Preparing',
          emoji: '🥘'
        },
        {
          id: 'F1235',
          product: 'Basmati Rice - 100kg',
          supplier: 'Premium Rice Mills',
          location: 'Azadpur Mandi, Delhi',
          coordinates: { lat: 28.7041, lng: 77.1025 },
          status: 'Delivered',
          emoji: '🍛'
        },
        {
          id: 'F1236',
          product: 'Fresh Vegetables - Mixed',
          supplier: 'Fresh Veggie Mart',
          location: 'Crawford Market, Mumbai',
          coordinates: { lat: 18.9667, lng: 72.8333 },
          status: 'In Transit',
          emoji: '🥬'
        },
        {
          id: 'F1237',
          product: 'Organic Pulses - 25kg',
          supplier: 'Delhi Organic Foods',
          location: 'Connaught Place, Delhi',
          coordinates: { lat: 28.6315, lng: 77.2167 },
          status: 'Processing',
          emoji: '🫘'
        },
        {
          id: 'F1238',
          product: 'Fresh Paneer - 10kg',
          supplier: 'Mumbai Dairy Fresh',
          location: 'Aarey Colony, Mumbai',
          coordinates: { lat: 19.2183, lng: 72.8781 },
          status: 'Shipped',
          emoji: '🧀'
        }
      ];

      const allSuppliers = [
        {
          id: 'supplier-1',
          name: 'Rajesh Spice Co.',
          category: 'Spices',
          ordersCompleted: 23,
          totalSpent: 125000,
          location: 'Khari Baoli, Delhi',
          coordinates: { lat: 28.6562, lng: 77.2410 },
          emoji: '🌶️'
        },
        {
          id: 'supplier-2',
          name: 'Fresh Veggie Mart',
          category: 'Vegetables',
          ordersCompleted: 18,
          totalSpent: 89500,
          location: 'Azadpur Mandi, Delhi',
          coordinates: { lat: 28.7041, lng: 77.1025 },
          emoji: '🥬'
        },
        {
          id: 'supplier-3',
          name: 'Premium Rice Mills',
          category: 'Grains',
          ordersCompleted: 15,
          totalSpent: 67200,
          location: 'Karnal, Haryana',
          coordinates: { lat: 29.6857, lng: 76.9905 },
          emoji: '🍛'
        },
        {
          id: 'supplier-4',
          name: 'Mumbai Dairy Fresh',
          category: 'Dairy',
          ordersCompleted: 31,
          totalSpent: 156000,
          location: 'Aarey Colony, Mumbai',
          coordinates: { lat: 19.2183, lng: 72.8781 },
          emoji: '🥛'
        },
        {
          id: 'supplier-5',
          name: 'Delhi Organic Foods',
          category: 'Organic',
          ordersCompleted: 12,
          totalSpent: 45000,
          location: 'Connaught Place, Delhi',
          coordinates: { lat: 28.6315, lng: 77.2167 },
          emoji: '🌱'
        }
      ];

      const allBulkOrders = [
        {
          id: 'bulk-1',
          title: 'Spice Bulk Order',
          participants: 7,
          maxParticipants: 12,
          targetAmount: 75000,
          location: 'Khari Baoli, Delhi',
          coordinates: { lat: 28.6562, lng: 77.2410 },
          deadline: 'Feb 18, 2025',
          emoji: '🌶️'
        },
        {
          id: 'bulk-2',
          title: 'Rice & Grains Bulk',
          participants: 4,
          maxParticipants: 10,
          targetAmount: 150000,
          location: 'Azadpur Mandi, Delhi',
          coordinates: { lat: 28.7041, lng: 77.1025 },
          deadline: 'Feb 25, 2025',
          emoji: '🍛'
        },
        {
          id: 'bulk-3',
          title: 'Fresh Produce Bulk',
          participants: 9,
          maxParticipants: 15,
          targetAmount: 90000,
          location: 'Crawford Market, Mumbai',
          coordinates: { lat: 18.9667, lng: 72.8333 },
          deadline: 'Feb 20, 2025',
          emoji: '🥬'
        },
        {
          id: 'bulk-4',
          title: 'Dairy Products Bulk',
          participants: 6,
          maxParticipants: 8,
          targetAmount: 120000,
          location: 'Connaught Place, Delhi',
          coordinates: { lat: 28.6315, lng: 77.2167 },
          deadline: 'Feb 22, 2025',
          emoji: '🥛'
        }
      ];

      // Filter by location proximity (within 50km for orders, 5km for suppliers)
      const nearbyOrders = allOrders.filter(order => {
        const distance = calculateDistance(
          vendorLocation.coordinates.lat,
          vendorLocation.coordinates.lng,
          order.coordinates.lat,
          order.coordinates.lng
        );
        return distance <= 50; // 50km radius for orders
      }).slice(0, 3);

      const nearbySuppliersFiltered = allSuppliers.filter(supplier => {
        const distance = calculateDistance(
          vendorLocation.coordinates.lat,
          vendorLocation.coordinates.lng,
          supplier.coordinates.lat,
          supplier.coordinates.lng
        );
        return distance <= 5; // 5km radius for suppliers
      }).map(supplier => ({
        ...supplier,
        distance: calculateDistance(
          vendorLocation.coordinates.lat,
          vendorLocation.coordinates.lng,
          supplier.coordinates.lat,
          supplier.coordinates.lng
        )
      })).sort((a, b) => b.ordersCompleted - a.ordersCompleted).slice(0, 3);

      const nearbyBulkOrders = allBulkOrders.filter(order => {
        const distance = calculateDistance(
          vendorLocation.coordinates.lat,
          vendorLocation.coordinates.lng,
          order.coordinates.lat,
          order.coordinates.lng
        );
        return distance <= 25; // 25km radius for bulk orders
      }).slice(0, 3);

      setRecentOrders(nearbyOrders);
      setNearbySuppliers(nearbySuppliersFiltered);
      setBulkOrders(nearbyBulkOrders);

    } catch (error) {
      console.error('Error fetching location-based data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Preparing': 'bg-yellow-100 text-yellow-800',
      'Delivered': 'bg-green-100 text-green-800',
      'In Transit': 'bg-blue-100 text-blue-800',
      'Processing': 'bg-purple-100 text-purple-800',
      'Shipped': 'bg-indigo-100 text-indigo-800'
    };
    return colors[status] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          {/* Enhanced User Welcome Section */}
          <div className="mb-6">
            <div className="inline-flex items-center space-x-4 bg-white px-6 py-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-2xl font-bold text-white">{user?.name?.charAt(0).toUpperCase() || 'U'}</span>
              </div>
              <div className="text-left">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  <T>Welcome back, {user?.name || 'User'}!</T>
                </h2>
                <p className="text-blue-600 font-medium flex items-center space-x-2">
                  <span>🍽️</span>
                  <span><T>{user?.company || 'Food Business'}</T></span>
                  <span className="text-gray-400">•</span>
                  <span className="text-green-600 font-semibold"><T>Vendor Account</T></span>
                </p>
              </div>
            </div>
          </div>

          <div className="inline-block p-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mb-4 animate-bounce">
            <span className="text-4xl">🍽️</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <T>Street Food Vendor Dashboard</T>
          </h1>
          <p className="text-gray-600 text-lg">
            <T>Manage your street food business, suppliers, and orders</T>
          </p>

          {/* Enhanced Location Indicator */}
          <div className="mt-4 inline-flex items-center space-x-3 bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-3 rounded-full shadow-md border border-green-200 hover:shadow-lg transition-all duration-300">
            <span className="text-xl animate-bounce">📍</span>
            <div className="flex flex-col text-left">
              <span className="text-sm font-bold text-green-800">
                <T>Your Business Location</T>
              </span>
              <span className="text-xs font-medium text-green-600">
                <T>{vendorLocation.city}, {vendorLocation.state}</T>
              </span>
            </div>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-600 font-medium"><T>Live</T></span>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-orange-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <T>Food Orders</T>
                </h3>
                <p className="text-3xl font-bold text-orange-600">47</p>
                <p className="text-sm text-gray-500"><T>+18% from last week</T></p>
              </div>
              <div className="p-3 bg-orange-100 rounded-full">
                <span className="text-2xl">🍽️</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <T>Nearby Food Suppliers</T>
                </h3>
                <p className="text-3xl font-bold text-green-600">12</p>
                <p className="text-sm text-gray-500"><T>Within 5km radius</T></p>
              </div>
              <div className="p-3 bg-green-100 rounded-full">
                <span className="text-2xl">🚚</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-purple-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <T>Daily Spending</T>
                </h3>
                <p className="text-3xl font-bold text-purple-600">₹2,850</p>
                <p className="text-sm text-gray-500"><T>+10% from yesterday</T></p>
              </div>
              <div className="p-3 bg-purple-100 rounded-full">
                <span className="text-2xl">🛒</span>
              </div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  <T>Food Categories</T>
                </h3>
                <p className="text-3xl font-bold text-blue-600">10</p>
                <p className="text-sm text-gray-500"><T>Spices, vegetables, grains</T></p>
              </div>
              <div className="p-3 bg-blue-100 rounded-full">
                <span className="text-2xl">🌶️</span>
              </div>
            </div>
          </div>
        </div>

        {/* Food Suppliers Map Section - Single Instance */}
        <div className="mb-8">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-orange-500">
            <div className="p-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-t-xl">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    🗺️ <T>Find Street Food Vendors Near You</T>
                  </h2>
                  <p className="text-sm text-gray-600">
                    <T>Discover authentic street food vendors across India</T>
                  </p>
                </div>
                <div className="flex space-x-3">
                  <Link
                    to="/location-discovery"
                    className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors font-medium shadow-md hover:shadow-lg"
                  >
                    <T>🎯 Find Nearby Vendors</T>
                  </Link>
                  <Link
                    to="/maps"
                    className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition-colors font-medium"
                  >
                    <T>View Full Map</T>
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-6">
              <div 
                id="vendor-dashboard-map" 
                style={{ 
                  height: '500px', 
                  width: '100%',
                  position: 'relative',
                  overflow: 'hidden'
                }}
              >
                <OpenLayersMap 
                  key={`vendor-map-${user?.id || 'default'}`}
                  onVendorSelect={setSelectedSupplier} 
                  selectedVendor={selectedSupplier} 
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vendor Spending Tracker */}
        <div className="mb-8">
          <VendorSpendingTracker userId={user?.id || 'demo-vendor'} />
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-t-xl">
              <h2 className="text-xl font-semibold text-gray-900">
                🍽️ <T>Recent Food Orders</T>
              </h2>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order) => (
                      <div key={order.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-orange-50 to-red-50 rounded-lg border border-orange-100">
                        <div>
                          <p className="font-medium">{order.emoji} <T>Order #{order.id}</T></p>
                          <p className="text-sm text-gray-500"><T>{order.product}</T></p>
                          <p className="text-xs text-gray-400">📍 <T>{order.location}</T></p>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          <T>{order.status}</T>
                        </span>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-4xl mb-2">🍽️</div>
                      <p className="text-gray-600"><T>No recent orders in your area</T></p>
                      <p className="text-sm text-gray-500 mt-1">
                        <T>Orders within 50km of {vendorLocation.city} will appear here</T>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
              <h2 className="text-xl font-semibold text-gray-900">
                🚚 <T>Top Nearby Food Suppliers</T>
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                <T>Within 5km delivery radius</T>
              </p>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {nearbySuppliers.length > 0 ? (
                    nearbySuppliers.map((supplier) => (
                      <div key={supplier.id} className="flex justify-between items-center p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
                        <div>
                          <p className="font-medium">{supplier.emoji} <T>{supplier.name}</T></p>
                          <p className="text-sm text-gray-500"><T>{supplier.ordersCompleted} orders completed</T></p>
                          <p className="text-xs text-gray-400">📍 <T>{supplier.location}</T> • {supplier.distance.toFixed(1)}km</p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-green-600">₹{supplier.totalSpent.toLocaleString()}</p>
                          <p className="text-sm text-gray-500"><T>Total spent</T></p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-4xl mb-2">🚚</div>
                      <p className="text-gray-600"><T>No suppliers found nearby</T></p>
                      <p className="text-sm text-gray-500 mt-1">
                        <T>Suppliers within 5km of {vendorLocation.city} will appear here</T>
                      </p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-xl">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">
                  🛒 <T>Bulk Food Orders</T>
                </h2>
                <Link to="/group-orders" className="text-orange-600 hover:text-orange-800 text-sm font-medium">
                  <T>View All</T>
                </Link>
              </div>
            </div>
            <div className="p-6">
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-purple-600"></div>
                </div>
              ) : (
                <div className="space-y-4">
                  {bulkOrders.length > 0 ? (
                    bulkOrders.map((order) => (
                      <div key={order.id} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border-l-4 border-blue-400">
                        <p className="font-medium text-blue-900">{order.emoji} <T>{order.title}</T></p>
                        <p className="text-sm text-blue-700">
                          <T>{order.participants}/{order.maxParticipants} participants • ₹{order.targetAmount.toLocaleString()} target</T>
                        </p>
                        <p className="text-xs text-blue-600 mt-1">📍 <T>{order.location}</T></p>
                        <p className="text-xs text-blue-600"><T>Deadline: {order.deadline}</T></p>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8">
                      <div className="text-gray-400 text-4xl mb-2">🛒</div>
                      <p className="text-gray-600"><T>No bulk orders in your area</T></p>
                      <p className="text-sm text-gray-500 mt-1">
                        <T>Bulk orders within 25km of {vendorLocation.city} will appear here</T>
                      </p>
                    </div>
                  )}
                </div>
              )}
              <div className="mt-6">
                <Link
                  to="/group-orders"
                  className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-3 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-center block font-semibold shadow-md hover:shadow-lg"
                >
                  <T>Browse Food Bulk Orders</T>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Mandi Prices Section - Indian Theme */}
        <div className="mt-8">
          <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-green-500">
            <div className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    🌾 <T>Live Market Rates</T>
                  </h2>
                  <p className="text-sm text-gray-600">
                    <T>Real-time commodity prices from Indian mandis</T>
                  </p>
                </div>
                <div className="flex items-center space-x-2 text-sm text-green-600 bg-green-100 px-3 py-2 rounded-full">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-medium">Live Updates</span>
                </div>
              </div>
            </div>

            <div className="p-6">
              <MandiPrices showHeader={false} limit={5} />

              <div className="mt-6 text-center">
                <Link
                  to="/mandi-prices"
                  className="inline-block bg-gradient-to-r from-green-500 to-emerald-500 text-white px-6 py-3 rounded-lg hover:from-green-600 hover:to-emerald-600 transition-all duration-300 font-semibold shadow-md hover:shadow-lg"
                >
                  <T>View All Mandi Prices</T> →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VendorDashboard;