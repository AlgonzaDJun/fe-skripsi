import Dashboard from "./Dashboard";
import { Routes } from "react-router-dom";
import { Route } from "react-router-dom";
import Sidebar from "./Sidebar";
import LaporanMasuk from "./LaporanMasuk";
import { Navigate } from "react-router-dom";
import PerangkinganLaporan from "./PerangkinganLaporan";
import InformasiEkstraksi from "./InformasiEkstraksi";
import ChatToUser from "./ChatToUser";
import { ToastContainer } from "react-toastify";

const AdminRoute = () => {
  return (
    // <BrowserRouter>
    <Sidebar>
      <div className="px-2 py-4">
        <ToastContainer />
        <Routes>
          <Route
            path="/admin/"
            element={<Navigate to={"/admin/dashboard"} />}
          />
          <Route path="/admin/dashboard" element={<Dashboard />} />
          <Route path="/admin/chat" element={<ChatToUser />} />
          <Route path="/admin/chat/:id/:id_pelapor" element={<ChatToUser />} />
          <Route path="/admin/laporan" element={<LaporanMasuk />} />
          <Route path="/admin/perangkingan" element={<PerangkinganLaporan />} />
          <Route
            path="/admin/ekstraksi-informasi"
            element={<InformasiEkstraksi />}
          />
        </Routes>
      </div>
    </Sidebar>
    // </BrowserRouter>
  );
};

export default AdminRoute;
