import { Toaster } from "@/components/ui/sonner";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import { Outlet, createRootRoute, createRoute } from "@tanstack/react-router";
import { AnimatePresence } from "motion/react";
import BirthdaySurpriseModal from "./components/BirthdaySurpriseModal";
import Footer from "./components/Footer";
import Header from "./components/Header";
import MusicButton from "./components/MusicButton";
import FunFacts from "./pages/FunFacts";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home";
import Quiz from "./pages/Quiz";
import Timeline from "./pages/Timeline";
import Wishes from "./pages/Wishes";

const rootRoute = createRootRoute({
  component: () => (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "oklch(0.951 0.022 88)" }}
    >
      <BirthdaySurpriseModal />
      <Header />
      <AnimatePresence mode="wait">
        <main className="flex-1">
          <Outlet />
        </main>
      </AnimatePresence>
      <Footer />
      <MusicButton />
      <Toaster />
    </div>
  ),
});

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Home,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/gallery",
  component: Gallery,
});

const wishesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wishes",
  component: Wishes,
});

const timelineRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/timeline",
  component: Timeline,
});

const funFactsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/fun-facts",
  component: FunFacts,
});

const quizRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/quiz",
  component: Quiz,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  galleryRoute,
  wishesRoute,
  timelineRoute,
  funFactsRoute,
  quizRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
