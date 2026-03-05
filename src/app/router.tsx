import { createBrowserRouter, Navigate } from "react-router";
import Root from "./Root";
import LandingPage from "./pages/LandingPage";
import { TheoryProctor } from "./pages/TheoryProctor";
import { PerformanceProctor } from "./pages/PerformanceProctor";
import { CandidatePanel } from "./pages/CandidatePanel";
import { PerformanceCandidate } from "./pages/PerformanceCandidate";

export const router = createBrowserRouter([
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
            index: true,
            element: <Navigate to="/proctor/theory" replace />,
          },
          {
            path: "theory",
            Component: TheoryProctor,
          },
          {
            path: "performance",
            Component: PerformanceProctor,
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
            Component: CandidatePanel,
          },
          {
            path: "performance",
            Component: PerformanceCandidate,
          }
        ]
      },
      {
        path: "*",
        element: <Navigate to="/" replace />,
      }
    ],
  },
]);
