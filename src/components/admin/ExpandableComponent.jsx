/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Button, Carousel, Modal, Spinner } from "flowbite-react";
import { useEffect } from "react";
import { useState } from "react";
import DataTable from "react-data-table-component";
import { useMutation } from "react-query";
import Swal from "sweetalert2";

const fetchSummarizeText = async (text) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/laporan/summarize-text`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    }
  );

  const data = await response.json();
  return data;
};

const ExpandedComponent = ({ data }) => {
  const column = [
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
    {
      name: "Gambar",
      selector: (row) => row.gambar,
    },
    // {
    //   name: "aksi",
    //   selector: (row) => row.aksi,
    // },
  ];

  const {
    mutate,
    data: dataSummarize,
    isSuccess,
    isError,
  } = useMutation({
    mutationFn: fetchSummarizeText,
    mutationKey: "summarizeText",
  });

  const checkData = (data, fungsi) => {
    // console.log(data)
    if (data.detail) {
      fungsi();
    }
  };

  useEffect(() => {
    mutate(data.not_clean_sentence_string, {
      onSuccess: (data) => {
        // if (data.detail) {
        //   Swal.fire({
        //     icon: "error",
        //     title: "Error",
        //     text: "Terjadi kesalahan, silakan coba lagi",
        //   });
        // }
        checkData(data, () => {
          mutate(data.not_clean_sentence_string);
        });
      },
      onError: (error) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      },
      onSettled: (data, error) => {
        console.log({
          onSettled: data,
          error,
        });
      },
    });
  }, []);

  // console.log(data.not_clean_sentence_stringr)

  // const [dataNew, setDataNew] = useState([
  //   {
  //     judul: "Laporan 1",
  //     deskripsi: "Deskripsi Laporan 1",
  //     lokasi: "Lokasi Laporan 1",
  //     fakultas: "Fakultas Laporan 1",
  //     Jurusan: "Jurusan Laporan 1",
  //     gambar: "Gambar Laporan 1",
  //     aksi: "Aksi Laporan 1",
  //   },
  //   {
  //     judul: "Laporan 2",
  //     deskripsi: "Deskripsi Laporan 2",
  //     lokasi: "Lokasi Laporan 2",
  //     fakultas: "Fakultas Laporan 2",
  //     Jurusan: "Jurusan Laporan 2",
  //     gambar: "Gambar Laporan 2",
  //     aksi: "Aksi Laporan 2",
  //   },
  //   {
  //     judul: "Laporan 3",
  //     deskripsi: "Deskripsi Laporan 3",
  //     lokasi: "Lokasi Laporan 3",
  //     fakultas: "Fakultas Laporan 3",
  //     Jurusan: "Jurusan Laporan 3",
  //     gambar: "Gambar Laporan 3",
  //     aksi: "Aksi Laporan 3",
  //   },
  // ]);

  // console.log(data)

  const dataNew = data.sentences.map((item) => ({
    judul: item.judul,
    deskripsi: item.sentence,
    lokasi: item.lokasi,
    fakultas: item.fakultas,
    Jurusan: item.jurusan,
    gambar: item.gambar,
    status: item.status,
  }));

  const [dataModal, setDataModal] = useState({
    judul: "",
    deskripsi: "",
    lokasi: "",
    fakultas: "",
    Jurusan: "",
    gambar: "",
    aksi: "",
  });

  // const dataNew = [
  //   {
  //     judul: "Laporan 1",
  //     deskripsi: "Deskripsi Laporan 1",
  //     lokasi: "Lokasi Laporan 1",
  //     fakultas: "Fakultas Laporan 1",
  //     Jurusan: "Jurusan Laporan 1",
  //     gambar: "Gambar Laporan 1",
  //     aksi: "Aksi Laporan 1",
  //   },
  //   {
  //     judul: "Laporan 2",
  //     deskripsi: "Deskripsi Laporan 2",
  //     lokasi: "Lokasi Laporan 2",
  //     fakultas: "Fakultas Laporan 2",
  //     Jurusan: "Jurusan Laporan 2",
  //     gambar: "Gambar Laporan 2",
  //     aksi: "Aksi Laporan 2",
  //   },
  //   {
  //     judul: "Laporan 3",
  //     deskripsi: "Deskripsi Laporan 3",
  //     lokasi: "Lokasi Laporan 3",
  //     fakultas: "Fakultas Laporan 3",
  //     Jurusan: "Jurusan Laporan 3",
  //     gambar: "Gambar Laporan 3",
  //     aksi: "Aksi Laporan 3",
  //   },
  // ];

  const [openModal, setOpenModal] = useState(false);

  // console.log(dataSummarize);
  // console.log({
  //   isError,
  // });

  return (
    <>
      {/* <h1>
        <span className="text-primary ">Kata Paling sering keluar: </span>
        {data.most_common_words.join(", ")}
      </h1> */}

      <h1>
        <span className="text-primary ">Hasil Ringkasan cluster: </span>
        {/* {data.summarize_text} */}
        {dataSummarize ? (
          dataSummarize.data
        ) : (
          <>
            <Spinner />
            <span className="pl-3">Loading...</span>
          </>
        )}
        {isError && <p>Terjadi Kesalahan, silakan ulangi</p>}
      </h1>
      <DataTable
        title="Detail Cluster"
        columns={column}
        data={dataNew}
        highlightOnHover
        striped
        onRowClicked={(row) => {
          setDataModal(row);
          setOpenModal(true);
        }}
      />

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>{dataModal.judul}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {dataModal.gambar && dataModal.gambar.length > 0 ? (
              <div className="h-56 sm:h-64 xl:h-64">
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
    </>
  );
  // return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default ExpandedComponent;
