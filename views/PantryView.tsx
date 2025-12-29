
import React, { useState } from 'react';
import { PantryItem, IngredientState } from '../types';

interface PantryViewProps {
  pantry: PantryItem[];
  onUpdate: (newPantry: PantryItem[]) => void;
}

const PantryView: React.FC<PantryViewProps> = ({ pantry, onUpdate }) => {
  const [newItemName, setNewItemName] = useState('');
  const [selectedState, setSelectedState] = useState<IngredientState>('fresh');

  const addItem = () => {
    if (!newItemName.trim()) return;
    const newItem: PantryItem = {
      id: Date.now().toString(),
      name: newItemName,
      state: selectedState,
      expiryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    };
    onUpdate([newItem, ...pantry]);
    setNewItemName('');
  };

  const removeItem = (id: string) => {
    onUpdate(pantry.filter(item => item.id !== id));
  };

  const quickAdd = ['Rice', 'Chicken', 'Spinach', 'Onions', 'Eggs', 'Milk', 'Bread'];

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-display">Add to Pantry</h2>
        
        <div className="flex gap-2">
          <input 
            type="text"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Ingredient name..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button 
            onClick={addItem}
            className="bg-emerald-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {['fresh', 'cooked', 'leftover', 'frozen'].map((s) => (
            <button
              key={s}
              onClick={() => setSelectedState(s as IngredientState)}
              className={`px-4 py-2 rounded-full text-[10px] font-bold uppercase transition-all whitespace-nowrap ${
                selectedState === s ? 'bg-emerald-600 text-white shadow-md' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        <div>
          <p className="text-[10px] text-slate-400 uppercase font-bold tracking-widest mb-2">Quick Add</p>
          <div className="flex flex-wrap gap-2">
            {quickAdd.map(item => (
              <button
                key={item}
                onClick={() => {
                  setNewItemName(item);
                }}
                className="bg-slate-50 border border-slate-200 px-3 py-1 rounded-lg text-xs font-medium hover:bg-emerald-50 hover:border-emerald-200 transition-all"
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-bold text-slate-800">Your Items ({pantry.length})</h3>
          <button className="text-emerald-600 text-xs font-bold">Sort</button>
        </div>
        
        <div className="space-y-3">
          {pantry.map(item => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between group">
              <div className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                  item.state === 'fresh' ? 'bg-green-500' :
                  item.state === 'cooked' ? 'bg-orange-500' :
                  item.state === 'leftover' ? 'bg-amber-500' : 'bg-blue-500'
                }`}>
                  <i className={`fa-solid ${
                    item.state === 'fresh' ? 'fa-leaf' :
                    item.state === 'cooked' ? 'fa-fire' :
                    item.state === 'leftover' ? 'fa-recycle' : 'fa-snowflake'
                  }`}></i>
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{item.name}</h4>
                  <p className="text-[10px] text-slate-400 uppercase font-bold">{item.state}</p>
                </div>
              </div>
              <button 
                onClick={() => removeItem(item.id)}
                className="text-slate-300 hover:text-rose-500 transition-colors opacity-0 group-hover:opacity-100 p-2"
              >
                <i className="fa-solid fa-trash-can"></i>
              </button>
            </div>
          ))}
          
          {pantry.length === 0 && (
            <div className="text-center py-12 text-slate-400">
              <i className="fa-solid fa-basket-shopping text-4xl mb-4 block opacity-20"></i>
              <p>Your pantry is empty.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PantryView;
