import { BrowserRouter } from "react-router-dom";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import NotFoundPage from "./pages/NotFoundPage";
import RiwayatLaporan from "./pages/RiwayatLaporan";
import DetailLaporan from "./pages/DetailLaporan";
import ChatToAdmin from "./pages/ChatToAdmin";
import AdminRoute from "./pages/admin/AdminRoute";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const AdminRole = localStorage.getItem("role") === "admin";

  const isAdminRoute = () => {
    // Sesuaikan dengan pola rute admin Anda
    return window.location.pathname.startsWith("/admin");
  };

  // localStorage.setItem("role", "admin");

  return (
    <div className="m-0 p-0 box-border w-full">
      <BrowserRouter>
        {isAdminRoute() && AdminRole ? (
          <AdminRoute />
        ) : (
          <>
            <Navbar />
            <div className="mb-14"></div>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* login */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/riwayat" element={<RiwayatLaporan />} />
              <Route path="/laporan/:id" element={<DetailLaporan />} />
              <Route path="/chat" element={<ChatToAdmin />} />
              <Route path="/chat/:id" element={<ChatToAdmin />} />
              <Route path="/*" element={<NotFoundPage />} />
            </Routes>
            <Footer />
          </>
        )}
      </BrowserRouter>
    </div>
  );
}

export default App;
