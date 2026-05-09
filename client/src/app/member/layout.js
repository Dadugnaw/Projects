"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { Loader2, Home, Activity, Calendar, User as UserIcon, LogOut, Dumbbell } from "lucide-react";

export default function MemberLayout({ children }) {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && (!user || user.role !== "MEMBER")) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading || !user || user.role !== "MEMBER") {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-slate-950">
        <Loader2 className="h-10 w-10 animate-spin text-emerald-500" />
      </div>
    );
  }

  const navItems = [
    { name: "Home", icon: Home, href: "/member" },
    { name: "My Plan", icon: Activity, href: "/member/plan" },
    { name: "Classes", icon: Calendar, href: "/member/classes" },
    { name: "Profile", icon: UserIcon, href: "/member/profile" },
  ];

  return (
    <div className="flex flex-col h-screen bg-slate-950 text-slate-100 font-sans md:flex-row">
      {/* Top App Bar (Mobile) */}
      <header className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800 z-20 shadow-lg">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-lg flex items-center justify-center">
            <Dumbbell className="text-white w-4 h-4" />
          </div>
          <h2 className="text-lg font-bold text-white">GYM Core</h2>
        </div>
        <button onClick={logout} className="p-2 text-slate-400 hover:text-red-400">
          <LogOut className="w-5 h-5" />
        </button>
      </header>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex w-64 bg-slate-900 border-r border-slate-800 flex-col relative z-20 shadow-2xl">
        <div className="p-6 flex items-center gap-3">
          <div className="h-10 w-10 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/20">
            <Dumbbell className="text-white w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">GYM Core</h2>
            <p className="text-[10px] text-slate-400 font-medium tracking-widest uppercase">Member App</p>
          </div>
        </div>

        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800/50 transition-all group"
            >
              <item.icon className="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors" />
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

      {/* Main Content */}
      <main className="flex-1 relative overflow-y-auto overflow-x-hidden pb-20 md:pb-0">
        <div className="fixed top-0 right-0 w-[50%] h-[50%] bg-emerald-600/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="p-4 md:p-8 relative z-10">{children}</div>
      </main>

      {/* Bottom Navigation (Mobile) */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around p-3 z-50 safe-area-bottom">
        {navItems.map((item) => (
          <a key={item.name} href={item.href} className="flex flex-col items-center gap-1 text-slate-400 hover:text-emerald-400 p-2">
            <item.icon className="w-6 h-6" />
            <span className="text-[10px] font-medium">{item.name}</span>
          </a>
        ))}
      </nav>
    </div>
  );
}
