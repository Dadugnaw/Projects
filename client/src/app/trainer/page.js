"use client";

import { Users, Activity, Target } from "lucide-react";

export default function TrainerDashboard() {
  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Trainer Dashboard</h1>
          <p className="text-slate-400 mt-1">Manage your clients and routines.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-purple-500/20">
            Create Workout Plan
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Assigned Clients</p>
              <h3 className="text-2xl font-bold text-white mt-1">12</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Classes Today</p>
              <h3 className="text-2xl font-bold text-white mt-1">2</h3>
            </div>
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl">
          <div className="flex items-center gap-4 mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">Active Plans</p>
              <h3 className="text-2xl font-bold text-white mt-1">8</h3>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl h-96 flex items-center justify-center">
        <p className="text-slate-500">Client List & Progress Tracking Placeholder</p>
      </div>
    </div>
  );
}
