
import React from 'react';

export const COLORS = {
  primary: '#10b981', // Emerald 500
  secondary: '#34d399', // Emerald 400
  accent: '#f59e0b', // Amber 500
  danger: '#ef4444', // Red 500
  background: '#f8fafc',
  card: '#ffffff',
};

export const INITIAL_PANTRY: any[] = [
  { id: '1', name: 'Spinach', state: 'fresh', expiryDate: '2023-12-01' },
  { id: '2', name: 'Chicken Breast', state: 'frozen', expiryDate: '2024-01-15' },
  { id: '3', name: 'Rice', state: 'cooked', expiryDate: '2023-11-20' },
  { id: '4', name: 'Onions', state: 'fresh', expiryDate: '2023-12-10' },
];

export const MOCK_RECIPES: any[] = [
  {
    id: 'r1',
    title: 'Leftover Rice Stir-Fry',
    ingredients: ['Rice', 'Spinach', 'Onions', 'Eggs'],
    instructions: ['Sauté onions', 'Add spinach', 'Toss in rice', 'Add soy sauce'],
    prepTime: 15,
    difficulty: 'Easy',
    tags: ['Quick', 'Budget'],
    image: 'https://picsum.photos/400/300?random=1'
  },
  {
    id: 'r2',
    title: 'Spinach & Chicken Pasta',
    ingredients: ['Chicken Breast', 'Spinach', 'Pasta', 'Garlic'],
    instructions: ['Cook pasta', 'Pan-sear chicken', 'Wilt spinach in pan', 'Combine all'],
    prepTime: 25,
    difficulty: 'Medium',
    tags: ['Family', 'Creative'],
    image: 'https://picsum.photos/400/300?random=2'
  }
];

export const CUISINES = ['Italian', 'Mexican', 'Indian', 'Chinese', 'Japanese', 'Mediterranean', 'American'];
export const DIETARY_RESTRICTIONS = ['Vegan', 'Vegetarian', 'Gluten-Free', 'Keto', 'Dairy-Free', 'Nut-Free'];
