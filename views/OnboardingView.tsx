
import React, { useState } from 'react';
import { CUISINES, DIETARY_RESTRICTIONS } from '../constants';

interface OnboardingViewProps {
  onComplete: () => void;
}

const OnboardingView: React.FC<OnboardingViewProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [prefs, setPrefs] = useState({
    cuisine: [] as string[],
    diet: [] as string[],
  });

  const slides = [
    {
      title: "Welcome to CookWise",
      desc: "Cook smarter, waste less. Your journey to a zero-waste kitchen starts here.",
      icon: "fa-leaf",
      color: "bg-emerald-500"
    },
    {
      title: "AI Digital Chef",
      desc: "Get personalized recipes based on what's in your fridge right now.",
      icon: "fa-robot",
      color: "bg-blue-500"
    },
    {
      title: "Earn Eco Points",
      desc: "Save money and the planet. Track your impact with our sustainability dashboard.",
      icon: "fa-earth-americas",
      color: "bg-amber-500"
    }
  ];

  const toggleSelection = (list: string[], item: string) => {
    return list.includes(item) ? list.filter(i => i !== item) : [...list, item];
  };

  if (step < 3) {
    return (
      <div className="min-h-screen flex flex-col bg-white max-w-md mx-auto relative overflow-hidden">
        <div className={`flex-1 flex flex-col items-center justify-center p-8 transition-all duration-500`}>
          <div className={`${slides[step].color} w-32 h-32 rounded-full flex items-center justify-center text-white text-5xl mb-8 shadow-xl animate-bounce`}>
            <i className={`fa-solid ${slides[step].icon}`}></i>
          </div>
          <h1 className="text-3xl font-bold text-slate-800 text-center mb-4 font-display">{slides[step].title}</h1>
          <p className="text-slate-500 text-center text-lg">{slides[step].desc}</p>
        </div>

        <div className="p-8 flex flex-col gap-4">
          <div className="flex justify-center gap-2 mb-4">
            {slides.map((_, i) => (
              <div key={i} className={`h-2 rounded-full transition-all duration-300 ${i === step ? 'w-8 bg-emerald-500' : 'w-2 bg-slate-200'}`} />
            ))}
          </div>
          <button 
            onClick={() => setStep(step + 1)}
            className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg hover:bg-emerald-700 active:scale-[0.98] transition-all"
          >
            {step === 2 ? "Let's Personalize" : "Next"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 max-w-md mx-auto p-8">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 font-display">Personalize your experience</h2>
      <p className="text-slate-500 mb-8">Tell us what you like to eat and any dietary needs.</p>

      <div className="flex-1 space-y-8 overflow-y-auto no-scrollbar pb-8">
        <section>
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-utensils text-emerald-500"></i>
            Favorite Cuisines
          </h3>
          <div className="flex flex-wrap gap-2">
            {CUISINES.map(c => (
              <button
                key={c}
                onClick={() => setPrefs({ ...prefs, cuisine: toggleSelection(prefs.cuisine, c) })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  prefs.cuisine.includes(c) ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </section>

        <section>
          <h3 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
            <i className="fa-solid fa-circle-info text-emerald-500"></i>
            Dietary Preferences
          </h3>
          <div className="flex flex-wrap gap-2">
            {DIETARY_RESTRICTIONS.map(d => (
              <button
                key={d}
                onClick={() => setPrefs({ ...prefs, diet: toggleSelection(prefs.diet, d) })}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                  prefs.diet.includes(d) ? 'bg-emerald-600 text-white' : 'bg-white text-slate-600 border border-slate-200'
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </section>
      </div>

      <button 
        onClick={onComplete}
        className="w-full bg-emerald-600 text-white font-bold py-4 rounded-2xl shadow-lg mt-4"
      >
        Complete Setup
      </button>
    </div>
  );
};

export default OnboardingView;
