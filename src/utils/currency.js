/**
 * Currency utility functions for Indian Rupee (INR) formatting
 */

/**
 * Format amount in Indian Rupees with proper localization
 * @param {number} amount - The amount to format
 * @param {boolean} compact - Whether to use compact notation (e.g., ₹1.2L instead of ₹1,20,000)
 * @returns {string} Formatted currency string
 */
export const formatINR = (amount, compact = false) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '₹0';
  }

  const options = {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  };

  if (compact && amount >= 100000) {
    // Use compact notation for large amounts
    options.notation = 'compact';
    options.compactDisplay = 'short';
  }

  try {
    return new Intl.NumberFormat('en-IN', options).format(amount);
  } catch (error) {
    // Fallback formatting if Intl.NumberFormat fails
    return `₹${amount.toLocaleString('en-IN')}`;
  }
};

/**
 * Format amount in Indian Rupees without currency symbol
 * @param {number} amount - The amount to format
 * @returns {string} Formatted number string
 */
export const formatINRNumber = (amount) => {
  if (amount === null || amount === undefined || isNaN(amount)) {
    return '0';
  }

  try {
    return new Intl.NumberFormat('en-IN').format(amount);
  } catch (error) {
    return amount.toLocaleString('en-IN');
  }
};

/**
 * Convert USD to INR (mock conversion for demo purposes)
 * In a real app, this would use live exchange rates
 * @param {number} usdAmount - Amount in USD
 * @returns {number} Amount in INR
 */
export const convertUSDToINR = (usdAmount) => {
  const exchangeRate = 83; // Approximate USD to INR rate
  return Math.round(usdAmount * exchangeRate);
};

/**
 * Format price range in INR
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {string} Formatted price range
 */
export const formatPriceRange = (minPrice, maxPrice) => {
  if (!minPrice && !maxPrice) return 'Price on request';
  if (!maxPrice) return `From ${formatINR(minPrice)}`;
  if (!minPrice) return `Up to ${formatINR(maxPrice)}`;
  
  return `${formatINR(minPrice)} - ${formatINR(maxPrice)}`;
};

/**
 * Parse INR string back to number
 * @param {string} inrString - INR formatted string
 * @returns {number} Parsed number
 */
export const parseINR = (inrString) => {
  if (!inrString) return 0;
  
  // Remove currency symbol and commas, then parse
  const cleanString = inrString.replace(/[₹,\s]/g, '');
  return parseFloat(cleanString) || 0;
};

export default {
  formatINR,
  formatINRNumber,
  convertUSDToINR,
  formatPriceRange,
  parseINR
};