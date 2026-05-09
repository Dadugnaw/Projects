"use client";

import { Activity, Clock, Flame } from "lucide-react";

export default function MemberDashboard() {
  return (
    <div className="space-y-6">
      <header className="flex flex-col gap-1">
        <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Hello, Alex!</h1>
        <p className="text-slate-400 text-sm md:text-base">Ready for today's workout?</p>
      </header>

      {/* Digital ID Card */}
      <div className="bg-gradient-to-r from-emerald-500 to-teal-600 p-6 rounded-2xl shadow-xl shadow-emerald-500/20 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl transform translate-x-10 -translate-y-10 pointer-events-none" />
        <div className="flex justify-between items-start relative z-10">
          <div>
            <p className="text-emerald-50 text-xs uppercase tracking-wider font-semibold mb-1">PRO Membership</p>
            <h2 className="text-white font-bold text-2xl">Alex Johnson</h2>
            <p className="text-emerald-100 text-sm mt-4">Valid until: Dec 2026</p>
          </div>
          <div className="bg-white p-2 rounded-xl">
            {/* Placeholder for QR Code */}
            <div className="w-16 h-16 bg-slate-200 border-4 border-white flex items-center justify-center">
              <span className="text-[8px] text-slate-500 font-bold">QR</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <Activity className="w-6 h-6 text-blue-400 mb-2" />
          <h3 className="text-xl font-bold text-white">4</h3>
          <p className="text-xs text-slate-400">Workouts this week</p>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <Clock className="w-6 h-6 text-purple-400 mb-2" />
          <h3 className="text-xl font-bold text-white">45m</h3>
          <p className="text-xs text-slate-400">Avg Duration</p>
        </div>
        <div className="col-span-2 md:col-span-1 bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-4 rounded-2xl flex flex-col items-center justify-center text-center">
          <Flame className="w-6 h-6 text-orange-400 mb-2" />
          <h3 className="text-xl font-bold text-white">12 Day</h3>
          <p className="text-xs text-slate-400">Current Streak</p>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl h-64 flex items-center justify-center">
        <p className="text-slate-500">Today's Plan Placeholder</p>
      </div>
    </div>
  );
}
