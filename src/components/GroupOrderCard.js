import React from 'react';
import { useAuth } from '../context/AuthContext';
import { formatINR } from '../utils/currency';
import T from './T';

const GroupOrderCard = ({ order, onJoin, onLeave, showActions = true }) => {
  const { user } = useAuth();
  
  const isParticipant = order.participants.some(p => p.userId === user?.id);
  const canJoin = user && !isParticipant && order.status === 'active' && order.participants.length < order.maxParticipants;
  const canLeave = user && isParticipant && order.status === 'active';
  
  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">{order.title}</h3>
          <p className="text-gray-600 text-sm mb-2">{order.description}</p>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <span>By: {order.createdBy.name}</span>
            <span>•</span>
            <span>Created: {formatDate(order.createdAt)}</span>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-600">Product Name</p>
          <p className="font-medium">{order.productName || 'Not specified'}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Product Category</p>
          <p className="font-medium">{order.productCategory}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Quantity Needed</p>
          <p className="font-medium">{order.quantityNeeded || order.minQuantity} units</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Target Price</p>
          <p className="font-medium text-green-600">{formatINR(order.targetPrice)}</p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Location</p>
          <p className="font-medium flex items-center">
            <span className="mr-1">📍</span>
            {order.location || 'Not specified'}
          </p>
        </div>
        <div>
          <p className="text-sm text-gray-600">Deadline</p>
          <p className="font-medium text-red-600">{formatDate(order.deadline)}</p>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-600">Participants</span>
          <span className="text-sm font-medium">
            {order.participants.length} / {order.maxParticipants}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${(order.participants.length / order.maxParticipants) * 100}%` }}
          ></div>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          {order.participants.map((participant, index) => (
            <span 
              key={index}
              className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs"
            >
              {participant.name}
            </span>
          ))}
        </div>
      </div>

      {showActions && user && (
        <div className="flex space-x-3">
          {canJoin && (
            <button
              onClick={() => onJoin(order.id)}
              className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
            >
              Join Group Order
            </button>
          )}
          {canLeave && (
            <button
              onClick={() => onLeave(order.id)}
              className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 transition-colors"
            >
              Leave Group
            </button>
          )}
          {!canJoin && !canLeave && order.status === 'active' && (
            <div className="flex-1 text-center py-2 px-4 bg-gray-100 text-gray-500 rounded-md">
              {isParticipant ? 'Already Joined' : 'Cannot Join'}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default GroupOrderCard;