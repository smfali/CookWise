
import React, { useState } from 'react';

interface GroceryListViewProps {
  list: string[];
  onUpdate: (newList: string[]) => void;
}

const GroceryListView: React.FC<GroceryListViewProps> = ({ list, onUpdate }) => {
  const [input, setInput] = useState('');

  const addItem = () => {
    if (!input.trim()) return;
    onUpdate([...list, input]);
    setInput('');
  };

  const removeItem = (item: string) => {
    onUpdate(list.filter(i => i !== item));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-display">Grocery Gap List</h2>
        <p className="text-slate-500 text-sm">Items needed for your planned meals.</p>
        
        <div className="flex gap-2">
          <input 
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add item manually..."
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <button 
            onClick={addItem}
            className="bg-emerald-600 text-white w-12 h-12 rounded-xl flex items-center justify-center shadow-lg active:scale-90 transition-all"
          >
            <i className="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>

      <div className="space-y-3">
        {list.map((item, idx) => (
          <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-3">
              <input type="checkbox" className="w-5 h-5 accent-emerald-600 rounded" />
              <span className="text-slate-700 font-medium">{item}</span>
            </div>
            <button onClick={() => removeItem(item)} className="text-slate-300 hover:text-rose-500 transition-colors p-2">
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        ))}

        {list.length === 0 && (
          <div className="text-center py-12 text-slate-400">
            <i className="fa-solid fa-cart-shopping text-4xl mb-4 block opacity-20"></i>
            <p>Your grocery list is empty. Great job shopping!</p>
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button className="flex-1 bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-2xl shadow-sm flex items-center justify-center gap-2">
          <i className="fa-solid fa-share-nodes"></i> Share
        </button>
        <button className="flex-1 bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg flex items-center justify-center gap-2">
          <i className="fa-solid fa-file-pdf"></i> Export
        </button>
      </div>
    </div>
  );
};

export default GroceryListView;
