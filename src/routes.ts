import { createBrowserRouter } from "react-router";
import { ProctorView } from "./app/components/ProctorView";
import { CandidateView } from "./app/components/CandidateView";
import { AuditorView } from "./app/components/AuditorView";
import { PerformanceView } from "./app/components/PerformanceView";
import { PerformanceCandidateView } from "./app/components/PerformanceCandidateView";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ProctorView,
  },
  {
    path: "/candidate",
    Component: CandidateView,
  },
  {
    path: "/proctor",
    Component: ProctorView,
  },
  {
    path: "/auditor",
    Component: AuditorView,
  },
  {
    path: "/performance",
    Component: PerformanceView,
  },
  {
    path: "/performance-candidate",
    Component: PerformanceCandidateView,
  },
]);
