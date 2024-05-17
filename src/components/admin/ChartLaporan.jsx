/* eslint-disable no-unused-vars */
import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartLaporan = () => {
  const labels = [
    "Senin",
    "Selasa",
    "Rabu",
    "Kamis",
    "Jumat",
    "Sabtu",
    "Minggu",
  ];
  const data = {
    labels,
    datasets: [
      {
        label: "Laporan Masuk",
        data: [1, 2, 1, 0, 3, 4, 5],
        borderColor: "#FFA447",
        backgroundColor: "#FFA447",
      },
      {
        label: "Laporan Selesai",
        data: [0, 0, 0, 1, 0, 0, 2],
        borderColor: "#B7E5B4",
        backgroundColor: "#B7E5B4",
      },
      {
        label: "Laporan Gagal",
        data: [0, 0, 0, 0, 0, 0, 0],
        borderColor: "#0F0F0F",
        backgroundColor: "#0F0F0F",
      },
    ],
  };

  const options = {
    responsive: true,
    // tension: 0.4,
    // pointRadius: 0,
    // borderWidth: 3,
    // fill: true,
    // maxBarThickness: 6,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Laporan 1 Minggu Terakhir",
        font: {
          size: 25,
        },
      },
    },
    maintainAspectRatio: false,
  };
  return (
    <div className="w-full h-80 md:h-96 mt-10">
      <Line options={options} data={data} />
    </div>
  );
};

export default ChartLaporan;
