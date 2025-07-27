/**
 * Food categories for Indian street food marketplace
 * Only food-related categories are allowed
 */

export const FOOD_CATEGORIES = [
  {
    id: 'vegetables',
    name: 'Vegetables',
    emoji: '🥬',
    description: 'Fresh vegetables and leafy greens'
  },
  {
    id: 'fruits',
    name: 'Fruits',
    emoji: '🍎',
    description: 'Fresh seasonal fruits'
  },
  {
    id: 'spices',
    name: 'Spices & Seasonings',
    emoji: '🌶️',
    description: 'Whole spices, ground spices, and masalas'
  },
  {
    id: 'oils',
    name: 'Cooking Oils',
    emoji: '🫒',
    description: 'Cooking oils and ghee'
  },
  {
    id: 'grains',
    name: 'Grains & Cereals',
    emoji: '🍛',
    description: 'Rice, wheat, pulses, and other grains'
  },
  {
    id: 'dairy',
    name: 'Dairy Products',
    emoji: '🥛',
    description: 'Milk, paneer, curd, and dairy items'
  },
  {
    id: 'beverages',
    name: 'Beverages',
    emoji: '🥤',
    description: 'Tea, coffee, juices, and drinks'
  },
  {
    id: 'snacks',
    name: 'Snacks & Ready Foods',
    emoji: '🍿',
    description: 'Packaged snacks and ready-to-eat items'
  },
  {
    id: 'condiments',
    name: 'Condiments & Sauces',
    emoji: '🍯',
    description: 'Chutneys, pickles, and sauces'
  },
  {
    id: 'meat',
    name: 'Meat & Seafood',
    emoji: '🍖',
    description: 'Fresh meat, chicken, and seafood'
  }
];

export const getCategoryById = (id) => {
  return FOOD_CATEGORIES.find(category => category.id === id);
};

export const getCategoryName = (id) => {
  const category = getCategoryById(id);
  return category ? category.name : 'Unknown Category';
};

export const getCategoryEmoji = (id) => {
  const category = getCategoryById(id);
  return category ? category.emoji : '🍽️';
};

export const isFoodCategory = (categoryId) => {
  return FOOD_CATEGORIES.some(category => category.id === categoryId);
};

export default FOOD_CATEGORIES;