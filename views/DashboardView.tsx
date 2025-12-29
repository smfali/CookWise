
import React from 'react';
import { PantryItem, ViewType } from '../types';
import RecipeCard from '../components/RecipeCard';
import { MOCK_RECIPES } from '../constants';

interface DashboardViewProps {
  pantry: PantryItem[];
  ecoPoints: number;
  onNavigate: (view: ViewType) => void;
}

const DashboardView: React.FC<DashboardViewProps> = ({ pantry, ecoPoints, onNavigate }) => {
  const expiringSoon = pantry.filter(item => {
    if (!item.expiryDate) return false;
    const diff = new Date(item.expiryDate).getTime() - new Date().getTime();
    return diff < 3 * 24 * 60 * 60 * 1000; // 3 days
  });

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Section */}
      <section className="relative h-44 bg-emerald-600 rounded-3xl p-6 overflow-hidden flex flex-col justify-end text-white shadow-lg">
        <div className="absolute top-4 right-4 text-6xl opacity-20 rotate-12">
          <i className="fa-solid fa-carrot"></i>
        </div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold font-display mb-1">Hi, Master Chef!</h2>
          <p className="text-emerald-100 text-sm">You have {pantry.length} items in your pantry.</p>
        </div>
        <div className="absolute top-6 left-6 flex items-center gap-2 bg-emerald-500/40 px-3 py-1 rounded-full text-xs font-bold border border-emerald-400/30">
          <i className="fa-solid fa-bolt text-amber-300"></i>
          {ecoPoints} Eco Points
        </div>
      </section>

      {/* Hero Input Bar */}
      <div 
        onClick={() => onNavigate('recipe-finder')}
        className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3 cursor-pointer"
      >
        <i className="fa-solid fa-magnifying-glass text-slate-400"></i>
        <span className="text-slate-400">What's in your fridge today?</span>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <button 
          onClick={() => onNavigate('scheduler')}
          className="flex flex-col items-center justify-center p-4 bg-emerald-50 rounded-2xl border border-emerald-100 group transition-all"
        >
          <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center mb-2 shadow-md group-active:scale-95">
            <i className="fa-solid fa-calendar-plus"></i>
          </div>
          <span className="text-sm font-bold text-slate-700">Plan Week</span>
        </button>
        <button 
          onClick={() => onNavigate('pantry')}
          className="flex flex-col items-center justify-center p-4 bg-amber-50 rounded-2xl border border-amber-100 group transition-all"
        >
          <div className="w-12 h-12 bg-amber-500 text-white rounded-full flex items-center justify-center mb-2 shadow-md group-active:scale-95">
            <i className="fa-solid fa-plus"></i>
          </div>
          <span className="text-sm font-bold text-slate-700">Add Pantry</span>
        </button>
      </div>

      {/* Alerts */}
      {expiringSoon.length > 0 && (
        <section>
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-bold text-slate-800">Use them before they go!</h3>
            <span className="text-xs text-rose-600 font-bold bg-rose-50 px-2 py-1 rounded-md">Urgent</span>
          </div>
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
            {expiringSoon.map(item => (
              <div key={item.id} className="min-w-[140px] bg-white p-3 rounded-xl border-l-4 border-rose-500 shadow-sm">
                <p className="font-bold text-sm text-slate-800">{item.name}</p>
                <p className="text-[10px] text-rose-600">Expires in 2 days</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Suggested Recipes */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-bold text-slate-800">Suggested for you</h3>
          <button 
            onClick={() => onNavigate('recipe-finder')}
            className="text-emerald-600 text-xs font-bold"
          >
            See all
          </button>
        </div>
        <div className="grid grid-cols-1 gap-4">
          {MOCK_RECIPES.map(recipe => (
            <RecipeCard 
              key={recipe.id} 
              recipe={recipe} 
              onClick={() => onNavigate('recipe-finder')} 
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default DashboardView;
