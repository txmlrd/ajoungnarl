import { Routes, Route } from "react-router-dom";
import { lazyLoad } from "../helper/LazyLoad";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={lazyLoad(() => import("../pages/Home"))} />
      <Route path="/signin" element={lazyLoad(() => import("../components/Signin/Signin"))} />
      <Route path="/signup" element={lazyLoad(() => import("../components/Signup/Signup"))} />
      <Route path="/news/:id" element={lazyLoad(() => import("../pages/DetailPost"))} />

      {/* Catch all unregistered routes */}
      <Route path="*" element={lazyLoad(() => import("../pages/404NotFound"))} />
    </Routes>
  );
}
