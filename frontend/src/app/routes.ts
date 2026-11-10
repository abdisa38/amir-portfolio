import { createBrowserRouter } from "react-router";
import SiteLayout from "./SiteLayout";
import HomePage from "../pages/HomePage";
import RouteLoading from "../components/RouteLoading";

export const router = createBrowserRouter([
  {
    Component: SiteLayout,
    HydrateFallback: RouteLoading,
    children: [
      { index: true, Component: HomePage },
      {
        path: "pricing",
        lazy: async () => ({ Component: (await import("../pages/PricingPage")).default }),
      },
      {
        path: "skills",
        lazy: async () => ({ Component: (await import("../pages/SkillsPage")).default }),
      },
      {
        path: "contact",
        lazy: async () => ({ Component: (await import("../pages/ContactPage")).default }),
      },
      {
        path: "faq",
        lazy: async () => ({ Component: (await import("../pages/FAQPage")).default }),
      },
      {
        path: "*",
        lazy: async () => ({ Component: (await import("../pages/NotFoundPage")).default }),
      },
    ],
  },
]);
