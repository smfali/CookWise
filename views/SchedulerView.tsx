
import React from 'react';
import { WeeklyPlan, PantryItem, MealSlot } from '../types';

interface SchedulerViewProps {
  mealPlan: WeeklyPlan;
  pantry: PantryItem[];
  onUpdate: (plan: WeeklyPlan) => void;
}

const SchedulerView: React.FC<SchedulerViewProps> = ({ mealPlan, pantry, onUpdate }) => {
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const toggleMeal = (day: string, slot: keyof MealSlot) => {
    // Placeholder for actual logic
    const newPlan = { ...mealPlan };
    if (!newPlan[day]) newPlan[day] = {};
    
    // In a real app, this would open a selection modal
    newPlan[day][slot] = newPlan[day][slot] ? undefined : 'Suggested Recipe';
    onUpdate(newPlan);
  };

  return (
    <div className="space-y-6">
      <div className="bg-emerald-600 p-6 rounded-3xl text-white shadow-lg flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold font-display">Weekly Plan</h2>
          <p className="text-emerald-100 text-xs">November 20 - 26</p>
        </div>
        <div className="bg-emerald-500 p-3 rounded-2xl">
          <i className="fa-solid fa-calendar-check text-xl"></i>
        </div>
      </div>

      <div className="space-y-4">
        {days.map(day => (
          <div key={day} className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <div className="bg-slate-50 px-4 py-2 flex justify-between items-center border-b border-slate-100">
              <span className="font-bold text-slate-800">{day}</span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">Nov {20 + days.indexOf(day)}</span>
            </div>
            <div className="p-4 grid grid-cols-3 gap-3">
              {(['breakfast', 'lunch', 'dinner'] as const).map(slot => (
                <button
                  key={slot}
                  onClick={() => toggleMeal(day, slot)}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 border-dashed transition-all ${
                    mealPlan[day]?.[slot] 
                      ? 'bg-emerald-50 border-emerald-200 text-emerald-700' 
                      : 'border-slate-100 text-slate-300'
                  }`}
                >
                  <i className={`fa-solid ${
                    slot === 'breakfast' ? 'fa-mug-saucer' :
                    slot === 'lunch' ? 'fa-bread-slice' : 'fa-bowl-food'
                  } mb-1`}></i>
                  <span className="text-[9px] font-bold uppercase">{slot}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Expiring items tip */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex gap-4">
        <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center text-white shrink-0 shadow-md">
          <i className="fa-solid fa-lightbulb"></i>
        </div>
        <div>
          <p className="font-bold text-slate-800 text-sm">Smart Suggestion</p>
          <p className="text-xs text-slate-600">Your <span className="font-bold">Spinach</span> expires on Wednesday. Try adding a Spinach Salad to Wednesday's lunch!</p>
        </div>
      </div>
    </div>
  );
};

export default SchedulerView;
