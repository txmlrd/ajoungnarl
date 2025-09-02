import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/404NotFound";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      {/* Catch all unregistered routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
