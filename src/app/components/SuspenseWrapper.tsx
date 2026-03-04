import React, { Suspense } from "react";

export const withSuspense = (Component: React.ComponentType) => (
  <Suspense fallback={<div className="min-h-screen bg-[#05060f] flex items-center justify-center text-indigo-500 font-black uppercase tracking-widest animate-pulse">Yükleniyor...</div>}>
    <Component />
  </Suspense>
);
