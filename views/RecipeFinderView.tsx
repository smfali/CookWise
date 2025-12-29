
import React, { useState, useEffect } from 'react';
import { Recipe, PantryItem } from '../types';
import { generateRecipesFromPantry } from '../services/geminiService';
import RecipeCard from '../components/RecipeCard';

interface RecipeFinderViewProps {
  pantry: PantryItem[];
  onAddToPlan: (recipe: Recipe) => void;
}

const RecipeFinderView: React.FC<RecipeFinderViewProps> = ({ pantry, onAddToPlan }) => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);

  const searchRecipes = async () => {
    setLoading(true);
    const results = await generateRecipesFromPantry(pantry, query);
    setRecipes(results);
    setLoading(false);
  };

  useEffect(() => {
    searchRecipes();
  }, []);

  if (selectedRecipe) {
    return (
      <div className="space-y-6 pb-20 animate-fadeIn">
        <button onClick={() => setSelectedRecipe(null)} className="flex items-center gap-2 text-emerald-600 font-bold mb-4">
          <i className="fa-solid fa-arrow-left"></i> Back to search
        </button>
        
        <img 
          src={selectedRecipe.image || `https://picsum.photos/400/300?random=${selectedRecipe.id}`}
          className="w-full h-56 object-cover rounded-3xl shadow-lg"
          alt={selectedRecipe.title}
        />
        
        <h2 className="text-2xl font-bold text-slate-800 font-display">{selectedRecipe.title}</h2>
        
        <div className="flex gap-4">
          <div className="bg-emerald-50 p-3 rounded-2xl flex-1 text-center">
            <p className="text-[10px] text-emerald-600 font-bold uppercase">Time</p>
            <p className="font-bold text-slate-800">{selectedRecipe.prepTime}m</p>
          </div>
          <div className="bg-amber-50 p-3 rounded-2xl flex-1 text-center">
            <p className="text-[10px] text-amber-600 font-bold uppercase">Level</p>
            <p className="font-bold text-slate-800">{selectedRecipe.difficulty}</p>
          </div>
        </div>

        <section>
          <h3 className="font-bold text-slate-800 mb-3 text-lg">Ingredients</h3>
          <ul className="space-y-2">
            {selectedRecipe.ingredients.map((ing, idx) => {
              const hasIngredient = pantry.some(p => ing.toLowerCase().includes(p.name.toLowerCase()));
              return (
                <li key={idx} className="flex items-center gap-3 p-3 bg-white rounded-xl border border-slate-100">
                  <i className={`fa-solid ${hasIngredient ? 'fa-check-circle text-emerald-500' : 'fa-circle-plus text-slate-300'}`}></i>
                  <span className={hasIngredient ? 'text-slate-800' : 'text-slate-400'}>{ing}</span>
                </li>
              );
            })}
          </ul>
        </section>

        <section>
          <h3 className="font-bold text-slate-800 mb-3 text-lg">Instructions</h3>
          <div className="space-y-4">
            {selectedRecipe.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">{idx + 1}</span>
                <p className="text-slate-600 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </section>

        <button 
          onClick={() => onAddToPlan(selectedRecipe)}
          className="fixed bottom-24 left-6 right-6 max-w-md mx-auto bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-xl active:scale-95 transition-all z-40"
        >
          Add to Meal Plan
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
        <h2 className="text-xl font-bold text-slate-800 font-display">Digital Chef</h2>
        <div className="relative">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search or 'Make something spicy'..."
            className="w-full bg-slate-50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
          />
          <i className="fa-solid fa-magnifying-glass absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"></i>
        </div>
        <button 
          onClick={searchRecipes}
          disabled={loading}
          className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl shadow-lg active:scale-[0.98] transition-all disabled:opacity-50"
        >
          {loading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : "Ask Gemini Chef"}
        </button>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center px-2">
          <h3 className="font-bold text-slate-800">Recipe Results</h3>
          <span className="text-[10px] text-slate-400 uppercase font-bold tracking-widest">Powered by AI</span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border-4 border-emerald-200 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-t-emerald-600 rounded-full animate-spin"></div>
            </div>
            <p className="text-slate-500 font-medium">Coming up with delicious ideas...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {recipes.map((recipe, idx) => (
              <RecipeCard key={recipe.id || idx} recipe={recipe} onClick={setSelectedRecipe} />
            ))}
            {!loading && recipes.length === 0 && (
              <div className="text-center py-12 text-slate-400">
                <i className="fa-solid fa-utensils text-4xl mb-4 block opacity-20"></i>
                <p>Click "Ask Gemini Chef" to get suggestions based on your pantry.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default RecipeFinderView;
