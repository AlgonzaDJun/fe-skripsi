/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import { faker } from "@faker-js/faker";
// import { useState } from "react";
// import { useEffect } from "react";
import checkMobileScreen from "../../utils/checkMobileScreen";
import DataTable from "react-data-table-component";
import ExpandedComponent from "../../components/admin/ExpandableComponent";
import { useState } from "react";
import Swal from "sweetalert2";
import { useMutation, useQuery } from "react-query";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Modal } from "flowbite-react";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const fetchClusteringLaporan = async (jml) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_LOCAL
    }/laporan/cluster?jumlah_cluster=${jml}`
  );
  const data = await response.json();
  return data;
};

const fetchShilouetteScore = async (jml) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_LOCAL
    }/laporan/shilouette-score?jumlah_cluster=${jml}`
  );
  const data = await response.json();
  return data;
};

const editDataCluster = async ({ status, array_id }) => {
  const response = await fetch(
    `${
      import.meta.env.VITE_BACKEND_LOCAL
    }/laporan/edit-many?new_status=${status}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(array_id),
    }
  );
  const data = await response.json();
  return data;
};

const PerangkinganLaporan = () => {
  const isMobile = checkMobileScreen();

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Data Perangkingan Laporan",
        font: {
          size: 25,
        },
      },
    },
  };

  const [jumlahCluster, setJumlahCluster] = useState(5);
  const [jumlahClusterSilhouette, setJumlahClusterSilhouette] = useState(10);

  const {
    data: dataClusterLap,
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryFn: () => fetchClusteringLaporan(jumlahCluster),
    queryKey: ["clusteringLaporan", jumlahCluster],
  });

  const handleChangeJmlCluster = (e) => {
    // if e target value is not a number, return
    if (isNaN(e.target.value)) return;

    if (e.target.value < 1) return;
    setJumlahCluster(e.target.value);
  };

  const handleChangeJmlClusterSilhouette = (e) => {
    if (isNaN(e.target.value)) return;
    if (e.target.value < 1) return;
    setJumlahClusterSilhouette(e.target.value);
    refetchSilhoutte({
      jumlahCluster: e.target.value,
    });
  };

  const submitJmlCluster = async () => {
    refetch({
      jumlahCluster: jumlahCluster,
    });
  };

  const { data: dataShilouetteScore, refetch: refetchSilhoutte } = useQuery({
    queryFn: () => fetchShilouetteScore(jumlahClusterSilhouette),
    queryKey: ["shilouetteScore", jumlahClusterSilhouette],
  });

  const { mutate, isLoading: loadingEdit } = useMutation({
    mutationFn: editDataCluster,
    mutationKey: "EditDataCluster",
    onSuccess: () => {
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data berhasil diubah",
      });
      setOpenModal(false);
      refetch();
    },
  });

  const labels = [
    "Cluster 1",
    "Cluster 2",
    "Cluster 3",
    "Cluster 4",
    "Cluster 5",
    "Cluster 6",
    "Cluster 7",
  ];

  const [data, setData] = useState({
    labels,
    datasets: [
      {
        label: "Cluster Laporan",
        data: [500, 400, 300, 200, 100, 50, 30],
        backgroundColor: "#FFA447",
      },
    ],
  });

  // const data = {
  //   labels,
  //   datasets: [
  //     {
  //       label: "Cluster Laporan",
  //       data: [500, 400, 300, 200, 100, 50, 30],
  //       backgroundColor: "#FFA447",
  //     },
  //   ],
  // };

  // console.log({
  //   dataShilouetteScore
  // })

  const columns = [
    {
      name: "Peringkat",
      selector: (row) => row.peringkat,
      sortable: true,
      conditionalCellStyles: [
        {
          when: (row) => row.peringkat === 1,
          style: {
            background:
              "linear-gradient(to right, #BF953F, #FCF6BA, #B38728, #FBF5B7, #AA771C)",
          },
        },
        {
          when: (row) => row.peringkat === 2,
          style: {
            background:
              "linear-gradient(83deg, rgba(232,232,232,1) 0%, rgba(162,162,162,1) 58%, rgba(219,219,219,1) 100%)",
          },
        },
        {
          when: (row) => row.peringkat === 3,
          style: {
            background:
              "linear-gradient(83deg, rgba(151,78,39,1) 0%, rgba(216,124,77,1) 52%, rgba(161,79,41,1) 100%)",
          },
        },
      ],
    },
    {
      name: "Nama Cluster",
      selector: (row) => row.deskripsi,
      sortable: true,
    },
    {
      name: "Jumlah Anggota",
      selector: (row) => row.jumlah,
      sortable: true,
    },
    {
      name: "Aksi",
      selector: (row) => row.aksi,
      cell: (row) => (
        <button
          className="bg-primary text-white p-2 rounded-md"
          onClick={() => editCluster(row)}
        >
          Edit {row.deskripsi}
        </button>
      ),
    },
  ];

  const [dataModal, setDataModal] = useState({});
  const [statusCluster, setStatusCluster] = useState("");

  const editCluster = (row) => {
    setDataModal(row);
    setOpenModal(true);
  };

  const ubahDataCluster = async () => {
    if (statusCluster === "") {
      alert("pilih status");
      return;
    }
    const idLaporan = dataModal.sentences.map((item) => item.id_laporan);
    // console.log({ statusCluster, idLaporan });
    await mutate(
      {
        status: statusCluster,
        array_id: idLaporan,
      },
      // {
      //   onSuccess: () => {
      //     // setOpenModal(false);
      //     Swal.fire({
      //       icon: "success",
      //       title: "Berhasil",
      //       text: "Data berhasil diubah",
      //     });
      //   },
      // }
    );
  };

  const [dataCluster, setDataCluster] = useState([
    {
      peringkat: 1,
      deskripsi: "Cluster 1",
      jumlah: 0,
    },
    {
      peringkat: 2,
      deskripsi: "Cluster 2",
      jumlah: 0,
    },
    {
      peringkat: 3,
      deskripsi: "Cluster 3",
      jumlah: 0,
    },
    {
      peringkat: 4,
      deskripsi: "Cluster 4",
      jumlah: 0,
    },
    {
      peringkat: 5,
      deskripsi: "Cluster 5",
      jumlah: 0,
    },
    {
      peringkat: 6,
      deskripsi: "Cluster 6",
      jumlah: 0,
    },
    {
      peringkat: 7,
      deskripsi: "Cluster 7",
      jumlah: 0,
    },
  ]);

  useEffect(() => {
    if (dataClusterLap) {
      // setDataCluster(dataClusterLap);
      const newData = dataClusterLap.data.map((item, index) => ({
        peringkat: index + 1,
        deskripsi: "cluster " + item.cluster_id,
        jumlah: item.jumlah_anggota,
        sentences: item.sentences,
        most_common_words: item.most_common_words,
        not_clean_sentence_string: item.not_clean_sentence_string,
      }));

      setData({
        labels: newData.map((item) => item.deskripsi),
        datasets: [
          {
            label: "Cluster Laporan",
            data: newData.map((item) => item.jumlah),
            backgroundColor: "#FFA447",
          },
        ],
      });

      setDataCluster(newData);
    }
  }, [dataClusterLap]);

  // console.log(dataShilouetteScore);
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="relative ">
      {isLoading && <Loading />}
      {loadingEdit && <Loading />}
      {isError && <ToastContainer />}
      <h1 className="text-3xl font-semibold mb-11 text-primary hover:text-primary-hover">
        Fitur Shilouette Score
      </h1>
      <div className="flex items-center gap-4">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Jumlah Maksimal Cluster
        </label>
        <input
          type="text"
          onChange={handleChangeJmlClusterSilhouette}
          className=" text-gray-800 p-1 rounded-md border-2 border-gray-300"
        />

        {/* <button
          onClick={submitJmlCluster}
          className="p-2 px-3 rounded-lg border-2 border-primary "
        >
          Submit
        </button> */}
      </div>
      {dataShilouetteScore && (
        <Line
          data={dataShilouetteScore.data}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
              title: {
                display: true,
                text: "Data Shilouette Score",
                font: {
                  size: 25,
                },
              },
            },
          }}
          height={isMobile ? 500 : ""}
        />
      )}

      <h1 className="text-3xl font-semibold mb-11 text-primary hover:text-primary-hover mt-10">
        Fitur Perangkingan Laporan
      </h1>
      {/* Jumlah cluster */}
      <div className="flex items-center gap-4">
        <label
          htmlFor="countries"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Jumlah Cluster
        </label>
        <input
          type="text"
          onChange={handleChangeJmlCluster}
          className=" text-gray-800 p-1 rounded-md border-2 border-gray-300"
        />

        {/* <button
          onClick={submitJmlCluster}
          className="p-2 px-3 rounded-lg border-2 border-primary "
        >
          Submit
        </button> */}
      </div>

      {/* <select
        onChange={handleChangeJmlCluster}
        id="countries"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select> */}

      <Bar options={options} data={data} height={isMobile ? 500 : ""} />

      <hr className="my-8" />

      <DataTable
        // title="Laporan Masuk"
        columns={columns}
        data={dataCluster}
        highlightOnHover
        striped
        pagination
        expandOnRowClicked
        expandableRows
        expandableRowsComponent={ExpandedComponent}
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

      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>Edit {dataModal.deskripsi}</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            {/*  */}
            <label
              htmlFor="countries"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Ubah Status
            </label>
            <select
              id="countries"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              onChange={(e) => setStatusCluster(e.target.value)}
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
              onClick={() => ubahDataCluster()}
              className="p-2 px-3 rounded-lg border-2 border-primary "
            >
              Ubah Status Cluster
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

export default PerangkinganLaporan;
