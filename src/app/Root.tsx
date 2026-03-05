import { Outlet, NavLink, Navigate, useLocation } from "react-router";
import { Toaster } from "sonner";
import { Suspense } from "react";
import { ShieldCheck, UserCog, Monitor, Zap, Activity } from "lucide-react";
import { PDFProvider } from "./context/PDFContext";

export default function Root() {
  const location = useLocation();

  // Redirect /proctor to /proctor/theory and /candidate to /candidate/theory
  if (location.pathname === "/proctor") return <Navigate to="/proctor/theory" replace />;
  if (location.pathname === "/candidate") return <Navigate to="/candidate/theory" replace />;

  return (
    <PDFProvider>
      <div className="dark bg-[#030213] min-h-screen text-slate-200 selection:bg-primary selection:text-primary-foreground">
        {/* Global Header for Navigation between Demos */}
        <header className="fixed top-0 left-0 right-0 h-16 border-b border-white/10 bg-[#0d0d14]/80 backdrop-blur-xl z-[100] flex items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-purple-900/20">
              <ShieldCheck className="text-white w-6 h-6" />
            </div>
            <div>
              <h1 className="text-lg font-bold tracking-tight text-white leading-none italic uppercase">Runway Akademi</h1>
              <p className="text-[10px] text-slate-400 font-medium uppercase tracking-[0.3em] mt-1">Proctoring System</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/10 overflow-x-auto max-w-[600px] scrollbar-none">
            <NavLink
              to="/proctor/theory"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold transition-all duration-200 shrink-0 uppercase tracking-tighter ${
                  isActive ? "bg-purple-600/20 text-purple-400 border border-purple-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <UserCog className="w-3.5 h-3.5" />
              Teorik Gözetmen
            </NavLink>
            <NavLink
              to="/proctor/performance"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold transition-all duration-200 shrink-0 uppercase tracking-tighter ${
                  isActive ? "bg-indigo-600/20 text-indigo-400 border border-indigo-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Zap className="w-3.5 h-3.5" />
              Performans Gözetmen
            </NavLink>
            <div className="w-px h-4 bg-white/10 mx-1" />
            <NavLink
              to="/candidate/theory"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold transition-all duration-200 shrink-0 uppercase tracking-tighter ${
                  isActive ? "bg-emerald-600/20 text-emerald-400 border border-emerald-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Monitor className="w-3.5 h-3.5" />
              Teorik Aday
            </NavLink>
            <NavLink
              to="/candidate/performance"
              className={({ isActive }) =>
                `flex items-center gap-2 px-3 py-2 rounded-lg text-[11px] font-bold transition-all duration-200 shrink-0 uppercase tracking-tighter ${
                  isActive ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" : "text-slate-400 hover:text-white hover:bg-white/5"
                }`
              }
            >
              <Activity className="w-3.5 h-3.5" />
              Performans Aday
            </NavLink>
          </nav>

          <div className="flex items-center gap-4">
             <div className="hidden sm:flex flex-col items-end">
                <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Sistem Durumu</span>
                <span className="text-[10px] text-emerald-500 font-bold flex items-center gap-1">
                   <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
                   CANLI AKTİF
                </span>
             </div>
          </div>
        </header>

        <main className="pt-16 min-h-screen">
          <Suspense fallback={
            <div className="min-h-screen bg-[#030213] flex flex-col items-center justify-center">
              <div className="w-12 h-12 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em]">Oturum Hazırlanıyor</p>
            </div>
          }>
            <Outlet />
          </Suspense>
        </main>
        
        <Toaster position="top-right" theme="dark" closeButton richColors />
        
        <style dangerouslySetInnerHTML={{ __html: `
          .scrollbar-none::-webkit-scrollbar {
            display: none;
          }
        `}} />
      </div>
    </PDFProvider>
  );
}
