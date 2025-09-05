import { lazy, Suspense } from "react";
import LoadingFallback from "./LoadingFallback";

export const lazyLoad = (importFunc) => {
  const Component = lazy(importFunc);
  return (
    <Suspense fallback={<LoadingFallback />}>
      <Component />
    </Suspense>
  );
};
