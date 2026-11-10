import { lazy, Suspense } from "react";

const Portfolio = lazy(() => import("./app/App"));

export default function App() {
  return (
    <Suspense
      fallback={
        <div className="app-loading" role="status">
          <span />
          <span className="sr-only">Loading portfolio</span>
        </div>
      }
    >
      <Portfolio />
    </Suspense>
  );
}
