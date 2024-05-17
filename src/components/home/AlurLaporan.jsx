/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
export default function AlurLaporan() {
  const CardAlur = ({ icon, judul, deskripsi, check }) => {
    return (
      <div className="flex flex-col items-center relative min-w-full md:min-w-0 md:w-36">
        <div
          className={`rounded-full p-4 ${check ? "bg-primary" : "bg-gray-200"}`}
        >
          {icon}
        </div>

        <div className="mt-4 text-center">
          <h3 className=" font-semibold">{judul}</h3>
          <p className="text-xs text-gray-600 mt-1">{deskripsi}</p>
        </div>
      </div>
    );
  };

  const Garis = () => {
    return (
      <div className="relative flex-auto flex">
        <div className="flex-grow h-0.5 bg-primary "></div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto overflow-scroll flex justify-between items-center px-4 py-8 relative box-border">
      <CardAlur
        check
        icon={<FileEditIcon className="text-white" />}
        judul={"Tulis Laporan"}
        deskripsi={
          "Laporkan fasilitas kampus yang rusak, hilang, atau bermasalah dengan jelas dan lengkap."
        }
      />

      <Garis />

      <CardAlur
        icon={<RefreshCwIcon className="text-white" />}
        judul={"Proses Verifikasi"}
        deskripsi={
          "Admin akan memverifikasi laporan, menghubungi pelapor melalui chat, dan akan meneruskan kepada pihak berwenang."
        }
      />
      <Garis />
      <CardAlur
        icon={<WorkflowIcon className="text-white" />}
        judul={"Proses Tindak Lanjut"}
        deskripsi={
          "Pihak berwenang akan melakukan tindak lanjut terhadap fasilitas yang dilaporkan."
        }
      />
      <Garis />
      <CardAlur
        icon={<ReplyIcon className="text-white" />}
        judul={"Beri Tanggapan"}
        deskripsi={
          "Anda dapat menanggapi kembali balasan yang diberikan oleh pihak berwenang melalui forum chat."
        }
      />
      <Garis />

      <CardAlur
        icon={<CheckIcon className="text-white" />}
        judul={"Selesai"}
        deskripsi={
          "Laporan Anda akan terus ditindaklanjuti hingga terselesaikan. Setelah itu anda dapat memberikan rating terhadap penanganan yang diberikan."
        }
      />
    </div>
  );
}

function CheckIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function FileEditIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 13.5V4a2 2 0 0 1 2-2h8.5L20 7.5V20a2 2 0 0 1-2 2h-5.5" />
      <polyline points="14 2 14 8 20 8" />
      <path d="M10.42 12.61a2.1 2.1 0 1 1 2.97 2.97L7.95 21 4 22l.99-3.95 5.43-5.44Z" />
    </svg>
  );
}

function RefreshCwIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
      <path d="M8 16H3v5" />
    </svg>
  );
}

function ReplyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="9 17 4 12 9 7" />
      <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
    </svg>
  );
}

function WorkflowIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <path d="M7 11v4a2 2 0 0 0 2 2h4" />
      <rect width="8" height="8" x="13" y="13" rx="2" />
    </svg>
  );
}
