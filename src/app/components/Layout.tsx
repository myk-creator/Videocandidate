import React from "react";
import { Outlet } from "react-router";
import { PDFProvider } from "../context/PDFContext";

export function Layout() {
  return (
    <PDFProvider>
      <div className="min-h-screen bg-[#0a0a0f] text-slate-200 font-sans selection:bg-purple-500/30 selection:text-white overflow-hidden">
        {/* Main Content Area - No global header, each page handles its own */}
        <main className="h-screen overflow-hidden">
          <Outlet />
        </main>
      </div>
    </PDFProvider>
  );
}
