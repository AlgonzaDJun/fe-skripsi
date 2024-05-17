/* eslint-disable no-unused-vars */
// import React from 'react'
import { IoIosMailUnread } from "react-icons/io";
import { FaFileCircleCheck } from "react-icons/fa6";
import { FaExclamation } from "react-icons/fa";
import CardDashboard from "../../components/admin/CardDashboard";
import ChartLaporan from "../../components/admin/ChartLaporan";
import { useQuery } from "react-query";
import Loading from "../../components/Loading";
import ChartFakultas from "../../components/admin/ChartFakultas";
import ChartJurusan from "../../components/admin/ChartJurusan";

const fetchAdminDashboard = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/auth/dashboard-admin`
  );
  const data = await response.json();
  return data;
};

const Dashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: "admin-dashboard",
    queryFn: fetchAdminDashboard,
  });

  console.log(data);

  return (
    <div className="text-primary">
      {isLoading ? <Loading /> : <></>}
      <h1 className="text-xl font-semibold mb-10">Dashboard</h1>

      <div className="md:flex mx-auto items-center gap-4 space-y-7 md:space-y-0 w-full">
        <CardDashboard
          icon={<IoIosMailUnread size="50" />}
          jenis="Laporan Belum ditangani"
          jumlah={data ? data.data.laporan_diajukan : 0}
          className={"md:w-1/3"}
        />
        <CardDashboard
          icon={<FaFileCircleCheck size="50" />}
          jenis="Laporan selesai"
          jumlah={data ? data.data.laporan_selesai : 0}
          className={"md:w-1/3"}
        />
        <CardDashboard
          icon={<FaExclamation size="50" />}
          jenis="Laporan Palsu atau gagal"
          jumlah={data ? data.data.laporan_ditolak : 0}
          className={"md:w-1/3"}
        />
      </div>

      {/* <ChartLaporan /> */}
      <div className="grid grid-cols-1 md:grid-cols-2">
        {data ? (
          <ChartFakultas dataFakultas={data.data.laporan_per_fakultas} />
        ) : (
          <Loading />
        )}
        {data ? (
          <ChartJurusan dataJurusan={data.data.laporan_per_jurusan} />
        ) : (
          <Loading />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
