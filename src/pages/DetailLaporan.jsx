/* eslint-disable no-unused-vars */
import { useState } from "react";
import { MdSave, MdStar } from "react-icons/md";
import { useParams } from "react-router-dom";
import { IoIosChatboxes } from "react-icons/io";
import { useQuery } from "react-query";
import { useEffect } from "react";
import ModalRating from "./ModalRating";

const fetchLaporanById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/laporan/${id}`
  );
  const data = await response.json();
  return data;
};

const DetailLaporan = () => {
  const { id } = useParams();

  const { data: dataLaporan } = useQuery({
    queryFn: () => fetchLaporanById(id),
    queryKey: "laporanById",
  });

  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    if (dataLaporan) {
      console.log(dataLaporan);
      setData({
        judul: dataLaporan.data.judul,
        lokasi: dataLaporan.data.lokasi,
        fakultas: dataLaporan.data.fakultas,
        deskripsi: dataLaporan.data.deskripsi,
        img: dataLaporan.data.gambar[0],
        status: dataLaporan.data.status,
        rating: dataLaporan.data.rating,
      });
    }
  }, [dataLaporan]);

  const openModalRating = () => {
    if (dataLaporan.data.status !== "selesai") {
      alert("Laporan belum selesai");
      return;
    }
    if (dataLaporan.data.rating > 0) {
      alert("Anda sudah memberikan rating");
      return;
    }
    setOpenModal(true);
  };

  const [edit, setEdit] = useState(false);
  const [data, setData] = useState({
    judul: "",
    lokasi: "",
    fakultas: "",
    deskripsi: "",
    status: "",
  });

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen box-border">
      <div className="relative w-full">
        <svg
          className="w-full h-80 absolute top-0 left-0 -z-10"
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

        <div className="flex justify-center items-center flex-col gap-y-5 min-h-11 mb-9 text-gray-900 mx-3 md:mx-0">
          <h1 className="text-2xl md:text-4xl font-semibold text-white mt-6">
            Detail Laporan #{id}
          </h1>

          <img
            src={data.img ? data.img : "/tanya.png"}
            className="max-w-md w-full h-60 object-cover rounded-md shadow-2xl mx-4 bg-gray-300"
            alt=""
          />

          <form action="" className="max-w-screen-sm w-full mt-4 space-y-3">
            <div>
              <label htmlFor="" className="font-semibold text-lg">
                Judul Laporan
              </label>
              <input
                type="text"
                readOnly={!edit}
                onChange={handleChange}
                className="w-full text-gray-800 p-1 rounded-md border-2 border-gray-300"
                value={data.judul}
                name="judul"
              />
            </div>
            <div>
              <label htmlFor="" className="font-semibold text-lg">
                Status Laporan
              </label>
              <input
                type="text"
                readOnly
                onChange={handleChange}
                className="w-full text-gray-800 p-1 rounded-md border-2 border-gray-300"
                value={data.status}
                name="status"
              />
            </div>
            <div>
              <label htmlFor="" className="font-semibold text-lg">
                Lokasi Laporan
              </label>
              <input
                type="text"
                readOnly={!edit}
                onChange={handleChange}
                className="w-full text-gray-800 p-1 rounded-md border-2 border-gray-300"
                value={data.lokasi}
                name="lokasi"
              />
            </div>
            <div>
              <label htmlFor="" className="font-semibold text-lg">
                Fakultas
              </label>
              <input
                type="text"
                readOnly={!edit}
                onChange={handleChange}
                className="w-full text-gray-800 p-1 rounded-md border-2 border-gray-300"
                value={data.fakultas}
                name="fakultas"
              />
            </div>
            <div>
              <label htmlFor="" className="font-semibold text-lg">
                Deskripsi Laporan
              </label>

              <textarea
                readOnly={!edit}
                onChange={handleChange}
                id=""
                rows="8"
                className="w-full border rounded-md p-2 text-black"
                value={data.deskripsi}
                name="deskripsi"
              ></textarea>
            </div>

            <div className="flex gap-3 flex-wrap md:flex-nowrap">
              {
                // !edit ? (
                //   <button
                //     type="button"
                //     onClick={() => setEdit(true)}
                //     className="w-full flex items-center justify-center bg-primary text-white py-2 rounded-md hover:bg-primary-hover"
                //   >
                //     <svg
                //       xmlns="http://www.w3.org/2000/svg"
                //       fill="none"
                //       viewBox="0 0 24 24"
                //       strokeWidth={1.5}
                //       stroke="currentColor"
                //       className="w-6 h-6"
                //     >
                //       <path
                //         strokeLinecap="round"
                //         strokeLinejoin="round"
                //         d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                //       />
                //     </svg>
                //     Edit
                //   </button>
                // ) : (
                //   <button
                //     type="button"
                //     onClick={() => setEdit(false)}
                //     className="w-full flex items-center justify-center bg-primary text-white py-2 rounded-md hover:bg-primary-hover"
                //   >
                //     <MdSave className="w-6 h-6" />
                //     Simpan
                //   </button>
                // )
              }
              <ModalRating openModal={openModal} setOpenModal={setOpenModal} />
              <button
                type="button"
                className="w-full flex items-center justify-center bg-emerald-500 text-white py-2 rounded-md hover:bg-emerald-600"
                onClick={() => openModalRating()}
              >
                <MdStar className="w-6 h-6" />
                {dataLaporan && dataLaporan.data.rating > 0
                  ? dataLaporan.data.rating
                  : "Beri Rating"}
                {/* Berikan Rating */}
              </button>
              <button
                onClick={() => {
                  window.location.href = "/chat/" + dataLaporan.data.id;
                }}
                type="button"
                className="w-full flex items-center justify-center bg-sky-500 text-white py-2 rounded-md hover:bg-sky-600"
              >
                <IoIosChatboxes className="w-6 h-6" />
                Chat dg Admin
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* <h1 className="font-semibold text-2xl text-gray-800">
        Detail Laporan {id}
      </h1>
      <hr />
      <div className="mt-5 flex gap-4 flex-wrap">
        
      </div> */}
    </div>
  );
};

export default DetailLaporan;
