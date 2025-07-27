import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import OpenLayersMap, { streetFoodVendors } from '../components/OpenLayersMap';
import T from '../components/T';

const Maps = () => {
  const { user } = useAuth();
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreetFoodVendors();
  }, [filter]);

  const fetchStreetFoodVendors = async () => {
    try {
      // Filter vendors based on selected filter
      let filteredVendors = streetFoodVendors;
      if (filter === 'snacks') {
        filteredVendors = streetFoodVendors.filter(v => v.category.toLowerCase().includes('snacks') || v.category.toLowerCase().includes('street'));
      } else if (filter === 'south-indian') {
        filteredVendors = streetFoodVendors.filter(v => v.category.toLowerCase().includes('south indian'));
      } else if (filter === 'regional') {
        filteredVendors = streetFoodVendors.filter(v => 
          v.category.toLowerCase().includes('hyderabadi') || 
          v.category.toLowerCase().includes('bengali') || 
          v.category.toLowerCase().includes('maharashtrian') ||
          v.category.toLowerCase().includes('gujarati')
        );
      }

      setSuppliers(filteredVendors);
    } catch (error) {
      console.error('Error fetching street food vendors:', error);
    }
    setLoading(false);
  };

  const getFilterCount = (filterType) => {
    if (filterType === 'snacks') return streetFoodVendors.filter(v => v.category.toLowerCase().includes('snacks') || v.category.toLowerCase().includes('street')).length;
    if (filterType === 'south-indian') return streetFoodVendors.filter(v => v.category.toLowerCase().includes('south indian')).length;
    if (filterType === 'regional') return streetFoodVendors.filter(v => 
      v.category.toLowerCase().includes('hyderabadi') || 
      v.category.toLowerCase().includes('bengali') || 
      v.category.toLowerCase().includes('maharashtrian') ||
      v.category.toLowerCase().includes('gujarati')
    ).length;
    return streetFoodVendors.length;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-orange-500 border-t-transparent mx-auto mb-4"></div>
          <p className="text-gray-600 font-medium">
            <T>Loading Indian street vendor locations...</T>
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <T>Street Food Vendor Locations</T>
          </h1>
          <p className="text-gray-600 text-lg">
            <T>Discover authentic street food vendors across India</T>
          </p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Filters */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                <T>Category Filters</T>
              </h3>
              <div className="space-y-2">
                {[
                  { key: 'all', label: 'All Categories', count: suppliers.length },
                  { key: 'snacks', label: 'Street Snacks', count: getFilterCount('snacks') },
                  { key: 'south-indian', label: 'South Indian', count: getFilterCount('south-indian') },
                  { key: 'regional', label: 'Regional Specialties', count: getFilterCount('regional') }
                ].map(filterOption => (
                  <button
                    key={filterOption.key}
                    onClick={() => setFilter(filterOption.key)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                      filter === filterOption.key
                        ? 'bg-gradient-to-r from-orange-100 to-red-100 text-orange-800 font-medium border border-orange-200'
                        : 'text-gray-700 hover:bg-gray-50 border border-transparent'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span><T>{filterOption.label}</T></span>
                      <span className="text-sm bg-gray-200 px-2 py-1 rounded-full">
                        {filterOption.count}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Vendor Info */}
            {selectedLocation && (
              <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  <T>Selected Vendor</T>
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-2xl">
                      {selectedLocation.image}
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900">{selectedLocation.name}</h4>
                      <p className="text-sm text-orange-600">{selectedLocation.category}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600"><T>Rating</T>:</span>
                      <span className="font-medium">⭐ {selectedLocation.rating}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600"><T>Price Range</T>:</span>
                      <span className="font-medium text-green-600">{selectedLocation.priceRange}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600"><T>Open Hours</T>:</span>
                      <span className="font-medium text-xs">{selectedLocation.openHours}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600"><T>Location</T>:</span>
                      <span className="font-medium text-xs">{selectedLocation.city}</span>
                    </div>
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600 mb-2 font-medium">
                      <T>Specialties</T>:
                    </p>
                    <div className="flex flex-wrap gap-1">
                      {selectedLocation.specialties?.slice(0, 4).map((specialty, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs"
                        >
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-gray-200">
                    <p className="text-xs text-gray-500">{selectedLocation.description}</p>
                    <p className="text-xs text-gray-400 mt-1">📍 {selectedLocation.address}</p>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map and Suppliers */}
          <div className="lg:col-span-3 space-y-6">
            {/* OpenLayers Map with Street Food Vendors */}
            <OpenLayersMap onVendorSelect={setSelectedLocation} selectedVendor={selectedLocation} />

            {/* Suppliers Grid */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-semibold text-gray-900">
                  <T>Street Food Vendors</T>
                  {filter !== 'all' && (
                    <span className="text-sm font-normal text-gray-600 ml-2">
                      • <T>{filter === 'snacks' ? 'Street Snacks' : filter === 'south-indian' ? 'South Indian' : 'Regional Specialties'}</T>
                    </span>
                  )}
                </h3>
                <div className="text-sm text-gray-600">
                  {suppliers.length} food vendors found
                </div>
              </div>
              
              <div className="grid md:grid-cols-2 gap-4">
                {suppliers.map(vendor => (
                  <div key={vendor.id} className="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg border border-orange-200 hover:shadow-md transition-shadow duration-300">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{vendor.name}</h4>
                        <p className="text-orange-600 font-medium text-sm">{vendor.category}</p>
                      </div>
                      <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-400 rounded-full flex items-center justify-center text-2xl">
                        {vendor.image}
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 mb-3 flex items-center">
                      <svg className="w-4 h-4 mr-1 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      </svg>
                      {vendor.address}
                    </p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm mb-3">
                      <div>
                        <span className="text-gray-600"><T>Rating</T>:</span>
                        <span className="font-medium ml-1">⭐ {vendor.rating}</span>
                      </div>
                      <div>
                        <span className="text-gray-600"><T>Price Range</T>:</span>
                        <span className="font-medium text-green-600 ml-1">{vendor.priceRange}</span>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">
                        <T>Open Hours</T>: {vendor.openHours}
                      </p>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-sm text-gray-600 mb-1">
                        <T>Specialties</T>:
                      </p>
                      <div className="flex flex-wrap gap-1">
                        {vendor.specialties.slice(0, 3).map((specialty, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs"
                          >
                            {specialty}
                          </span>
                        ))}
                        {vendor.specialties.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                            +{vendor.specialties.length - 3} more
                          </span>
                        )}
                      </div>
                    </div>
                    
                    <button className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-2 px-4 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all duration-300 font-medium text-sm">
                      <T>Visit Food Stall</T>
                    </button>
                  </div>
                ))}
              </div>
              
              {suppliers.length === 0 && (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🍛</div>
                  <h4 className="text-lg font-medium text-gray-900 mb-2">
                    <T>No food vendors found</T>
                  </h4>
                  <p className="text-gray-600">
                    <T>Try selecting a different food category</T>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Maps;