"use client";

import { Users, QrCode, CreditCard, Clock } from "lucide-react";

export default function ReceptionDashboard() {
  const stats = [
    { title: "Current Occupancy", value: "84", icon: Users, color: "text-orange-400", bg: "bg-orange-400/10" },
    { title: "Check-ins Today", value: "245", icon: QrCode, color: "text-blue-400", bg: "bg-blue-400/10" },
    { title: "Cash Collected", value: "$1,240", icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-400/10" },
    { title: "Upcoming Classes", value: "3", icon: Clock, color: "text-purple-400", bg: "bg-purple-400/10" },
  ];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Front Desk</h1>
          <p className="text-slate-400 mt-1">Manage daily operations and member entry.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white text-sm font-medium rounded-lg transition-colors border border-slate-700">
            Manual Check-in
          </button>
          <button className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-orange-500/20">
            New Registration
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-xl ${stat.bg}`}>
                <stat.icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-slate-400">{stat.title}</p>
              <h3 className="text-3xl font-bold text-white mt-1">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl h-96 flex items-center justify-center">
        <p className="text-slate-500">Live Check-in Feed / Member Search Placeholder</p>
      </div>
    </div>
  );
}
