import { createBrowserRouter } from "react-router";
import { lazy } from "react";
import { withSuspense } from "./components/SuspenseWrapper";

const ProctorView = lazy(() => import("./components/ProctorView").then(m => ({ default: m.ProctorView })));
const CandidateView = lazy(() => import("./components/CandidateView").then(m => ({ default: m.CandidateView })));
const AuditorView = lazy(() => import("./components/AuditorView").then(m => ({ default: m.AuditorView })));
const PerformanceView = lazy(() => import("./components/PerformanceView").then(m => ({ default: m.PerformanceView })));
const PerformanceCandidateView = lazy(() => import("./components/PerformanceCandidateView").then(m => ({ default: m.PerformanceCandidateView })));

export const router = createBrowserRouter([
  {
    path: "/",
    element: withSuspense(ProctorView),
  },
  {
    path: "/candidate",
    element: withSuspense(CandidateView),
  },
  {
    path: "/proctor",
    element: withSuspense(ProctorView),
  },
  {
    path: "/auditor",
    element: withSuspense(AuditorView),
  },
  {
    path: "/performance",
    element: withSuspense(PerformanceView),
  },
  {
    path: "/performance-candidate",
    element: withSuspense(PerformanceCandidateView),
  },
]);
