import { useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/layout/Navbar/Navbar";
import Footer from "./components/layout/Footer/Footer";
import AppRoutes from "./routes/AppRoutes";
import ScrollToTop from "./components/layout/ScrollToTop/ScrollToTop";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

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