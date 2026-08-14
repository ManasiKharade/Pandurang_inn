import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import "aos/dist/aos.css";

import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/layout/ScrollToTop/ScrollToTop";

function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isAdminRoute = location.pathname.startsWith("/admin");

  useEffect(() => {
    // Initialize AOS animations
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-out-cubic",
      offset: 50,
    });

    // Redirect to home page on refresh, ignoring admin routes
    if (!isAdminRoute) {
      const navigationEntries = window.performance?.getEntriesByType("navigation");
      const isReloadModern = navigationEntries?.length > 0 && navigationEntries[0].type === "reload";
      // Fallback for older browsers
      const isReloadLegacy = window.performance?.navigation?.type === 1;

      if (isReloadModern || isReloadLegacy) {
        navigate("/");
      }
    }
  }, []); // Run once on mount

  return (
    <>
      <Toaster position="top-center" />
      {!isAdminRoute && <Navbar />}
      <ScrollToTop />
      <AppRoutes />
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;