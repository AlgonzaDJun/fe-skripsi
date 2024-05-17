import LaporanPerFakultas from "../components/home/LaporanPerFakultas";
import AlurLaporan from "../components/home/AlurLaporan";
import FormLaporan from "../components/home/FormLaporan";

import { useQuery } from "react-query";

const fetchLaporanByFakultas = async () => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/auth/dashboard-admin`
  );
  const data = await response.json();
  return data;
};

const Home = () => {
  const { data, isLoading } = useQuery({
    queryFn: fetchLaporanByFakultas,
    queryKey: "laporan",
  });

  console.log(data);

  return (
    <div>
      <div className="relative w-full">
        <svg
          className="w-full h-full md:h-80 absolute top-0 left-0 -z-10"
          viewBox="0 0 1280 376"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M0 235.153L36 251.075C71 266.997 142 297.616 213 313.537C284 329.459 356 329.459 427 320.886C498 313.537 569 297.616 640 281.694C711 266.997 782 251.075 853 251.075C924 251.075 996 266.997 1067 290.267C1138 313.537 1209 345.381 1244 360.078L1280 376V0H1244C1209 0 1138 0 1067 0C996 0 924 0 853 0C782 0 711 0 640 0C569 0 498 0 427 0C356 0 284 0 213 0C142 0 71 0 36 0H0V235.153Z"
            fill="url(#paint0_linear_3_41)"
          ></path>
          <defs>
            <linearGradient
              id="paint0_linear_3_41"
              x1="640"
              y1="0"
              x2="640"
              y2="376"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#FFA447"></stop>
              <stop offset="1" stopColor="#FFA447" stopOpacity="0.61"></stop>
            </linearGradient>
          </defs>
        </svg>

        <div className="flex flex-col gap-y-5 mb-9 mx-3 md:mx-0">
          <h1 className="text-4xl font-semibold text-white text-center mt-16">
            Layanan Pelaporan Fasilitas Kampus <br /> Universitas Negeri
            Surabaya
          </h1>
          <p className="text-white text-center text-2xl font-extralight">
            Sampaikan laporan anda langsung kepada pihak kampus
          </p>
        </div>

        <FormLaporan />
      </div>

      <AlurLaporan />

      <div className="flex flex-col items-center gap-y-5 mt-5 mb-10">
        <button className="px-3 py-2 rounded-lg bg-primary hover:bg-primary-hover text-white">
          Pelajari lebih lanjut
        </button>
      </div>

      {/* {isLoading && !data ? <Loading /> : null} */}

      {/* TOTAL LAPORAN */}
      <section
        className="w-full text-white mx-auto py-16 space-y-8 text-center mb-10 mt-24 bg-gradient-to-r from-primary to-orange-400 px-3 md:px-0"
        id="statistik"
      >
        <h1 className="font-bold text-3xl">
          LAPORAN FASILITAS KAMPUS <br /> UNIVERSITAS NEGERI SURABAYA
        </h1>
        <p className="font-light text-xl">
          Total data yang masuk hingga saat ini adalah <br />{" "}
          <span className="font-bold">{data ? data.data.laporan_diajukan : '...'}</span>{" "}
          laporan aktif,{" "}
          <span className="font-bold"> {data ? data.data.laporan_selesai : '...'}</span>
          laporan selesai, serta
          <span className="font-bold"> {data ? data.data.laporan_ditolak : '...'} </span>
          laporan gagal
        </p>
      </section>

      {/* DETAIL TIAP FAKULTAS */}
      <LaporanPerFakultas data={data} />
    </div>
  );
};

export default Home;
