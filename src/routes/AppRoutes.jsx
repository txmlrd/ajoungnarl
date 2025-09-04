import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import NotFound from "../pages/404NotFound";
import Signin from "../components/Signin/Signin";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signin" element={<Signin />} />

      {/* Catch all unregistered routes */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
