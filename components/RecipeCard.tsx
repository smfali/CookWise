
import React from 'react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={() => onClick(recipe)}
      className="bg-white rounded-2xl border border-slate-100 overflow-hidden shadow-sm active:scale-[0.98] transition-all cursor-pointer group"
    >
      <div className="relative h-40 w-full">
        <img 
          src={recipe.image || `https://picsum.photos/400/300?random=${recipe.id}`} 
          alt={recipe.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-2 right-2 flex flex-wrap gap-1 justify-end">
          {recipe.tags.slice(0, 2).map(tag => (
            <span key={tag} className="bg-emerald-500/90 text-white text-[10px] px-2 py-1 rounded-full font-bold uppercase tracking-wider">
              {tag}
            </span>
          ))}
        </div>
        {recipe.matchScore !== undefined && (
          <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg px-2 py-1 shadow-sm">
            <span className="text-emerald-700 text-xs font-bold">{recipe.matchScore}% Match</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-slate-800 line-clamp-1 mb-1">{recipe.title}</h3>
        <div className="flex items-center text-xs text-slate-500 gap-3">
          <span><i className="fa-regular fa-clock mr-1"></i>{recipe.prepTime}m</span>
          <span><i className="fa-solid fa-fire mr-1"></i>{recipe.difficulty}</span>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
