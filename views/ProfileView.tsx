
import React from 'react';
import { UserPreferences } from '../types';

interface ProfileViewProps {
  preferences: UserPreferences;
  onUpdate: (prefs: UserPreferences) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ preferences, onUpdate }) => {
  return (
    <div className="space-y-8 pb-10">
      <div className="flex flex-col items-center py-6">
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center text-4xl text-emerald-600 border-4 border-white shadow-xl">
            <i className="fa-solid fa-user"></i>
          </div>
          <button className="absolute bottom-0 right-0 w-8 h-8 bg-emerald-600 text-white rounded-full flex items-center justify-center border-2 border-white shadow-lg">
            <i className="fa-solid fa-camera text-xs"></i>
          </button>
        </div>
        <h2 className="text-xl font-bold text-slate-800 mt-4 font-display">Alex Thompson</h2>
        <p className="text-slate-500 text-sm">Joined November 2023</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
          <p className="text-emerald-600 text-2xl font-bold">42</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold">Recipes Saved</p>
        </div>
        <div className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm text-center">
          <p className="text-amber-500 text-2xl font-bold">12kg</p>
          <p className="text-[10px] text-slate-400 uppercase font-bold">Waste Saved</p>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="font-bold text-slate-800 px-2">Account Settings</h3>
        <div className="bg-white rounded-3xl border border-slate-100 shadow-sm divide-y divide-slate-50 overflow-hidden">
          <button className="w-full px-6 py-4 flex items-center justify-between text-slate-700 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-heart text-emerald-500"></i>
              <span className="font-medium">Dietary Preferences</span>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
          </button>
          <button className="w-full px-6 py-4 flex items-center justify-between text-slate-700 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-bell text-amber-500"></i>
              <span className="font-medium">Notifications</span>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
          </button>
          <button className="w-full px-6 py-4 flex items-center justify-between text-slate-700 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-shield-halved text-blue-500"></i>
              <span className="font-medium">Privacy & Security</span>
            </div>
            <i className="fa-solid fa-chevron-right text-slate-300 text-xs"></i>
          </button>
          <button className="w-full px-6 py-4 flex items-center justify-between text-slate-700 hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <i className="fa-solid fa-crown text-amber-500"></i>
              <span className="font-medium">Go Premium</span>
            </div>
            <span className="text-[10px] bg-amber-100 text-amber-700 px-2 py-1 rounded font-bold">PRO</span>
          </button>
        </div>
      </div>

      <button className="w-full py-4 text-rose-600 font-bold bg-white border border-rose-100 rounded-2xl shadow-sm hover:bg-rose-50 transition-all">
        Log Out
      </button>
    </div>
  );
};

export default ProfileView;
