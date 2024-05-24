/* eslint-disable no-unused-vars */
import { Label } from "flowbite-react";
import { useState } from "react";
import { useMutation, useQuery } from "react-query";
import Select from "react-select";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "../Loading";
import { useEffect } from "react";

const MAX_COUNT = 5;

const postLaporan = async (data) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/laporan`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );
  return response.json();
};

const getUserData = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/auth/${id}`
  );
  return response.json();
};

const FormLaporan = () => {
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [fileLimit, setFileLimit] = useState(false);

  const getBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const [dataSubmit, setDataSubmit] = useState({
    user_id: localStorage.getItem("id"),
    judul: "",
    lokasi: "",
    fakultas: "0",
    jurusan: "",
    deskripsi: "",
    gambar: [],
  });

  const resetDataSubmit = () => {
    setDataSubmit({
      user_id: localStorage.getItem("id"),
      judul: "",
      lokasi: "",
      fakultas: "",
      jurusan: "",
      deskripsi: "",
      gambar: [],
    });
    setUploadedFiles([]);
  };

  const { mutate, isLoading } = useMutation({
    mutationFn: postLaporan,
    mutationKey: "laporan",
  });

  const handleChange = (e) => {
    setDataSubmit({ ...dataSubmit, [e.target.name]: e.target.value });
  };

  const { data: dataUser } = useQuery({
    queryFn: () => getUserData(localStorage.getItem("id")),
    queryKey: "user",
  });

  useEffect(() => {
    if (dataUser && dataUser.data) {
      setDataSubmit((prev) => ({
        ...prev,
        fakultas: dataUser.data.fakultas,
        jurusan: dataUser.data.prodi,
      }));
      // console.log(dataUser.data)
    }
  }, dataUser);

  // console.log(dataSubmit)

  const handleSubmit = async (e) => {
    if (localStorage.getItem("id") === null) {
      toast.error("Anda harus login terlebih dahulu");
      return;
    }

    // check if datasubmit.deskripsi is less than 7 words
    if (dataSubmit.deskripsi.split(" ").length < 7) {
      toast.error("Tolong perbanyak deskripsi laporan anda");
      return;
    }

    // check apakah ada salah satu field yang kosong
    for (const key in dataSubmit) {
      if (dataSubmit[key] === "") {
        toast.error("Semua field harus diisi");
        return;
      }
    }

    e.preventDefault();

    const gambarBase64Promises = uploadedFiles.map((file) => getBase64(file));

    const gambarBase64 = await Promise.all(gambarBase64Promises);
    console.log(gambarBase64);

    const data = {
      ...dataSubmit,
      gambar: gambarBase64,
    };

    mutate(data, {
      onSuccess: () => {
        toast.success("Laporan berhasil dikirim");
        resetDataSubmit();
      },
      onError: (error) => {
        toast.error("Laporan gagal dikirim : " + error.message);
      },
    });
  };

  const handleUploadFiles = (files) => {
    const uploaded = [...uploadedFiles];
    let limitExceeded = false;
    files.some((file) => {
      if (uploaded.findIndex((f) => f.name === file.name) === -1) {
        uploaded.push(file);
        if (uploaded.length === MAX_COUNT) setFileLimit(true);
        if (uploaded.length > MAX_COUNT) {
          alert(`You can only add a maximum of ${MAX_COUNT} files`);
          setFileLimit(false);
          limitExceeded = true;
          return true;
        }
      }
    });
    if (!limitExceeded) setUploadedFiles(uploaded);
  };

  const handleFileEvent = (e) => {
    const chosenFiles = Array.prototype.slice.call(e.target.files);
    handleUploadFiles(chosenFiles);
  };

  const fakultas = [
    {
      value: "0",
      label: "Pilih Fakultas",
    },
    {
      value: "FAKULTAS ILMU PENDIDIKAN",
      label: "FAKULTAS ILMU PENDIDIKAN",
    },
    {
      value: "FAKULTAS BAHASA DAN SENI",
      label: "FAKULTAS BAHASA DAN SENI",
    },
    { value: "FAKULTAS MIPA", label: "FAKULTAS MIPA" },
    {
      value: "FAKULTAS ILMU SOSIAL dan HUKUM",
      label: "FAKULTAS ILMU SOSIAL dan HUKUM",
    },
    { value: "FAKULTAS TEKNIK", label: "FAKULTAS TEKNIK" },
    {
      value: "FAKULTAS ILMU OLAHRAGA",
      label: "FAKULTAS ILMU OLAHRAGA",
    },
    { value: "FAKULTAS EKONOMI", label: "FAKULTAS EKONOMI" },
    { value: "PASCA SARJANA", label: "PASCA SARJANA" },
  ];

  const jurusan = [
    {
      label: "FAKULTAS ILMU PENDIDIKAN",
      options: [
        { value: "BIMBINGAN dan KONSELING", label: "BIMBINGAN dan KONSELING" },
        { value: "TEKNOLOGI PENDIDIKAN", label: "TEKNOLOGI PENDIDIKAN" },
        { value: "PEND. LUAR SEKOLAH", label: "PEND. LUAR SEKOLAH" },
        { value: "PEND. LUAR BIASA", label: "PEND. LUAR BIASA" },
        { value: "PGSD", label: "PGSD" },
        { value: "PSIKOLOGI", label: "PSIKOLOGI" },
        { value: "PG-PAUD", label: "PG-PAUD" },
        { value: "MANAJEMEN PENDIDIKAN", label: "MANAJEMEN PENDIDIKAN" },
      ],
    },
    {
      label: "FAKULTAS BAHASA DAN SENI",
      //       S1 Desain Komunikasi Visual
      // S1 Pendidikan Bahasa Mandarin
      // S1 Seni Musik
      // S1 Seni Rupa
      // S1 Sastra Inggris
      // S1 Pendidikan Bahasa Jerman
      // S1 Pendidikan Seni Rupa
      // S1 Sastra Jerman
      // S1 Pendidikan Bahasa Inggris
      // S1 Pendidikan Bahasa dan Sastra Jawa
      // S1 Pendidikan Bahasa Jepang
      // S1 Sastra Indonesia
      // S1 Pendidikan Bahasa dan Sastra Indonesia
      // S1 Pendidikan Seni Drama, Tari, dan Musik
      // D III Desain Grafis
      // D III Bahasa Inggris
      options: [
        {
          value: "Desain Komunikasi Visual",
          label: "Desain Komunikasi Visual",
        },
        {
          value: "Pendidikan Bahasa Mandarin",
          label: "Pendidikan Bahasa Mandarin",
        },
        { value: "Seni Musik", label: "Seni Musik" },
        { value: "Seni Rupa", label: "Seni Rupa" },
        { value: "Sastra Inggris", label: "Sastra Inggris" },
        {
          value: "Pendidikan Bahasa Jerman",
          label: "Pendidikan Bahasa Jerman",
        },
        {
          value: "Pendidikan Seni Rupa",
          label: "Pendidikan Seni Rupa",
        },
        { value: "Sastra Jerman", label: "Sastra Jerman" },
        {
          value: "Pendidikan Bahasa Inggris",
          label: "Pendidikan Bahasa Inggris",
        },
        {
          value: "Pendidikan Bahasa dan Sastra Jawa",
          label: "Pendidikan Bahasa dan Sastra Jawa",
        },
        {
          value: "Pendidikan Bahasa Jepang",
          label: "Pendidikan Bahasa Jepang",
        },
        { value: "Sastra Indonesia", label: "Sastra Indonesia" },
        {
          value: "Pendidikan Bahasa dan Sastra Indonesia",
          label: "Pendidikan Bahasa dan Sastra Indonesia",
        },
        {
          value: "Pendidikan Seni Drama, Tari, dan Musik",
          label: "Pendidikan Seni Drama, Tari, dan Musik",
        },
        { value: "D III Desain Grafis", label: "D III Desain Grafis" },
        { value: "D III Bahasa Inggris", label: "D III Bahasa Inggris" },
      ],
    },
    {
      label: "FAKULTAS MIPA",
      options: [
        {
          value: "Pendidikan Biologi",
          label: "Pendidikan Biologi",
        },
        {
          value: "Matematika",
          label: "Matematika",
        },
        {
          value: "Pendidikan Kimia",
          label: "Pendidikan Kimia",
        },
        {
          value: "Fisika",
          label: "Fisika",
        },
        {
          value: "Pendidikan Matematika",
          label: "Pendidikan Matematika",
        },
        {
          value: "Biologi",
          label: "Biologi",
        },
        {
          value: "Pendidikan Sains",
          label: "Pendidikan Sains",
        },
        {
          value: "Pendidikan Fisika",
          label: "Pendidikan Fisika",
        },
        {
          value: "Kimia",
          label: "Kimia",
        },
      ],
    },
    {
      label: "FAKULTAS ILMU SOSIAL dan HUKUM",
      options: [
        {
          value: "Ilmu Hukum",
          label: "Ilmu Hukum",
        },
        {
          value: "Pendidikan Sejarah",
          label: "Pendidikan Sejarah",
        },
        {
          value: "Ilmu Administrasi Negara",
          label: "Ilmu Administrasi Negara",
        },
        {
          value: "Pendidikan Pancasila dan Kewarganegaraan",
          label: "Pendidikan Pancasila dan Kewarganegaraan",
        },
        {
          value: "Sosiologi",
          label: "Sosiologi",
        },
        {
          value: "Pendidikan Geografi",
          label: "Pendidikan Geografi",
        },
        {
          value: "Ilmu komunikasi",
          label: "Ilmu komunikasi",
        },
        {
          value: "D III Administrasi Negara",
          label: "D III Administrasi Negara",
        },
      ],
    },
    {
      label: "FAKULTAS TEKNIK",
      //       S1 Teknik Mesin
      // D III Transportasi
      // S1 Teknik Elektro
      // S1 Teknik Sipil
      // S1 Pend. Teknik Elektro
      // DIII Tata Boga
      // S1 Pend Teknik Bangunan
      // S1 Pendidikan Tata Rias
      // S1 Teknik Informatika
      // S1 Sistem Informasi
      // DIII Teknik Mesin
      // DIII Teknik Sipil
      // S1 Pendidikan Teknologi Informasi
      // D III Manajemen Informatika
      // S1 Pendidikan Tata Boga
      // DIII Tata Busana
      // DIII Teknik Listrik
      // S1 Pend Teknik Mesin
      // S1 Pendidikan Tata Busana
      // S1 Pendidikan Kesejahteraan Keluarga
      options: [
        { value: "Teknik Mesin", label: "Teknik Mesin" },
        { value: "Transportasi", label: "Transportasi" },
        { value: "Teknik Elektro", label: "Teknik Elektro" },
        { value: "Teknik Sipil", label: "Teknik Sipil" },
        { value: "Pend. Teknik Elektro", label: "Pend. Teknik Elektro" },
        { value: "Tata Boga", label: "Tata Boga" },
        { value: "Pend Teknik Bangunan", label: "Pend Teknik Bangunan" },
        { value: "Pendidikan Tata Rias", label: "Pendidikan Tata Rias" },
        { value: "Teknik Informatika", label: "Teknik Informatika" },
        { value: "Sistem Informasi", label: "Sistem Informasi" },
        { value: "Teknik Mesin", label: "Teknik Mesin" },
        { value: "Teknik Sipil", label: "Teknik Sipil" },
        {
          value: "Pendidikan Teknologi Informasi",
          label: "Pendidikan Teknologi Informasi",
        },
        {
          value: "Manajemen Informatika",
          label: "Manajemen Informatika",
        },
        { value: "Tata Boga", label: "Tata Boga" },
        { value: "Tata Busana", label: "Tata Busana" },
        { value: "Teknik Listrik", label: "Teknik Listrik" },
        { value: "Pend Teknik Mesin", label: "Pend Teknik Mesin" },
        {
          value: "Pendidikan Tata Busana",
          label: "Pendidikan Tata Busana",
        },
        {
          value: "Pendidikan Kesejahteraan Keluarga",
          label: "Pendidikan Kesejahteraan Keluarga",
        },
      ],
    },
    {
      label: "FAKULTAS ILMU OLAHRAGA",
      options: [
        //         S1 Pendidikan Kepelatihan Olahraga
        // S1 Ilmu Keolahragaan
        // S1 Pend. Jasmani, Kesehatan, dan Rekreasi
        {
          value: "Pendidikan Kepelatihan Olahraga",
          label: "Pendidikan Kepelatihan Olahraga",
        },
        { value: "Ilmu Keolahragaan", label: "Ilmu Keolahragaan" },
        {
          value: "Pend. Jasmani, Kesehatan, dan Rekreasi",
          label: "Pend. Jasmani, Kesehatan, dan Rekreasi",
        },
      ],
    },
    {
      label: "PASCA SARJANA",
      options: [
        //         S2 Pendidikan Luar Biasa
        // S3 Pendidikan Sains
        // S2 Pendidikan Luar Sekolah
        // S2 Pendidikan Teknologi dan Kejuruan
        // S2 Pendidikan IPS
        // S2 Pendidikan Ekonomi
        // S3 Teknologi Pendidikan
        // S3 Manajemen Pendidikan
        // S2 Teknologi Pendidikan
        // S2 Pendidikan Seni Budaya
        // S2 Pendidikan Sains
        // S2 Pendidikan Bahasa dan Sastra
        // S3 Pendidikan Bahasa dan Sastra
        // S3 Ilmu Keolahragaan
        // S2 Pendidikan Olahraga
        // S2 Manajemen Pendidikan
        // S2 Pendidikan Matematika
        // S3 Pendidikan Matematika
        // S2 Pendidikan Dasar
        // S2 Pendidikan Geografi
        // S3 Pendidikan Vokasi
        // S2 Manajemen
        // S2 Bimbingan Konseling
        {
          value: "Pendidikan Luar Biasa",
          label: "Pendidikan Luar Biasa",
        },
        { value: "Pendidikan Sains", label: "Pendidikan Sains" },
        {
          value: "Pendidikan Luar Sekolah",
          label: "Pendidikan Luar Sekolah",
        },
        {
          value: "Pendidikan Teknologi dan Kejuruan",
          label: "Pendidikan Teknologi dan Kejuruan",
        },
        { value: "Pendidikan IPS", label: "Pendidikan IPS" },
        { value: "Pendidikan Ekonomi", label: "Pendidikan Ekonomi" },
        {
          value: "Teknologi Pendidikan",
          label: "Teknologi Pendidikan",
        },
        {
          value: "Manajemen Pendidikan",
          label: "Manajemen Pendidikan",
        },
        {
          value: "Teknologi Pendidikan",
          label: "Teknologi Pendidikan",
        },
        {
          value: "Pendidikan Seni Budaya",
          label: "Pendidikan Seni Budaya",
        },
        { value: "Pendidikan Sains", label: "Pendidikan Sains" },
        {
          value: "Pendidikan Bahasa dan Sastra",
          label: "Pendidikan Bahasa dan Sastra",
        },
        {
          value: "Pendidikan Bahasa dan Sastra",
          label: "Pendidikan Bahasa dan Sastra",
        },
        {
          value: "Ilmu Keolahragaan",
          label: "Ilmu Keolahragaan",
        },
        { value: "Pendidikan Olahraga", label: "Pendidikan Olahraga" },
        {
          value: "Manajemen Pendidikan",
          label: "Manajemen Pendidikan",
        },
        {
          value: "Pendidikan Matematika",
          label: "Pendidikan Matematika",
        },
        {
          value: "Pendidikan Matematika",
          label: "Pendidikan Matematika",
        },
        { value: "Pendidikan Dasar", label: "Pendidikan Dasar" },
        { value: "Pendidikan Geografi", label: "Pendidikan Geografi" },
        { value: "Pendidikan Vokasi", label: "Pendidikan Vokasi" },
        { value: "Manajemen", label: "Manajemen" },
        { value: "Bimbingan Konseling", label: "Bimbingan Konseling" },
      ],
    },
    {
      label: "FAKULTAS EKONOMI",
      options: [
        //         S1 Pendidikan Akuntansi
        // S1 Pendidikan Tata Niaga
        // S1 Pendidikan Administrasi Perkantoran
        // D III Akuntansi
        // S1 Manajemen
        // S1 Pend. Ekonomi
        // S1 Ekonomi Islam
        // S1 Akuntansi
        {
          value: "Pendidikan Akuntansi",
          label: "Pendidikan Akuntansi",
        },
        {
          value: "Pendidikan Tata Niaga",
          label: "Pendidikan Tata Niaga",
        },
        {
          value: "Pendidikan Administrasi Perkantoran",
          label: "Pendidikan Administrasi Perkantoran",
        },
        { value: "D3 Akuntansi", label: "D3 Akuntansi" },
        { value: "Manajemen", label: "Manajemen" },
        { value: "Pend. Ekonomi", label: "Pend. Ekonomi" },
        { value: "Ekonomi Islam", label: "Ekonomi Islam" },
        { value: "S1 Akuntansi", label: "S1 Akuntansi" },
      ],
    },
  ];

  const groupStyles = {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  };
  const groupBadgeStyles = {
    backgroundColor: "#EBECF0",
    borderRadius: "2em",
    color: "#172B4D",
    display: "inline-block",
    fontSize: 12,
    fontWeight: "normal",
    lineHeight: "1",
    minWidth: 1,
    padding: "0.16666666666667em 0.5em",
    textAlign: "center",
  };

  const formatGroupLabel = (data) => (
    <div style={groupStyles}>
      <span>{data.label}</span>
      <span style={groupBadgeStyles}>{data.options.length}</span>
    </div>
  );

  return (
    <form
      action=""
      encType="multipart/form-data"
      className="px-6 py-3 max-w-screen-sm mx-auto w-full rounded-md text-white bg-white shadow-md space-y-4 border mb-10"
    >
      {isLoading && <Loading />}
      <ToastContainer />
      <h1 className="w-full bg-primary p-2 rounded-md">
        Masukkan Laporan Anda
      </h1>

      <input
        type="text"
        placeholder="Judul laporan anda"
        className="w-full border rounded-md p-2 text-black"
        value={dataSubmit.judul}
        onChange={handleChange}
        name="judul"
      />

      <input
        type="text"
        placeholder="Lokasi laporan anda"
        className="w-full border rounded-md p-2 text-black"
        value={dataSubmit.lokasi}
        onChange={handleChange}
        name="lokasi"
      />

      {/* <input
        type="text"
        placeholder="Fakultas anda"
        className="w-full border rounded-md p-2 text-black"
        value={dataSubmit.fakultas}
        onChange={handleChange}
        name="fakultas"
      /> */}
      {/* <div className="">
        <div className="mb-2 block">
          <Label htmlFor="fakultas" value="Fakultas Anda" />
        </div>
        <Select
          id="fakultas"
          required
          name="fakultas"
          className="w-full rounded-md text-black"
          defaultValue={fakultas[0]}
          onChange={(e) => {
            setDataSubmit({ ...dataSubmit, fakultas: e.value });
          }}
          isMulti={false}
          isClearable
          options={fakultas}
        />
      </div> */}

      {/* <input
        type="text"
        placeholder="Jurusan anda"
        className="w-full border rounded-md p-2 text-black"
        value={dataSubmit.jurusan}
        onChange={handleChange}
        name="jurusan"
      /> */}

      {/* <div className="">
        <div className="mb-2 block">
          <Label htmlFor="jurusan" value="Jurusan Anda" />
        </div>
        <Select
          id="jurusan"
          required
          name="jurusan"
          className="w-full rounded-md text-black "
          defaultValue={jurusan[0]}
          onChange={(e) => {
            setDataSubmit({ ...dataSubmit, jurusan: e.value });
          }}
          isMulti={false}
          isClearable
          options={jurusan}
          formatGroupLabel={formatGroupLabel}
        />
      </div> */}

      <textarea
        id=""
        rows="8"
        className="w-full border rounded-md p-2 text-black"
        placeholder="Deskripsi/ isi laporan anda (isi ini selengkap-lengkapnya, lebih panjang lebih baik)"
        value={dataSubmit.deskripsi}
        onChange={handleChange}
        name="deskripsi"
      ></textarea>

      <div className="w-full border flex items-center p-2 rounded-md text-black">
        <label htmlFor="gambar" className="shrink w-full opacity-40">
          Gambar Laporan anda (bisa lebih dari 1)
        </label>
        <input
          type="file"
          id="gambar"
          className=""
          multiple
          onChange={handleFileEvent}
          disabled={fileLimit}
        />
      </div>

      <div className="uploaded-files-list text-black">
        {uploadedFiles.map((file, id) => (
          <div key={id} className="list-item">
            {file.name}
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="p-2 px-3 rounded-lg bg-primary hover:bg-primary-hover"
          type="button"
          onClick={handleSubmit}
        >
          Kirim
        </button>
      </div>
    </form>
  );
};

export default FormLaporan;
