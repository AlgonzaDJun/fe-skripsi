/* eslint-disable no-unused-vars */
// import React from 'react'

import { useState } from "react";
import DataTable from "react-data-table-component";
import ExpandedComponentEkstraksi from "../../components/admin/ExpandableComponentEkstraksi";
import { useQuery } from "react-query";
import { useEffect } from "react";
import Loading from "../../components/Loading";
import { Accordion } from "flowbite-react";
import Swal from "sweetalert2";

const fetchInformasiEkstraksi = async (jml) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/laporan/ner?jumlah_cluster=${jml}`
  );
  const data = await response.json();
  return data;
};

const InformasiEkstraksi = () => {
  const [jumlahCluster, setJumlahCluster] = useState(5);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["informasi-ekstraksi", jumlahCluster],
    queryFn: () => fetchInformasiEkstraksi(jumlahCluster),
  });

  const handleChangeJmlCluster = (e) => {
    if (isNaN(e.target.value)) return;
    if (e.target.value < 1) return;
    setJumlahCluster(e.target.value);
    refetch({
      jumlahCluster: e.target.value,
    });
  };

  const columns = [
    {
      name: "Peringkat",
      selector: (row) => row.peringkat,
      sortable: true,
    },
    {
      name: "Nama Cluster",
      selector: (row) => row.deskripsi,
      sortable: true,
    },
    {
      name: "Informasi Laporan",
      selector: (row) => (
        <ul className="space-y-4 text-left text-gray-500 dark:text-gray-400 my-4">
          {row.informasi.map((info, index) => (
            <li
              key={index}
              className="flex items-center space-x-3 rtl:space-x-reverse"
            >
              <svg
                className="flex-shrink-0 w-3.5 h-3.5 text-green-500 dark:text-green-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 16 12"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5.917 5.724 10.5 15 1.5"
                />
              </svg>
              <span>{info}</span>
            </li>
          ))}
        </ul>
      ),
      sortable: true,
    },
    // {
    //   name: "Aksi",
    //   selector: (row) => row.aksi,
    //   cell: (row) => (
    //     <button className="bg-primary text-white p-2 rounded-md">
    //       Hapus {row.deskripsi}
    //     </button>
    //   ),
    // },
  ];

  const [dataCluster, setDataCluster] = useState([
    {
      peringkat: 1,
      deskripsi: "Cluster 1",
      informasi: [
        "informasi 1",
        "informasi 2",
        "informasi 3",
        "informasi 4",
        "informasi 5",
      ],
    },
    {
      peringkat: 2,
      deskripsi: "Cluster 2",
      informasi: [
        "informasi 1",
        "informasi 2",
        "informasi 3",
        "informasi 4",
        "informasi 5",
      ],
    },
    {
      peringkat: 3,
      deskripsi: "Cluster 3",
      informasi: [
        "informasi 1",
        "informasi 2",
        "informasi 3",
        "informasi 4",
        "informasi 5",
      ],
    },
    {
      peringkat: 4,
      deskripsi: "Cluster 4",
      informasi: [
        "informasi 1",
        "informasi 2",
        "informasi 3",
        "informasi 4",
        "informasi 5",
      ],
    },
    {
      peringkat: 5,
      deskripsi: "Cluster 5",
      informasi: [
        "informasi 1",
        "informasi 2",
        "informasi 3",
        "informasi 4",
        "informasi 5",
      ],
    },
  ]);

  useEffect(() => {
    console.log(data);
    if (data && data.data) {
      const dataMapped = data.data.map((item, index) => {
        const informasiNER = item.NER.map(
          (item) => item.entity_group + " : " + item.word
        );

        const informasiNER_TRANS = item.NER_TRANS.entities.map(
          (item) => item.label + " : " + item.text
        );

        const informasiGabungan = informasiNER.concat(informasiNER_TRANS);

        return {
          peringkat: index + 1,
          deskripsi: "Cluster " + item.cluster_id,
          informasi: informasiGabungan,
          sentences: item.sentences,
        };
      });

      setDataCluster(dataMapped);
      //   {
      //     "detail": "Error: The read operation timed out"
      // }
    } else if (data && data.detail) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "terjadi error silakan coba lagi",
      }).then(() => {
        // refetch();
        window.location.reload();
      });
    }

    // return () => {
    //   refetch({ cancelRefetch: true });
    // };
  }, [data]);

  return (
    <div className="relative">
      <h1 className="text-3xl font-semibold mb-11 text-primary hover:text-primary-hover">
        Fitur Ekstraksi Informasi
      </h1>

      <Accordion collapseAll className="my-8">
        <Accordion.Panel>
          <Accordion.Title>
            <div className="flex justify-center items-center space-x-4">
              <div className="flex items-center">
                <div className="h-4 w-4 bg-green-500 rounded-full mr-2"></div>
                <div>GPE : geopolitical entities</div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-blue-500 rounded-full mr-2"></div>
                <div>LOC : location</div>
              </div>
              {/* FAC : FACILITY */}
              <div className="flex items-center">
                <div className="h-4 w-4 bg-yellow-500 rounded-full mr-2"></div>
                <div>ORG : organization</div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-red-500 rounded-full mr-2"></div>
                <div>PER : person</div>
              </div>
              <div className="flex items-center">
                <div className="h-4 w-4 bg-purple-500 rounded-full mr-2"></div>
                <div>OTH : other</div>
              </div>
              {/* FAC */}
              <div className="flex items-center">
                <div className="h-4 w-4 bg-pink-500 rounded-full mr-2"></div>
                <div>FAC : FACILIT</div>
              </div>
            </div>
          </Accordion.Title>
          <Accordion.Content>
            <table className="table-auto">
              <thead>
                <tr>
                  <th className="px-4 py-2">Label Entity</th>
                  <th className="px-4 py-2">Description</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border px-4 py-2">PERSON</td>
                  <td className="border px-4 py-2">
                    People, including fictional characters
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">NORP</td>
                  <td className="border px-4 py-2">
                    Nationalities or religious or political groups
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">FAC</td>
                  <td className="border px-4 py-2">
                    Buildings, airports, highways, bridges, etc.
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">ORG</td>
                  <td className="border px-4 py-2">
                    Companies, agencies, institutions
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">GPE</td>
                  <td className="border px-4 py-2">
                    Countries, cities, states
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">LOC</td>
                  <td className="border px-4 py-2">
                    Non-GPE locations, mountain ranges, bodies of water
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">PRODUCT</td>
                  <td className="border px-4 py-2">
                    Objects, vehicles, foods, etc. (Not services)
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">EVENT</td>
                  <td className="border px-4 py-2">
                    Named hurricanes, battles, wars, sports events, etc.
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">WORK_OF_ART</td>
                  <td className="border px-4 py-2">
                    Titles of books, songs, etc.
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">LAW</td>
                  <td className="border px-4 py-2">
                    Named documents made into laws
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">LANGUAGE</td>
                  <td className="border px-4 py-2">Any named language</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">DATE</td>
                  <td className="border px-4 py-2">
                    Absolute or relative dates or periods
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">TIME</td>
                  <td className="border px-4 py-2">Times smaller than a day</td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">PERCENT</td>
                  <td className="border px-4 py-2">
                    Percentage, including &quot;%&quot;
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">MONEY</td>
                  <td className="border px-4 py-2">
                    Monetary values, including unit
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">QUANTITY</td>
                  <td className="border px-4 py-2">
                    Measurements, as of weight or distance
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">ORDINAL</td>
                  <td className="border px-4 py-2">
                    &quot; first&quot;, &quot;second&quot;, etc.
                  </td>
                </tr>
                <tr>
                  <td className="border px-4 py-2">CARDINAL</td>
                  <td className="border px-4 py-2">
                    Numerals that do not fall under another type
                  </td>
                </tr>
              </tbody>
            </table>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>

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

      {isLoading && <Loading />}

      <DataTable
        // title="Informasi yang berhasil di ekstraksi"
        columns={columns}
        data={dataCluster}
        highlightOnHover
        striped
        pagination
        expandOnRowClicked
        expandableRows
        expandableRowsComponent={ExpandedComponentEkstraksi}
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
    </div>
  );
};

export default InformasiEkstraksi;
