import React from 'react';
import { useAuth } from '../context/AuthContext';
import T from './T';

const LocationStats = ({ nearbyEntities, userLocation }) => {
  const { user } = useAuth();

  const getDistanceStats = () => {
    if (!nearbyEntities || nearbyEntities.length === 0) return null;

    const distances = nearbyEntities.map(entity => entity.distance).filter(d => d);
    const avgDistance = distances.reduce((sum, d) => sum + d, 0) / distances.length;
    const closestDistance = Math.min(...distances);
    const farthestDistance = Math.max(...distances);

    return {
      average: avgDistance.toFixed(1),
      closest: closestDistance.toFixed(1),
      farthest: farthestDistance.toFixed(1),
      total: nearbyEntities.length
    };
  };

  const getCategoryStats = () => {
    if (!nearbyEntities || nearbyEntities.length === 0) return {};

    const categories = {};
    nearbyEntities.forEach(entity => {
      const category = entity.category || 'Other';
      categories[category] = (categories[category] || 0) + 1;
    });

    return categories;
  };

  const stats = getDistanceStats();
  const categories = getCategoryStats();

  if (!stats) {
    return (
      <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
        <div className="text-center py-4">
          <div className="text-4xl mb-2">🔍</div>
          <h3 className="font-medium text-gray-900 mb-1">
            <T>No Results Found</T>
          </h3>
          <p className="text-sm text-gray-600">
            {user?.userType === 'vendor' ? (
              <T>No suppliers found in your area. Try a different location.</T>
            ) : (
              <T>No vendors found in your delivery range. Try increasing your range.</T>
            )}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 border border-gray-200">
      <h3 className="font-semibold text-gray-900 mb-3">
        📊 <T>Discovery Statistics</T>
      </h3>
      
      {/* Distance Stats */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-blue-50 p-3 rounded-lg">
          <div className="text-sm text-blue-600 font-medium">
            <T>Total Found</T>
          </div>
          <div className="text-xl font-bold text-blue-900">{stats.total}</div>
        </div>
        <div className="bg-green-50 p-3 rounded-lg">
          <div className="text-sm text-green-600 font-medium">
            <T>Closest</T>
          </div>
          <div className="text-xl font-bold text-green-900">{stats.closest} km</div>
        </div>
        <div className="bg-orange-50 p-3 rounded-lg">
          <div className="text-sm text-orange-600 font-medium">
            <T>Average Distance</T>
          </div>
          <div className="text-xl font-bold text-orange-900">{stats.average} km</div>
        </div>
        <div className="bg-purple-50 p-3 rounded-lg">
          <div className="text-sm text-purple-600 font-medium">
            <T>Farthest</T>
          </div>
          <div className="text-xl font-bold text-purple-900">{stats.farthest} km</div>
        </div>
      </div>

      {/* Category Breakdown */}
      <div className="mb-3">
        <h4 className="text-sm font-medium text-gray-700 mb-2">
          <T>Categories Found</T>:
        </h4>
        <div className="space-y-1">
          {Object.entries(categories).map(([category, count]) => (
            <div key={category} className="flex justify-between items-center text-sm">
              <span className="text-gray-600">{category}</span>
              <span className="bg-gray-100 px-2 py-1 rounded text-xs font-medium">
                {count}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Location Info */}
      {userLocation && (
        <div className="pt-3 border-t border-gray-200">
          <div className="text-xs text-gray-500">
            <T>📍 Your coordinates</T>: {userLocation[1].toFixed(4)}, {userLocation[0].toFixed(4)}
          </div>
        </div>
      )}
    </div>
  );
};

export default LocationStats;