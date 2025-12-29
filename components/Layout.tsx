
import React from 'react';
import { ViewType } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  activeView: ViewType;
  onViewChange: (view: ViewType) => void;
  title?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeView, onViewChange, title }) => {
  const navItems = [
    { id: 'dashboard', icon: 'fa-home', label: 'Home' },
    { id: 'pantry', icon: 'fa-box-open', label: 'Pantry' },
    { id: 'recipe-finder', icon: 'fa-utensils', label: 'Chef' },
    { id: 'scheduler', icon: 'fa-calendar-alt', label: 'Plan' },
    { id: 'grocery-list', icon: 'fa-shopping-cart', label: 'Shop' },
  ];

  if (activeView === 'onboarding') return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen pb-20 max-w-md mx-auto bg-white shadow-xl">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-100 px-6 py-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-emerald-600 font-display">
          {title || "CookWise"}
        </h1>
        <button 
          onClick={() => onViewChange('profile')}
          className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 border-2 border-white shadow-sm"
        >
          <i className="fa-solid fa-user"></i>
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        {children}
      </main>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 px-4 py-2 flex justify-between items-center z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onViewChange(item.id as ViewType)}
            className={`flex flex-col items-center justify-center p-2 rounded-xl transition-all ${
              activeView === item.id ? 'text-emerald-600 scale-110' : 'text-slate-400'
            }`}
          >
            <i className={`fa-solid ${item.icon} text-lg mb-1`}></i>
            <span className="text-[10px] font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
