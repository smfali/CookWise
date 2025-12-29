
import React, { useState, useEffect } from 'react';
import { ViewType, PantryItem, UserPreferences, Recipe, WeeklyPlan } from './types';
import Layout from './components/Layout';
import OnboardingView from './views/OnboardingView';
import DashboardView from './views/DashboardView';
import PantryView from './views/PantryView';
import RecipeFinderView from './views/RecipeFinderView';
import SchedulerView from './views/SchedulerView';
import GroceryListView from './views/GroceryListView';
import ProfileView from './views/ProfileView';
import CommunityView from './views/CommunityView';
import { INITIAL_PANTRY } from './constants';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewType>('onboarding');
  const [pantry, setPantry] = useState<PantryItem[]>(INITIAL_PANTRY);
  const [preferences, setPreferences] = useState<UserPreferences>({
    cuisine: ['Mediterranean'],
    dietaryRestrictions: [],
    budgetLevel: 'Standard',
    reminderTime: '18:00',
  });
  const [mealPlan, setMealPlan] = useState<WeeklyPlan>({});
  const [ecoPoints, setEcoPoints] = useState(1240);
  const [groceryList, setGroceryList] = useState<string[]>(['Milk', 'Avocado', 'Bread']);

  // Handle local storage if needed
  useEffect(() => {
    const savedPantry = localStorage.getItem('cookwise_pantry');
    if (savedPantry) setPantry(JSON.parse(savedPantry));
  }, []);

  const handlePantryUpdate = (newPantry: PantryItem[]) => {
    setPantry(newPantry);
    localStorage.setItem('cookwise_pantry', JSON.stringify(newPantry));
  };

  const renderView = () => {
    switch (activeView) {
      case 'onboarding':
        return <OnboardingView onComplete={() => setActiveView('dashboard')} />;
      case 'dashboard':
        return <DashboardView 
          pantry={pantry} 
          ecoPoints={ecoPoints} 
          onNavigate={setActiveView} 
        />;
      case 'pantry':
        return <PantryView pantry={pantry} onUpdate={handlePantryUpdate} />;
      case 'recipe-finder':
        return <RecipeFinderView pantry={pantry} onAddToPlan={(recipe) => {
          // Logic to add to a date could go here or in a dedicated view
          setActiveView('scheduler');
        }} />;
      case 'scheduler':
        return <SchedulerView mealPlan={mealPlan} pantry={pantry} onUpdate={setMealPlan} />;
      case 'grocery-list':
        return <GroceryListView list={groceryList} onUpdate={setGroceryList} />;
      case 'profile':
        return <ProfileView preferences={preferences} onUpdate={setPreferences} />;
      case 'community':
        return <CommunityView />;
      default:
        return <DashboardView pantry={pantry} ecoPoints={ecoPoints} onNavigate={setActiveView} />;
    }
  };

  return (
    <Layout activeView={activeView} onViewChange={setActiveView}>
      {renderView()}
    </Layout>
  );
};

export default App;
