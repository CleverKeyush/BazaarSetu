import React from 'react';
import MandiPrices from '../components/MandiPrices';
import T from '../components/T';

const MandiPricesPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <div className="inline-block p-4 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mb-4">
            <span className="text-4xl">📊</span>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            <T>Live Market Rates</T>
          </h1>
          <p className="text-gray-600 text-lg">
            <T>Real-time commodity prices from Indian mandis</T>
          </p>
        </div>

        <MandiPrices showHeader={true} />
      </div>
    </div>
  );
};

export default MandiPricesPage;