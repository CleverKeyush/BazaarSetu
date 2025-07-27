import React from 'react';
import T from './T';

const PasswordStrength = ({ password }) => {
  const getStrength = (password) => {
    if (!password) return { score: 0, label: 'Enter password', color: 'gray' };
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score <= 1) return { score, label: 'Very Weak', color: 'red' };
    if (score === 2) return { score, label: 'Weak', color: 'orange' };
    if (score === 3) return { score, label: 'Fair', color: 'yellow' };
    if (score === 4) return { score, label: 'Good', color: 'blue' };
    return { score, label: 'Strong', color: 'green' };
  };

  const strength = getStrength(password);
  const percentage = (strength.score / 5) * 100;

  const getColorClasses = (color) => {
    const colors = {
      gray: 'bg-gray-200',
      red: 'bg-red-500',
      orange: 'bg-orange-500',
      yellow: 'bg-yellow-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500'
    };
    return colors[color] || colors.gray;
  };

  const getTextColorClasses = (color) => {
    const colors = {
      gray: 'text-gray-600',
      red: 'text-red-600',
      orange: 'text-orange-600',
      yellow: 'text-yellow-600',
      blue: 'text-blue-600',
      green: 'text-green-600'
    };
    return colors[color] || colors.gray;
  };

  return (
    <div className="mt-2">
      <div className="flex justify-between items-center mb-1">
        <span className="text-xs text-gray-600">
          <T>Password Strength</T>
        </span>
        <span className={`text-xs font-medium ${getTextColorClasses(strength.color)}`}>
          <T>{strength.label}</T>
        </span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all duration-300 ${getColorClasses(strength.color)}`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
      {password && (
        <div className="mt-2 space-y-1">
          <div className={`flex items-center space-x-2 text-xs ${
            password.length >= 8 ? 'text-green-600' : 'text-gray-400'
          }`}>
            <span>{password.length >= 8 ? '✅' : '⭕'}</span>
            <span><T>At least 8 characters</T></span>
          </div>
          <div className={`flex items-center space-x-2 text-xs ${
            /[a-z]/.test(password) && /[A-Z]/.test(password) ? 'text-green-600' : 'text-gray-400'
          }`}>
            <span>{/[a-z]/.test(password) && /[A-Z]/.test(password) ? '✅' : '⭕'}</span>
            <span><T>Upper & lowercase letters</T></span>
          </div>
          <div className={`flex items-center space-x-2 text-xs ${
            /\d/.test(password) ? 'text-green-600' : 'text-gray-400'
          }`}>
            <span>{/\d/.test(password) ? '✅' : '⭕'}</span>
            <span><T>At least one number</T></span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordStrength;