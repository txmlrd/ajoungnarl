import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import AppRoutes from "./routes/AppRoutes";
import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    // simulasi waktu loading, misalnya ambil data awal
    const hasLoaded = localStorage.getItem("hasLoaded");
    if (!hasLoaded) {
      const timer = setTimeout(() => {
        setIsLoading(false);
        localStorage.setItem("hasLoaded", "true");
      }, 2000);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
    }
  }, []);
  return (
    <div className="relative min-h-screen">
      <AnimatePresence>{isLoading && <SplashScreen key="splash" />}</AnimatePresence>

      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AppRoutes />
      </div>
      <Footer />
    </div>
  );
}

export default App;
