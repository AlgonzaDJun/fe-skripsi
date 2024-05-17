/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { Carousel, Modal } from "flowbite-react";
import { useState } from "react";
import DataTable from "react-data-table-component";

const ExpandedComponentEkstraksi = ({ data }) => {
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
    {
      name: "aksi",
      selector: (row) => row.aksi,
    },
  ];

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
  // ];

  const dataNew = data.sentences.map((item) => ({
    judul: item.judul,
    deskripsi: item.sentence,
    lokasi: item.lokasi,
    fakultas: item.fakultas,
    Jurusan: item.jurusan,
    gambar: item.gambar,
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

  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <DataTable
        title="Detail Cluster"
        columns={column}
        data={dataNew}
        onRowClicked={(row) => {
          setDataModal(row);
          setOpenModal(true);
        }}
        highlightOnHover
        striped
        pagination
        paginationPerPage={5}
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

export default ExpandedComponentEkstraksi;
