import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import GroupOrderCard from '../components/GroupOrderCard';
import LocationPicker from '../components/LocationPicker';
import T from '../components/T';

const GroupOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [newOrder, setNewOrder] = useState({
    title: '',
    description: '',
    productName: '',
    productCategory: '',
    targetPrice: '',
    quantityNeeded: '',
    minQuantity: '',
    maxParticipants: '',
    deadline: '',
    location: '',
    coordinates: null
  });

  useEffect(() => {
    fetchGroupOrders();
  }, []);

  const fetchGroupOrders = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/group-orders', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      if (response.ok) {
        const data = await response.json();
        setOrders(data.orders);
      }
    } catch (error) {
      // Mock data for Indian street food vendor marketplace
      const mockOrders = [
        {
          id: '1',
          title: 'Bulk Spice Order for Street Food Vendors',
          description: 'Looking for street food vendors to join bulk purchase of authentic Indian spices including garam masala, turmeric, and red chili powder.',
          productName: 'Premium Garam Masala Mix - 25kg',
          productCategory: 'spices',
          targetPrice: 3750,
          quantityNeeded: 100,
          minQuantity: 25,
          maxParticipants: 10,
          deadline: '2025-02-15',
          location: 'Khari Baoli, Delhi, India',
          coordinates: { lat: 28.6562, lng: 77.2410 },
          status: 'active',
          createdBy: { id: '1', name: 'Ravi Kumar' },
          createdAt: '2025-01-20',
          participants: [
            { userId: '1', name: 'Ravi Kumar', quantity: 25 },
            { userId: '2', name: 'Sita Sharma', quantity: 30 }
          ]
        },
        {
          id: '2',
          title: 'Fresh Vegetable Bulk Order',
          description: 'Group order for fresh vegetables - onions, tomatoes, potatoes, and leafy greens for street food preparation.',
          productName: 'Mixed Fresh Vegetables - 500kg',
          productCategory: 'vegetables',
          targetPrice: 12500,
          quantityNeeded: 1000,
          minQuantity: 200,
          maxParticipants: 8,
          deadline: '2025-02-20',
          location: 'Azadpur Mandi, Delhi, India',
          coordinates: { lat: 28.7041, lng: 77.1025 },
          status: 'active',
          createdBy: { id: '3', name: 'Shankar Foods' },
          createdAt: '2025-01-22',
          participants: [
            { userId: '3', name: 'Shankar Foods', quantity: 300 },
            { userId: '4', name: 'Amrit Traders', quantity: 200 }
          ]
        },
        {
          id: '3',
          title: 'Basmati Rice Bulk Purchase',
          description: 'Premium basmati rice bulk order for restaurants and food vendors. High quality rice for biryani and pulao preparation.',
          productName: 'Premium Basmati Rice - 50kg',
          productCategory: 'grains',
          targetPrice: 4500,
          quantityNeeded: 200,
          minQuantity: 50,
          maxParticipants: 12,
          deadline: '2025-02-25',
          location: 'Karnal, Haryana, India',
          coordinates: { lat: 29.6857, lng: 76.9905 },
          status: 'active',
          createdBy: { id: '5', name: 'Priya Restaurant' },
          createdAt: '2025-01-24',
          participants: [
            { userId: '5', name: 'Priya Restaurant', quantity: 50 },
            { userId: '6', name: 'Delhi Dhaba', quantity: 100 }
          ]
        }
      ];
      setOrders(mockOrders);
    }
    setLoading(false);
  };

  const handleCreateOrder = async (e) => {
    e.preventDefault();
    
    const orderData = {
      ...newOrder,
      targetPrice: parseFloat(newOrder.targetPrice),
      minQuantity: parseInt(newOrder.minQuantity),
      maxParticipants: parseInt(newOrder.maxParticipants),
      createdBy: { id: user.id, name: user.name },
      createdAt: new Date().toISOString(),
      status: 'active',
      participants: [{ userId: user.id, name: user.name, quantity: parseInt(newOrder.minQuantity) }]
    };

    try {
      const response = await fetch('http://localhost:8000/api/group-orders/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(orderData)
      });

      if (response.ok) {
        const data = await response.json();
        setOrders([data.order, ...orders]);
      }
    } catch (error) {
      // Mock creation for demo
      const mockOrder = {
        id: Date.now().toString(),
        ...orderData
      };
      setOrders([mockOrder, ...orders]);
    }

    setNewOrder({
      title: '',
      description: '',
      productName: '',
      productCategory: '',
      targetPrice: '',
      quantityNeeded: '',
      minQuantity: '',
      maxParticipants: '',
      deadline: '',
      location: '',
      coordinates: null
    });
    setShowCreateForm(false);
  };

  const handleJoinOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/group-orders/${orderId}/join`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify({ quantity: 10 }) // Default quantity
      });

      if (response.ok) {
        fetchGroupOrders();
      }
    } catch (error) {
      // Mock join for demo
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            participants: [...order.participants, { userId: user.id, name: user.name, quantity: 10 }]
          };
        }
        return order;
      }));
    }
  };

  const handleLeaveOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/group-orders/${orderId}/leave`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.ok) {
        fetchGroupOrders();
      }
    } catch (error) {
      // Mock leave for demo
      setOrders(orders.map(order => {
        if (order.id === orderId) {
          return {
            ...order,
            participants: order.participants.filter(p => p.userId !== user.id)
          };
        }
        return order;
      }));
    }
  };

  const filteredOrders = orders.filter(order => {
    if (filter === 'my-orders') return order.createdBy.id === user?.id;
    if (filter === 'joined') return order.participants.some(p => p.userId === user?.id);
    if (filter === 'active') return order.status === 'active';
    return true;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-yellow-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <T>Bulk Orders</T>
          </h1>
          <p className="text-gray-600 text-lg mb-6">
            <T>Join or create bulk purchase orders with other vendors</T>
          </p>
          <button
            onClick={() => setShowCreateForm(true)}
            className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            <T>Create Group Order</T>
          </button>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-8">
          <div className="flex space-x-1 bg-white p-1 rounded-xl shadow-md border border-gray-200">
            {[
              { key: 'all', label: 'All Orders' },
              { key: 'active', label: 'Active' },
              { key: 'my-orders', label: 'My Orders' },
              { key: 'joined', label: 'Joined' }
            ].map(tab => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-3 rounded-lg text-sm font-medium transition-all duration-300 ${
                  filter === tab.key
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                <T>{tab.label}</T>
              </button>
            ))}
          </div>
        </div>

        {/* Create Order Modal */}
        {showCreateForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-screen overflow-y-auto">
              <div className="text-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900">
                  <T>Create Group Order</T>
                </h2>
              </div>
              <form onSubmit={handleCreateOrder} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <T>Title</T>
                  </label>
                  <input
                    type="text"
                    value={newOrder.title}
                    onChange={(e) => setNewOrder({...newOrder, title: e.target.value})}
                    placeholder="e.g., Bulk Spice Order for Street Food Vendors"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <T>Product Name</T>
                  </label>
                  <input
                    type="text"
                    value={newOrder.productName}
                    onChange={(e) => setNewOrder({...newOrder, productName: e.target.value})}
                    placeholder="e.g., Premium Garam Masala Mix - 25kg"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <T>Description</T>
                  </label>
                  <textarea
                    value={newOrder.description}
                    onChange={(e) => setNewOrder({...newOrder, description: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    rows="3"
                    placeholder="Describe the product specifications, quality requirements, etc."
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <T>Product Category</T>
                  </label>
                  <select
                    value={newOrder.productCategory}
                    onChange={(e) => setNewOrder({...newOrder, productCategory: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  >
                    <option value=""><T>Select Food Category</T></option>
                    <option value="vegetables">🥬 <T>Vegetables</T></option>
                    <option value="fruits">🍎 <T>Fruits</T></option>
                    <option value="spices">🌶️ <T>Spices & Seasonings</T></option>
                    <option value="oils">🫒 <T>Cooking Oils</T></option>
                    <option value="grains">🍛 <T>Grains & Cereals</T></option>
                    <option value="dairy">🥛 <T>Dairy Products</T></option>
                    <option value="beverages">🥤 <T>Beverages</T></option>
                    <option value="snacks">🍿 <T>Snacks & Ready Foods</T></option>
                    <option value="condiments">🍯 <T>Condiments & Sauces</T></option>
                    <option value="meat">🍖 <T>Meat & Seafood</T></option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    <T>Quantity Needed</T>
                  </label>
                  <input
                    type="number"
                    value={newOrder.quantityNeeded}
                    onChange={(e) => setNewOrder({...newOrder, quantityNeeded: e.target.value})}
                    placeholder="How many units do you need?"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <T>Target Price</T> (₹)
                    </label>
                    <input
                      type="number"
                      value={newOrder.targetPrice}
                      onChange={(e) => setNewOrder({...newOrder, targetPrice: e.target.value})}
                      placeholder="e.g., 3750"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <T>Min Quantity</T>
                    </label>
                    <input
                      type="number"
                      value={newOrder.minQuantity}
                      onChange={(e) => setNewOrder({...newOrder, minQuantity: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
                <LocationPicker
                  onLocationSelect={(locationData) => setNewOrder({
                    ...newOrder, 
                    location: locationData.address,
                    coordinates: locationData.coordinates
                  })}
                  initialLocation={newOrder.location}
                />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <T>Max Participants</T>
                    </label>
                    <input
                      type="number"
                      value={newOrder.maxParticipants}
                      onChange={(e) => setNewOrder({...newOrder, maxParticipants: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      <T>Deadline</T>
                    </label>
                    <input
                      type="date"
                      value={newOrder.deadline}
                      onChange={(e) => setNewOrder({...newOrder, deadline: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                      required
                    />
                  </div>
                </div>
                <div className="flex space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowCreateForm(false)}
                    className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <T>Cancel</T>
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold"
                  >
                    <T>Create Order</T>
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Orders Grid */}
        <div className="grid gap-6">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-gray-400 text-8xl mb-6">🛒</div>
              <h3 className="text-2xl font-medium text-gray-900 mb-4">
                <T>No group orders found</T>
              </h3>
              <p className="text-gray-600 mb-8 text-lg">
                {filter === 'all' ? <T>Be the first to create a group order!</T> : <T>Try changing your filter or create a new order.</T>}
              </p>
              <button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-8 py-3 rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl"
              >
                <T>Create Group Order</T>
              </button>
            </div>
          ) : (
            filteredOrders.map(order => (
              <GroupOrderCard
                key={order.id}
                order={order}
                onJoin={handleJoinOrder}
                onLeave={handleLeaveOrder}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default GroupOrders;