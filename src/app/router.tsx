import React, { lazy } from "react";
import { createBrowserRouter, Navigate } from "react-router";
import Root from "./Root";

// Lazy loading default exports is the most standard and compatible way
const LandingPage = lazy(() => import("./pages/LandingPage"));
const ProctorPanel = lazy(() => import("./pages/ProctorPanel").then(m => ({ default: m.ProctorPanel })));
const PerformanceView = lazy(() => import("./components/PerformanceView").then(m => ({ default: m.PerformanceView })));
const CandidatePanel = lazy(() => import("./pages/CandidatePanel"));
const PerformanceCandidateView = lazy(() => import("./components/PerformanceCandidateView").then(m => ({ default: m.PerformanceCandidateView })));

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-white bg-[#030213] p-6 text-center">
      <h1 className="text-4xl font-bold mb-4">404</h1>
      <p className="text-muted-foreground mb-8">Aradığınız sayfa bulunamadı.</p>
      <a href="/" className="px-6 py-3 bg-primary text-white rounded-xl font-bold">Anasayfaya Dön</a>
    </div>
  );
}

export const routerConfig = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "proctor",
        children: [
          {
            path: "theory",
            Component: ProctorPanel,
          },
          {
            path: "performance",
            Component: PerformanceView,
          }
        ]
      },
      {
        path: "candidate",
        children: [
          {
            path: "theory",
            Component: CandidatePanel,
          },
          {
            path: "performance",
            Component: PerformanceCandidateView,
          }
        ]
      },
      {
        path: "*",
        Component: NotFound,
      },
    ],
  },
]);
