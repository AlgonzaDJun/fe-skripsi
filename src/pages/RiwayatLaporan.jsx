import { useQuery } from "react-query";
import CardRiwayat from "../components/riwayat/CardRiwayat";

const fetchLaporanByUser = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/laporan/user/${id}`
  );
  const data = await response.json();
  return data;
};

const RiwayatLaporan = () => {
  const user_id = localStorage.getItem("id");

  const { data } = useQuery({
    queryFn: () => fetchLaporanByUser(user_id),
    queryKey: "laporanByUser",
    refetchInterval: 3000,
  });


  return (
    <div className="min-h-screen box-border m-5 mb-52">
      <h1 className="font-semibold text-2xl text-gray-800">
        Riwayat Laporan Anda
      </h1>
      <hr />
      <div className="mt-5 flex gap-4 flex-wrap md:justify-center lg:justify-start">
        {/* <p className="text-gray-800">
          Anda belum pernah melaporkan fasilitas apapun.
        </p> */}

        {data && user_id ? (
          data.data.map((item) => (
            <CardRiwayat
              key={item.id}
              judul={item.judul}
              lokasi={item.lokasi}
              deskripsi={item.deskripsi}
              fakultas={item.fakultas}
              id={item.id}
              img={item.gambar[0]}
            />
          ))
        ) : (
          <p className="text-gray-800">
            Anda belum pernah melaporkan fasilitas apapun.
          </p>
        )}

        {/* <CardRiwayat
          judul={"Sampah Menumpuk di gedung bca dekat kantin"}
          lokasi={"Gedung BCA"}
          deskripsi={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt, fuga nam amet consequuntur, vero dolor dignissimos error quidem, est accusamus saepe beatae maxime eaque earum maiores hic. Nemo, veritatis!"
          }
          fakultas={"Fakultas Teknik"}
        />
        <CardRiwayat
          judul={"Sampah Menumpuk di gedung bca dekat kantin"}
          lokasi={"Gedung BCA"}
          deskripsi={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt, fuga nam amet consequuntur, vero dolor dignissimos error quidem, est accusamus saepe beatae maxime eaque earum maiores hic. Nemo, veritatis!"
          }
          fakultas={"Fakultas Teknik"}
        />
        <CardRiwayat
          judul={"Sampah Menumpuk di gedung bca dekat kantin"}
          lokasi={"Gedung BCA"}
          deskripsi={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt, fuga nam amet consequuntur, vero dolor dignissimos error quidem, est accusamus saepe beatae maxime eaque earum maiores hic. Nemo, veritatis!"
          }
          fakultas={"Fakultas Teknik"}
        />
        <CardRiwayat
          judul={"Sampah Menumpuk di gedung bca dekat kantin"}
          lokasi={"Gedung BCA"}
          deskripsi={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt, fuga nam amet consequuntur, vero dolor dignissimos error quidem, est accusamus saepe beatae maxime eaque earum maiores hic. Nemo, veritatis!"
          }
          fakultas={"Fakultas Teknik"}
        />
        <CardRiwayat
          judul={"Sampah Menumpuk di gedung bca dekat kantin"}
          lokasi={"Gedung BCA"}
          deskripsi={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt, fuga nam amet consequuntur, vero dolor dignissimos error quidem, est accusamus saepe beatae maxime eaque earum maiores hic. Nemo, veritatis!"
          }
          fakultas={"Fakultas Teknik"}
        />
        <CardRiwayat
          judul={"Sampah Menumpuk di gedung bca dekat kantin"}
          lokasi={"Gedung BCA"}
          deskripsi={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt, fuga nam amet consequuntur, vero dolor dignissimos error quidem, est accusamus saepe beatae maxime eaque earum maiores hic. Nemo, veritatis!"
          }
          fakultas={"Fakultas Teknik"}
        />
        <CardRiwayat
          judul={"Sampah Menumpuk di gedung bca dekat kantin"}
          lokasi={"Gedung BCA"}
          deskripsi={
            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque deserunt, fuga nam amet consequuntur, vero dolor dignissimos error quidem, est accusamus saepe beatae maxime eaque earum maiores hic. Nemo, veritatis!"
          }
          fakultas={"Fakultas Teknik"}
        /> */}
      </div>
    </div>
  );
};

export default RiwayatLaporan;
