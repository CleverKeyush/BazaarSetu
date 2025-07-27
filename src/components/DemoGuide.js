import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import T from './T';

const DemoGuide = () => {
  const { user } = useAuth();
  const [isExpanded, setIsExpanded] = useState(false);

  const demoSteps = user?.userType === 'vendor' ? [
    {
      step: 1,
      title: "Allow Location Access",
      description: "Click 'Allow' when prompted for location access, or we'll use Mumbai as default",
      icon: "📍"
    },
    {
      step: 2,
      title: "View Supplier Map",
      description: "Green markers show food suppliers within their delivery range",
      icon: "🗺️"
    },
    {
      step: 3,
      title: "Click Supplier Markers",
      description: "Click any green marker to see supplier details, products, and pricing",
      icon: "🟢"
    },
    {
      step: 4,
      title: "Contact Suppliers",
      description: "Use 'Contact Now' or 'Request Quote' buttons to connect with suppliers",
      icon: "📞"
    }
  ] : [
    {
      step: 1,
      title: "Set Delivery Range",
      description: "Choose your delivery range (10-50km) to find vendors you can serve",
      icon: "🎯"
    },
    {
      step: 2,
      title: "View Vendor Map",
      description: "Orange markers show restaurants and food vendors in your area",
      icon: "🗺️"
    },
    {
      step: 3,
      title: "Click Vendor Markers",
      description: "Click any orange marker to see vendor requirements and order volumes",
      icon: "🟠"
    },
    {
      step: 4,
      title: "Connect with Vendors",
      description: "Contact vendors directly to discuss supply partnerships",
      icon: "🤝"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-lg">💡</span>
          </div>
          <div>
            <h3 className="font-semibold text-blue-900">
              <T>How to Use Location Discovery</T>
            </h3>
            <p className="text-sm text-blue-700">
              {user?.userType === 'vendor' ? (
                <T>Find food suppliers near your restaurant</T>
              ) : (
                <T>Discover food vendors in your delivery area</T>
              )}
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-blue-600 hover:text-blue-800 transition-colors"
        >
          {isExpanded ? '▼' : '▶'}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 pt-4 border-t border-blue-200">
          <div className="grid gap-3">
            {demoSteps.map((step) => (
              <div key={step.step} className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {step.step}
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="text-lg">{step.icon}</span>
                    <h4 className="font-medium text-blue-900">
                      <T>{step.title}</T>
                    </h4>
                  </div>
                  <p className="text-sm text-blue-700">
                    <T>{step.description}</T>
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Demo Credentials */}
          <div className="mt-4 pt-4 border-t border-blue-200">
            <h4 className="font-medium text-blue-900 mb-2">
              <T>🔐 Demo Credentials</T>
            </h4>
            <div className="grid md:grid-cols-2 gap-3 text-sm">
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-gray-900 mb-1">
                  <T>Vendor Account</T>
                </div>
                <div className="text-gray-600 space-y-1">
                  <div>📧 vendor@demo.com</div>
                  <div>🔑 vendor123</div>
                  <div>👤 vendor</div>
                </div>
              </div>
              <div className="bg-white p-3 rounded border">
                <div className="font-medium text-gray-900 mb-1">
                  <T>Supplier Account</T>
                </div>
                <div className="text-gray-600 space-y-1">
                  <div>📧 supplier@demo.com</div>
                  <div>🔑 supplier123</div>
                  <div>👤 supplier</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DemoGuide;