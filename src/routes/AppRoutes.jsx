import { Routes, Route } from "react-router-dom";
import { lazyLoad } from "../helper/LazyLoad";
import ScrollToTop from "../helper/ScrollToTop";

export default function AppRoutes() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={lazyLoad(() => import("../pages/Home"))} />
      <Route path="/signin" element={lazyLoad(() => import("../components/Signin/Signin"))} />
      <Route path="/signup" element={lazyLoad(() => import("../components/Signup/Signup"))} />
      <Route path="/news/:id" element={lazyLoad(() => import("../pages/DetailPost"))} />
      <Route path="/setting-profile" element={lazyLoad(() => import("../pages/SettingProfile"))} />
      <Route path="/profile/:userSlug" element={lazyLoad(() => import("../pages/UserProfile"))} />
      <Route path="/add-post" element={lazyLoad(() => import("../pages/AddPost"))} />


      {/* Catch all unregistered routes */}
      <Route path="*" element={lazyLoad(() => import("../pages/404NotFound"))} />
    </Routes>
    </>
  );
}
