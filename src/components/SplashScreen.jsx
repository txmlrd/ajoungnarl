import React from "react";
import { motion } from "framer-motion";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
// ignore buffer mismatch warning for lottie files
console.warn = (function (origWarn) {
  return function (...args) {
    if (args[0] && args[0].includes("Buffer size mismatch")) return;
    origWarn(...args);
  };
})(console.warn);

export default function SplashScreen() {
  return (
    <motion.div className="fixed inset-0 flex items-center justify-center bg-white z-100" initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }}>
      <motion.div initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ duration: 2, ease: "easeOut" }} className="text-3xl font-cormorant font-bold">
        <DotLottieReact src="https://lottie.host/b8df5041-4b11-4861-a0c6-3891b3c9cf8a/Lr710NBYmX.lottie" loop autoplay />
        <div className="flex items-center justify-center">ajoungnarl</div>
      </motion.div>
    </motion.div>
  );
}
