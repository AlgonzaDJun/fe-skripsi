/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
// import React from 'react'
import { Carousel, Modal } from "flowbite-react";
import { useEffect, useMemo, useRef, useState } from "react";
import DataTable from "react-data-table-component";
import { useQuery, useMutation } from "react-query";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import Loading from "../../components/Loading";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const fetchLaporan = async () => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_LOCAL}/laporan`);
  const data = await response.json();
  return data;
};

const ubahStatusLaporan = async ({ id, status }) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_LOCAL
    }/laporan/status/${id}?new_status=${status}`,
    {
      method: "PUT",
    }
  );
  const data = await response.json();
  return data;
};

const LaporanMasuk = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  // const sentences = [
  //   "Di food court danau unesa ketintang, kursi ada yang rusak.",
  //   "Tempat sampah belum ada di danau unesa ketintang.",
  //   "Kursi di food court perlu diperbaiki.",
  //   "Saya menemukan banyak sampah di sekitar danau unesa.",
  //   "Listrik di ruang food court sering mati tiba-tiba.",
  //   "Tempat duduk di food court danau unesa tidak nyaman.",
  //   "Kursi di food court danau unesa sering patah.",
  //   "Saya menemukan beberapa kerusakan di kursi food court.",
  //   "Sampah menumpuk di dekat danau unesa ketintang.",
  //   "Listrik di food court danau unesa sering padam.",
  //   "Kursi di food court butuh perbaikan segera.",
  //   "Saya merasa tidak aman di sekitar danau unesa pada malam hari.",
  //   "Lampu di food court danau unesa perlu diganti.",
  //   "Kursi di food court danau unesa terlalu kotor.",
  //   "Saya menemukan tempat sampah yang penuh di food court.",
  //   "Listrik di danau unesa ketintang terputus-putus.",
  //   "Kursi di food court danau unesa tidak kokoh lagi.",
  //   "Kondisi kursi di food court sangat buruk.",
  //   "Saya tidak bisa menemukan tempat sampah di sekitar danau unesa.",
  //   "Lampu di food court danau unesa tidak menyala.",
  //   "Kursi di food court danau unesa terasa tidak aman.",
  //   "Kondisi tempat duduk di food court sangat jelek.",
  //   "Listrik di food court danau unesa sering bergoyang.",
  //   "Saya khawatir dengan keamanan di danau unesa ketintang.",
  //   "Sampah berserakan di food court danau unesa ketintang.",
  //   "Kursi di food court danau unesa sangat tidak nyaman.",
  //   "Lampu di food court danau unesa berkedip-kedip.",
  //   "Kursi di food court danau unesa kurang terawat.",
  //   "Saya merasa gelap di sekitar danau unesa ketintang.",
  //   "Tempat sampah di food court danau unesa penuh.",
  //   "Listrik di food court danau unesa sangat lemah.",
  //   "Kursi di food court danau unesa sudah sangat usang.",
  // ];

  const {
    data: dataLaporan,
    isLoading,
    isError,
  } = useQuery({
    queryKey: "laporan",
    queryFn: fetchLaporan,
  });

  const { mutate, isLoading: loadingStatusLaporan } = useMutation({
    mutationFn: ubahStatusLaporan,
    onSuccess: () => {
      toast.success("Berhasil mengubah status laporan", {
        autoClose: 2000,
        onClose: () => {
          window.location.reload();
        },
      });
    },
  });

  const columns = [
    {
      name: "Judul Laporan",
      selector: (row) => row.judul,
      sortable: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.deskripsi,
      sortable: true,
    },
    {
      name: "Lokasi",
      selector: (row) => row.lokasi,
      sortable: true,
    },
    {
      name: "Fakultas",
      selector: (row) => row.fakultas,
      sortable: true,
    },
    {
      name: "Jurusan",
      selector: (row) => row.Jurusan,
      sortable: true,
    },
    // {
    //   name: "Gambar",
    //   selector: (row) => row.gambar,
    // },
    // {
    //   name: "aksi",
    //   selector: (row) => row.aksi,
    // },
  ];

  const [data, setData] = useState([]);
  const [dataModal, setDataModal] = useState({});
  const [openModal, setOpenModal] = useState(false);
  const [statusLaporan, setStatusLaporan] = useState("");

  const ubahDataLaporan = async () => {
    // console.log(dataModal)
    if (statusLaporan === "") {
      alert("pilih status");
      return;
    }
    const idLaporan = dataModal._id;
    // console.log({ statusCluster, idLaporan });
    await mutate({
      status: statusLaporan,
      id: idLaporan,
    });
  };

  // console.log(dataModal);
  useEffect(() => {
    if (dataLaporan) {
      console.log({
        dataLaporan,
      });
      const dataMapped = dataLaporan.data.map((item, index) => ({
        id: index + 1,
        _id: item.id,
        user_id: item.user_data.id,
        judul: item.judul,
        deskripsi: item.deskripsi,
        lokasi: item.lokasi,
        fakultas: item.fakultas,
        Jurusan: item.jurusan,
        gambar: item.gambar,
        status: item.status,
        aksi: (
          <div className="flex space-x-2">
            {/* <button className="bg-primary text-white p-2 rounded-md">
              Terima
            </button> */}
            <button className="bg-primary text-white p-2 rounded-md">
              Edit Laporan
            </button>
          </div>
        ),
      }));

      setData(dataMapped);
    }
  }, [dataLaporan]);

  // const data = []

  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);
  const [filterText, setFilterText] = useState("");
  // const filteredItems = data.filter(
  //   (item) =>
  //     item.judul && item.judul.toLowerCase().includes(filterText.toLowerCase())
  // );

  const filteredItems = data.filter((item) => {
    const lowerCaseFilter = filterText.toLowerCase();

    return (
      item.judul.toLowerCase().includes(lowerCaseFilter) ||
      (item.deskripsi &&
        item.deskripsi.toLowerCase().includes(lowerCaseFilter)) ||
      (item.lokasi && item.lokasi.toLowerCase().includes(lowerCaseFilter)) ||
      (item.fakultas &&
        item.fakultas.toLowerCase().includes(lowerCaseFilter)) ||
      (item.Jurusan && item.Jurusan.toLowerCase().includes(lowerCaseFilter))
    );
  });

  const inputRef = useRef(null);

  useEffect(() => {
    // Set focus to the input element after each render
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [filterText]);

  const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
      <input
        className="border rounded-md px-2 py-1 mr-2"
        id="search"
        type="text"
        placeholder="Cari Data"
        value={filterText}
        onChange={onFilter}
        ref={inputRef}
      />
      <button
        className="bg-red-500 text-white rounded-md px-2 py-1"
        type="button"
        onClick={onClear}
      >
        X
      </button>
    </>
  );

  const subHeaderComponentMemo = useMemo(() => {
    const handleClear = () => {
      if (filterText) {
        setResetPaginationToggle(!resetPaginationToggle);
        setFilterText("");
      }
    };

    return (
      <FilterComponent
        key={"filter-component"}
        onFilter={(e) => {
          setFilterText(e.target.value);
        }}
        onClear={handleClear}
        filterText={filterText}
      />
    );
  }, [filterText, resetPaginationToggle]);

  return (
    <div className="text-primary space-y-10">
      {isLoading && <Loading />}
      {isError && (
        <div>
          <h1>Terjadi Kesalahan</h1>
        </div>
      )}
      <h1 className="font-semibold text-3xl">Laporan Masuk </h1>
      <DataTable
        // title="Laporan Masuk"
        columns={columns}
        data={filteredItems}
        highlightOnHover
        striped
        pagination
        paginationResetDefaultPage={resetPaginationToggle}
        onRowClicked={(row) => {
          setDataModal(row);
          setOpenModal(true);
        }}
        subHeader
        subHeaderComponent={subHeaderComponentMemo}
        noDataComponent="Belum Ada Laporan Masuk"
        // selectableRows
        persistTableHead
        customStyles={{
          headRow: {
            style: {
              fontSize: "1.2rem",
            },
          },
          cells: {
            style: {
              fontSize: "0.8rem",
            },
          },
        }}
      />

      {/* MODAL */}
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        {loadingStatusLaporan && <Loading />}
        <Modal.Header>{dataModal.judul}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {dataModal.gambar && dataModal.gambar.length > 0 ? (
              <div className="h-56 sm:h-64 xl:h-80 2xl:h-96">
                <Carousel>
                  {dataModal.gambar.map((gambar, index) => (
                    <img
                      src={gambar}
                      alt=""
                      key={index}
                      className="object-contain w-full"
                    />
                  ))}
                </Carousel>
              </div>
            ) : (
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Tidak ada gambar
              </p>
            )}

            <div className="float-end">
              <button
                className="bg-primary hover:bg-primary-hover p-2 rounded-lg text-white flex items-center gap-2"
                onClick={() =>
                  (window.location.href = `/admin/chat/${dataModal._id}/${dataModal.user_id}`)
                }
              >
                Chat Pelapor{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 0 1 .865-.501 48.172 48.172 0 0 0 3.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z"
                  />
                </svg>
              </button>
            </div>

            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Lokasi : {dataModal.lokasi}
            </p>
            {/* fakultas, jurusan */}
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Fakultas : {dataModal.fakultas}
            </p>
            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Jurusan : {dataModal.Jurusan}
            </p>

            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Deskripsi : {dataModal.deskripsi}
            </p>

            <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
              Status : {dataModal.status}
            </p>
          </div>

          <div className="space-y-2 mt-10">
            {/*  */}
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ubah Status Laporan
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setStatusLaporan(e.target.value)}
            >
              <option selected value="">
                pilih
              </option>
              <option value="diajukan">diajukan</option>
              <option value="diproses">diproses</option>
              <option value="selesai">selesai</option>
              <option value="ditolak">ditolak</option>
            </select>

            <button
              onClick={() => ubahDataLaporan()}
              className="p-2 px-3 rounded-lg border-2 border-primary "
            >
              Ubah Status Laporan
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setOpenModal(false)}
            className="p-2 px-3 rounded-lg bg-primary hover:bg-primary-hover text-white"
          >
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default LaporanMasuk;
