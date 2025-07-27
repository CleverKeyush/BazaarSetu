import React, { useState } from 'react';
import { formatINR } from '../utils/currency';
import { getCategoryEmoji, getCategoryName } from '../constants/foodCategories';
import T from './T';

const SupplierOrderCard = ({ order, onAccept, onReject, onContact }) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [showContactOptions, setShowContactOptions] = useState(false);

  const handleAccept = async () => {
    setIsProcessing(true);
    try {
      await onAccept(order.id);
    } catch (error) {
      console.error('Error accepting order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleReject = async () => {
    setIsProcessing(true);
    try {
      await onReject(order.id);
    } catch (error) {
      console.error('Error rejecting order:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleContact = (method) => {
    const { vendorName, vendorCompany, vendorContact } = order;
    
    switch (method) {
      case 'email':
        window.open(`mailto:${vendorContact}?subject=Regarding Group Order: ${order.groupOrderTitle}&body=Dear ${vendorName},%0D%0A%0D%0AI am writing regarding your group order request for ${order.productName}.%0D%0A%0D%0AOrder Details:%0D%0A- Product: ${order.productName}%0D%0A- Quantity: ${order.quantity} units%0D%0A- Total Value: ${formatINR(order.totalValue)}%0D%0A%0D%0ABest regards,%0D%0A[Your Name]%0D%0A[Your Company]`);
        break;
      case 'phone':
        window.open(`tel:${vendorContact}`);
        break;
      case 'whatsapp':
        const message = `Hello ${vendorName}, I'm contacting you regarding your group order request for ${order.productName}. Order value: ${formatINR(order.totalValue)}. Let's discuss the details.`;
        window.open(`https://wa.me/${vendorContact.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`);
        break;
      default:
        break;
    }
    
    setShowContactOptions(false);
    if (onContact) {
      onContact(order, method);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'accepted': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 hover:shadow-xl transition-shadow duration-300">
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-2xl">
            {getCategoryEmoji(order.category)}
          </div>
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-1">
              {order.groupOrderTitle}
            </h3>
            <p className="text-orange-600 font-medium text-sm">
              {getCategoryName(order.category)}
            </p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}>
          <T>{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</T>
        </span>
      </div>

      {/* Product Details */}
      <div className="bg-gradient-to-r from-orange-50 to-red-50 rounded-lg p-4 mb-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-600 mb-1"><T>Product Requested</T></p>
            <p className="font-semibold text-gray-900">{order.productName}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1"><T>Quantity</T></p>
            <p className="font-semibold text-gray-900">{order.quantity} units</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1"><T>Total Value</T></p>
            <p className="font-semibold text-green-600 text-lg">{formatINR(order.totalValue)}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600 mb-1"><T>Requested Date</T></p>
            <p className="font-semibold text-gray-900 text-sm">{formatDate(order.requestedAt)}</p>
          </div>
        </div>
      </div>

      {/* Vendor Information */}
      <div className="bg-blue-50 rounded-lg p-4 mb-4">
        <h4 className="font-semibold text-blue-900 mb-2">
          <T>Vendor Information</T>
        </h4>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-blue-700"><T>Name</T>:</span>
            <span className="font-medium text-blue-900">{order.vendorName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700"><T>Company</T>:</span>
            <span className="font-medium text-blue-900">{order.vendorCompany}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-blue-700"><T>Contact</T>:</span>
            <span className="font-medium text-blue-900">{order.vendorContact}</span>
          </div>
        </div>
      </div>

      {/* Notes */}
      {order.notes && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <p className="text-sm text-gray-600 mb-1"><T>Special Requirements</T>:</p>
          <p className="text-sm text-gray-800">{order.notes}</p>
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex space-x-3">
        {order.status === 'pending' && (
          <>
            <button
              onClick={handleAccept}
              disabled={isProcessing}
              className="flex-1 bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isProcessing ? <T>Processing...</T> : <T>✅ Accept Order</T>}
            </button>
            <button
              onClick={handleReject}
              disabled={isProcessing}
              className="flex-1 bg-red-600 text-white py-3 px-4 rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <T>❌ Reject Order</T>
            </button>
          </>
        )}

        {(order.status === 'accepted' || order.status === 'pending') && (
          <div className="relative">
            <button
              onClick={() => setShowContactOptions(!showContactOptions)}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              <T>📞 Contact Vendor</T>
            </button>
            
            {showContactOptions && (
              <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-gray-200 py-2 z-10 min-w-48">
                <button
                  onClick={() => handleContact('email')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center space-x-2"
                >
                  <span>📧</span>
                  <span><T>Send Email</T></span>
                </button>
                <button
                  onClick={() => handleContact('phone')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center space-x-2"
                >
                  <span>📱</span>
                  <span><T>Call Phone</T></span>
                </button>
                <button
                  onClick={() => handleContact('whatsapp')}
                  className="w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 flex items-center space-x-2"
                >
                  <span>💬</span>
                  <span><T>WhatsApp</T></span>
                </button>
              </div>
            )}
          </div>
        )}

        {order.status === 'accepted' && (
          <button
            onClick={() => {/* Handle mark as completed */}}
            className="bg-purple-600 text-white py-3 px-4 rounded-lg hover:bg-purple-700 transition-colors font-medium"
          >
            <T>✅ Mark Completed</T>
          </button>
        )}
      </div>
    </div>
  );
};

export default SupplierOrderCard;