"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import { Users, Activity, CreditCard, Clock, Loader2, Download } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/admin/dashboard");
        setStats([
          { title: "Total Members", value: res.data.totalMembers, icon: Users, color: "text-blue-400", bg: "bg-blue-400/10" },
          { title: "Active Trainers", value: res.data.activeTrainers, icon: Activity, color: "text-purple-400", bg: "bg-purple-400/10" },
          { title: "Total Revenue", value: `$${res.data.revenue}`, icon: CreditCard, color: "text-emerald-400", bg: "bg-emerald-400/10" },
          { title: "Check-ins Today", value: res.data.checkinsToday, icon: Clock, color: "text-orange-400", bg: "bg-orange-400/10" },
        ]);
      } catch (error) {
        console.error("Failed to load stats");
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const generateReport = () => {
    window.open("http://localhost:5000/api/admin/reports/generate", "_blank");
  };

  if (loading) {
    return <div className="flex h-96 items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-blue-500" /></div>;
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Overview</h1>
          <p className="text-slate-400 mt-1">Live system metrics and statistics.</p>
        </div>
        <div className="flex items-center gap-4">
          <button onClick={generateReport} className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-blue-500/20">
            <Download className="w-4 h-4" />
            Generate Report
          </button>
        </div>
      </header>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats && stats.map((stat, index) => (
          <div key={index} className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl h-96 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-white mb-4">Revenue Chart</h3>
          <div className="flex-1 border border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500">
            Chart.js / Recharts Integration Required
          </div>
        </div>
        <div className="bg-slate-900/50 backdrop-blur-sm border border-slate-800 p-6 rounded-2xl h-96 flex flex-col justify-center">
          <h3 className="text-lg font-bold text-white mb-4">Recent Activity</h3>
           <div className="flex-1 border border-dashed border-slate-700 rounded-xl flex items-center justify-center text-slate-500">
            System logs feed goes here
          </div>
        </div>
      </div>
    </div>
  );
}
