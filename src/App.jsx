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
    const timer = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    <div className="relative min-h-screen">
      <AnimatePresence>{isLoading && <SplashScreen key="splash" />}</AnimatePresence>
      {!isLoading ? (
        <>
          <Header />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <AppRoutes />
          </div>
          <Footer />
        </>
      ) : null}
    </div>
  );
}

export default App;
