import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const CardRiwayat = ({
  img = "https://media.istockphoto.com/id/1221371608/id/foto/kamar-mandi-umum.jpg?s=1024x1024&w=is&k=20&c=GDagEU_8NzMiBF2HSVZ0OxOS_e3N-rDZ75q0yfKeRNc=",
  judul,
  lokasi,
  deskripsi,
  fakultas,
  id,
}) => {
  // FUNGSI POTONG DESKRIPSI
  const potongKalimat = (kalimat) => {
    if (kalimat.length > 30) {
      return kalimat.substring(0, 30) + "...";
    }
    return kalimat;
  };

  return (
    <div className="relative flex w-full md:max-w-[16rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
      <div className="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40 h-44">
        <img src={img} alt="ui/ux review check" />
        <div className="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60"></div>
      </div>
      <div className="p-4 pb-0">
        <div className="flex items-center justify-between mb-3 gap-3">
          <h5 className="block font-sans text-sm antialiased font-medium leading-snug tracking-normal text-blue-gray-900 grow">
            {judul}
          </h5>
          <p className="flex items-center font-sans text-xs font-semibold leading-relaxed text-blue-gray-900 antialiased">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-8 h-8"
              viewBox="0 0 24 24"
            >
              <path
                fill="currentColor"
                d="M12 11.5A2.5 2.5 0 0 1 9.5 9A2.5 2.5 0 0 1 12 6.5A2.5 2.5 0 0 1 14.5 9a2.5 2.5 0 0 1-2.5 2.5M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7"
              />
            </svg>
            {lokasi}
          </p>
        </div>
        <p className="block font-sans text-xs antialiased font-light leading-relaxed text-gray-700">
          {potongKalimat(deskripsi)}
        </p>
        <div className="inline-flex flex-wrap items-center gap-3 mt-3 group">
          <span className="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 py-1 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
            {fakultas}
          </span>
        </div>
      </div>
      <div className="p-4 space-y-2">
        <Link to={`/laporan/${id}`}>
          <button
            className="block w-full select-none rounded-lg bg-primary py-2.5 px-2 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button"
          >
            Lihat Detail
          </button>
        </Link>
        {/* <button
          disabled
          className="block w-full select-none rounded-lg bg-primary py-2.5 px-2 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
        >
          Beri Rating
        </button> */}
      </div>
    </div>
  );
};

export default CardRiwayat;
