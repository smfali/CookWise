
export type IngredientState = 'fresh' | 'cooked' | 'leftover' | 'frozen';

export interface PantryItem {
  id: string;
  name: string;
  state: IngredientState;
  expiryDate?: string;
  quantity?: string;
}

export interface Recipe {
  id: string;
  title: string;
  ingredients: string[];
  instructions: string[];
  prepTime: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  tags: string[];
  matchScore?: number;
  image?: string;
  source?: 'ai' | 'community';
}

export interface MealSlot {
  breakfast?: string;
  lunch?: string;
  dinner?: string;
}

export interface WeeklyPlan {
  [key: string]: MealSlot; // ISO date string keys
}

export interface UserPreferences {
  cuisine: string[];
  dietaryRestrictions: string[];
  budgetLevel: 'Budget' | 'Standard' | 'Premium';
  reminderTime: string;
}

export type ViewType = 
  | 'onboarding' 
  | 'dashboard' 
  | 'pantry' 
  | 'recipe-finder' 
  | 'scheduler' 
  | 'community' 
  | 'analytics' 
  | 'grocery-list' 
  | 'profile';
