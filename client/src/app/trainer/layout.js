"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, ClipboardList, Utensils, Users, Calendar, LogOut, Dumbbell } from "lucide-react";

export default function TrainerLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "TRAINER")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "TRAINER") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-purple-500" />
      </div>
    );
  }

  const menuItems = [
    { name: "My Clients", icon: Users, href: "/trainer" },
    { name: "Workout Plans", icon: ClipboardList, href: "/trainer/workouts" },
    { name: "Nutrition Plans", icon: Utensils, href: "/trainer/nutrition" },
    { name: "My Schedule", icon: Calendar, href: "/trainer/schedule" },
  ];

  return (
    <div className="flex h-screen bg-slate-950 text-slate-100 font-sans">
      <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col relative z-20 shadow-2xl">
        <div className="p-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-500/20">
            <Dumbbell className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-500">GYM Core</h2>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Trainer Portal</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group"
            >
              <item.icon className="w-5 h-5 text-slate-500 group-hover:text-purple-400 transition-colors" />
              {item.name}
            </a>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-800">
          <button
            onClick={logout}
            className="flex w-full items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-red-400 hover:text-white hover:bg-red-500/10 transition-all group"
          >
            <LogOut className="w-5 h-5 text-red-400 group-hover:text-red-300 transition-colors" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 relative overflow-y-auto overflow-x-hidden">
        <div className="fixed top-0 left-64 w-[50%] h-[50%] bg-purple-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="p-8 relative z-10">{children}</div>
      </main>
    </div>
  );
}
