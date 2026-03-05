import { createBrowserRouter, Navigate } from "react-router";
import React, { lazy, Suspense } from "react";
import { Layout } from "./components/Layout";

// Loading component
const PageLoader = () => (
  <div className="h-screen w-full flex flex-col items-center justify-center bg-[#050508] text-purple-500">
    <div className="w-12 h-12 border-4 border-purple-500/20 border-t-purple-500 rounded-full animate-spin mb-4" />
    <span className="text-[10px] font-black uppercase tracking-[0.3em] animate-pulse">Runway Proctor Yükleniyor...</span>
  </div>
);

// Lazy components
const ProctorTheory = lazy(() => import("./pages/ProctorPanel").then(module => ({ default: module.ProctorPanel })));
const ProctorPerformance = lazy(() => import("./components/PerformanceView").then(module => ({ default: module.PerformanceView })));
const CandidateTheory = lazy(() => import("./pages/CandidatePanel"));
const CandidatePerformance = lazy(() => import("./components/PerformanceCandidateView").then(module => ({ default: module.PerformanceCandidateView })));

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      {
        index: true,
        element: <Navigate to="/proctor/theory" replace />,
      },
      {
        path: "proctor",
        children: [
          {
            index: true,
            element: <Navigate to="/proctor/theory" replace />,
          },
          {
            path: "theory",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProctorTheory />
              </Suspense>
            ),
          },
          {
            path: "performance",
            element: (
              <Suspense fallback={<PageLoader />}>
                <ProctorPerformance />
              </Suspense>
            ),
          }
        ]
      },
      {
        path: "candidate",
        children: [
          {
            index: true,
            element: <Navigate to="/candidate/theory" replace />,
          },
          {
            path: "theory",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CandidateTheory />
              </Suspense>
            ),
          },
          {
            path: "performance",
            element: (
              <Suspense fallback={<PageLoader />}>
                <CandidatePerformance />
              </Suspense>
            ),
          }
        ]
      },
    ],
  },
]);
