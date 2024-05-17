/* eslint-disable no-unused-vars */
import { useParams } from "react-router-dom";
import RoomSelector from "../../components/chat/RoomSelector";
import AdminBubble from "../../components/chat/AdminBubble";
import UserBubble from "../../components/chat/UserBubble";
import { useEffect } from "react";
import Pusher from "pusher-js";
import { useQuery, useMutation } from "react-query";
import { useState } from "react";
import { useRef } from "react";

const getChatByUser = async (id) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_LOCAL}/chat/`);
  const data = await response.json();
  return data;
};

const getChatByLaporanIdUserId = async (laporanId, userId) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/chat/${laporanId}/${userId}`
  );
  const data = await response.json();
  return data;
};

const getUserById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/auth/${id}`
  );
  const data = await response.json();
  return data;
};

const sendChat = async (laporanId, userId, messages) => {
  const response = await fetch(`${import.meta.env.VITE_BACKEND_LOCAL}/chat`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      laporan_id: laporanId,
      user_id: userId,
      messages: messages,
      sender: "admin",
    }),
  });
  const data = await response.json();
  return data;
};

const fetchLaporanById = async (id) => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_LOCAL}/laporan/${id}`
  );
  const data = await response.json();
  return data;
};

const ChatToUser = () => {
  const { id, id_pelapor } = useParams();
  const userId = localStorage.getItem("id");

  const scrollRef = useRef(null);

  const [newChat, setNewChat] = useState([]);

  const { data: dataLaporan } = useQuery({
    queryFn: () => fetchLaporanById(id),
    queryKey: "laporanById",
  });

  const { data } = useQuery({
    queryKey: ["chat", userId],
    queryFn: () => getChatByUser(userId),
    refetchInterval: false,
  });

  console.log(data)

  const { data: dataChat } = useQuery({
    queryKey: ["chat"],
    queryFn: () => getChatByLaporanIdUserId(id, id_pelapor),
    refetchInterval: false,
  });

  const { data: userData } = useQuery({
    queryKey: ["user", userId],
    queryFn: () => getUserById(userId),
    refetchInterval: false,
  });

  // console.log(userData)

  const [message, setMessage] = useState("");

  const { mutate } = useMutation({
    mutationKey: ["sendchat"],
    mutationFn: () => sendChat(id, id_pelapor, message),
    onSuccess: () => {
      setMessage("");
    },
  });

  useEffect(() => {
    const pusher = new Pusher("1878dcbb07e22275630e", {
      cluster: "ap1",
    });

    if (id) {
      const namaChannel = `${id}-${id_pelapor}`;
      var channel = pusher.subscribe(namaChannel);

      channel.bind("my-event", function (data) {
        setNewChat((prev) => [...prev, data]);
      });

      return () => {
        channel.bind("my-event", function (data) {
          setNewChat((prev) => [...prev, data]);
        });
        channel.unsubscribe();
      };
    }
  }, []);

  useEffect(() => {
    // Lakukan scroll ke bagian bawah saat pesan berubah
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [newChat, dataChat]);

  const handleSendMessage = async () => {
    await mutate();
  };

  // useEffect(() => {
  //   if (newChat) {
  //     console.log(newChat);
  //   }
  // }, [newChat]);

  console.log(dataLaporan)

  return (
    <div className="min-h-screen box-border">
      {/* <h1 className="font-semibold text-2xl text-gray-800">
        Chat dengan Admin
      </h1>
      <hr /> */}
      <div className=" flex gap-4 flex-wrap">
        {/* <!-- component --> */}
        <div className="flex h-screen antialiased text-gray-800">
          <div className="flex flex-row h-full w-full overflow-x-hidden">
            <div
              className={`${
                !id ? "flex" : "hidden md:flex"
              } flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0`}
            >
              <div className="flex flex-row items-center justify-center h-12 w-full">
                <div className="flex items-center justify-center rounded-2xl text-orange-700 bg-orange-100 h-10 w-10">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                    ></path>
                  </svg>
                </div>
                <div className="ml-2 font-bold text-2xl">Chat dg Admin</div>
              </div>
              <div className="flex flex-col items-center bg-orange-100 border border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                <div className="h-20 w-20 rounded-full border overflow-hidden">
                  {userData ? (
                    <img
                      src={
                        "https://ui-avatars.com/api/?name=" +
                        userData.data.full_name
                      }
                      alt="Avatar"
                      className="h-full w-full"
                    />
                  ) : null}
                </div>
                <div className="text-sm font-semibold mt-2">
                  {userData ? userData.data.full_name : "-"}
                </div>
                <div className="text-xs text-gray-500">
                  {userData ? userData.data.prodi : "-"}
                </div>
              </div>
              <div className="flex flex-col mt-8">
                <div className="flex flex-row items-center justify-between text-xs">
                  <span className="font-bold">Chat Anda</span>
                  <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    {data ? data.data.length : 0}
                  </span>
                </div>
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                  {data ? (
                    data.data.map((chat) => (
                      <RoomSelector
                        key={chat.id}
                        judul={chat.judul || ''}
                        id={chat.laporan_id}
                        id_pelapor={chat.user_id}
                        active={
                          id == chat.laporan_id && id_pelapor == chat.user_id
                        }
                      />
                    ))
                  ) : (
                    <RoomSelector judul={"belum ada chat"} />
                  )}

                  {!dataChat && id && dataLaporan ? (
                    <RoomSelector
                      judul={dataLaporan.data.judul}
                      id={dataLaporan.data.id}
                      active={dataLaporan.data.id == id}
                    />
                  ) : null}
                  {/* <RoomSelector
                    judul={"Sampah Menumpuk di gedung bca dekat kantine"}
                  />

                  <RoomSelector
                    judul={
                      "Keamanan di Area Kantin Gedung BCA: Perlu Diwaspadai"
                    }
                    newChat={2}
                  />
                  <RoomSelector
                    judul={"Peningkatan Lalu Lintas di Dekat Kantin Gedung BCA"}
                  />
                  <RoomSelector
                    judul={
                      "Perluasan Fasilitas Kantin di Gedung BCA: Potensi Peningkatan Pelayanan"
                    }
                  />
                  <RoomSelector
                    judul={"Ketersediaan Ruang Parkir di Area Gedung BCA"}
                  /> */}
                </div>
              </div>
            </div>
            <div
              className={`flex-col flex-auto h-full p-6 ${
                !id ? "hidden" : ""
              } md:flex`}
            >
              <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                  <div className="flex flex-col h-full">
                    {!id ? (
                      <h1 className="">Silakan Pilih Room Chat</h1>
                    ) : (
                      <div
                        className="grid grid-cols-12 gap-y-2"
                        ref={scrollRef}
                      >
                        {dataChat && dataChat.data
                          ? dataChat.data.messages.map((chat) => {
                              if (chat.user_id == userId) {
                                return (
                                  <UserBubble
                                    key={chat.id}
                                    message={chat.message}
                                    // seen={chat.seen}
                                  />
                                );
                              } else {
                                return (
                                  <AdminBubble
                                    key={chat.id}
                                    message={chat.message}
                                  />
                                );
                              }
                            })
                          : null}
                        {newChat.map((chat) => {
                          if (chat.user_id == userId) {
                            return (
                              <UserBubble
                                key={chat.id}
                                message={chat.message}
                                // seen={chat.seen}
                              />
                            );
                          } else {
                            return (
                              <AdminBubble
                                key={chat.id}
                                message={chat.message}
                              />
                            );
                          }
                        })}
                        {/* <AdminBubble message={"Hey How are you today?"} />
                        <AdminBubble
                          message={
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel ipsa commodi illum saepe numquam maxime asperiores voluptate sit, minima perspiciatis."
                          }
                        />
                        <UserBubble message={"I'm ok what about you?"} />
                        <UserBubble
                          message={
                            "Lorem ipsum dolor sit, amet consectetur adipisicing. ?"
                          }
                        />
                        <AdminBubble message={"Lorem ipsum dolor sit amet !"} />
                        <UserBubble
                          message={
                            "Lorem ipsum dolor sit, amet consectetur adipisicing. ?"
                          }
                          seen={true}
                          image={
                            "https://media.istockphoto.com/id/1221371608/id/foto/kamar-mandi-umum.jpg?s=1024x1024&w=is&k=20&c=GDagEU_8NzMiBF2HSVZ0OxOS_e3N-rDZ75q0yfKeRNc="
                          }
                        />
                        <AdminBubble
                          message={
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima autem, fugit numquam aliquid laudantium, dolores voluptatum possimus quae beatae explicabo, porro velit officia commodi natus expedita neque error cupiditate architecto?"
                          }
                        />
                        <AdminBubble
                          message={"Ya, Coba lihat ini"}
                          image={
                            "https://media.istockphoto.com/id/1221371608/id/foto/kamar-mandi-umum.jpg?s=1024x1024&w=is&k=20&c=GDagEU_8NzMiBF2HSVZ0OxOS_e3N-rDZ75q0yfKeRNc="
                          }
                        /> */}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">
                  {/* <div>
                    <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                        ></path>
                      </svg>
                    </button>
                  </div> */}
                  <div className="flex-grow ml-4">
                    <div className="relative w-full">
                      <input
                        type="text"
                        className="flex w-full border rounded-xl focus:outline-none focus:border-orange-300 pl-4 h-10"
                        placeholder="Type your message..."
                        onChange={(e) => setMessage(e.target.value)}
                        value={message}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                      />
                      {/* <button className="absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          ></path>
                        </svg>
                      </button> */}
                    </div>
                  </div>
                  <div className="ml-4">
                    <button
                      onClick={() => handleSendMessage()}
                      className="flex items-center justify-center bg-orange-500 hover:bg-orange-600 rounded-xl text-white px-4 py-1 flex-shrink-0"
                    >
                      <span className="hidden md:block">Send</span>
                      <span className="ml-2">
                        <svg
                          className="w-4 h-4 transform rotate-45 -mt-px"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          ></path>
                        </svg>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatToUser;
