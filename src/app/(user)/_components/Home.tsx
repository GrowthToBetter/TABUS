/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import Gambar from "@/../public/img/gambar provesi (2).png";
import Image from "next/image";
import { FormButton, LinkButton } from "../../components/utils/Button";
import { Archivo_Black } from "next/font/google";
const archivo_black = Archivo_Black({ weight: "400", subsets: ["latin"] });
import IconSubject from "../../components/Icons/icon-Subject";
import Img from "../../components/Icons/Img";
import Link from "next/link";
import gambar1 from "@/../public/img/WhatsApp Image 2024-11-07 at 21.23.29_7c1b692d.jpg";
import { useEffect, useState } from "react";
import { FileFullPayload, userFullPayload } from "@/utils/relationsip";
import { signIn, useSession } from "next-auth/react";
import { fetcher } from "@/utils/server-action/Fetcher";
import useSWR from "swr";
import { useRouter } from "next/navigation";
import { FileCard } from "@/app/components/utils/card";
import toast from "react-hot-toast";
import { addLike, addViews } from "@/utils/server-action/userGetServerSession";

export default function Home({ userData }: { userData: userFullPayload }) {
  const { data: session, status } = useSession();
  const [files, setFile] = useState<FileFullPayload[]>([]);
  const { data, error } = useSWR(`/api/getFiles`, fetcher, {
    refreshInterval: 1000,
  });
  useEffect(() => {
    if (data) {
      const { dataFile } = data;
      setFile(dataFile);
    }
  }, [data]);
  const router = useRouter();
  const [openProfiles, setOpenProfiles] = useState<{
    [key: string]: { isOpen: boolean; link: string };
  }>({});
  const handleProf = (id: string, link: string) => {
    setOpenProfiles((prev) => ({
      ...prev,
      [id]: {
        isOpen: !prev[id]?.isOpen,
        link: prev[id]?.link || link,
      },
    }));
  };
  const filteredFiles = files
    .filter((file) => file.status === "VERIFIED")
    .sort((a, b) => b.views - a.views)
    .slice(0, 15);

    const [like, setLike] = useState<boolean>(false);
    const addLikes = async (file: FileFullPayload) => {
      setLike(!like);
      const loading = toast.loading("Loading...");
  
      try {
        const update = await addLike(
          file.id,
          like ? file.Like - 1 : file.Like + 1
        );
  
        if (!update) {
          toast.error("Gagal Menambahkan Like");
          return;
        }
  
        toast.success("Success", { id: loading });
        return update;
      } catch (error) {
        throw new Error((error as Error).message);
      }
    };
  if (!filteredFiles) {
    return <>Loading...</>;
  }
  if (!userData) {
    return <>Loading...</>;
  }
  return (
    <div className="">
      <div className="bg-Primary min-w-max p-10 flex flex-col justify-center items-center relative">
        <div className="flex justify-center relative mt-14 md:m-0 flex-col md:flex-row items-center h-screen w-fit bg-Primary">
          <div className="w-full mt-20">
            <h1 className="md:text-6xl text-4xl font-bold md:w-[600px] w-[300px]">
              Berjalan Bersama Menghasilkan Ribuan Karya
            </h1>
            <p className="md:w-[600px] w-[300px] pt-5 md:text-base text-sm font-semibold">
              Optimalisasi Karya Guru dalam ruang Belajar <br />
              Sebagai Pendukung dari platform merdeka Belajar
            </p>
            <FormButton
              onClick={() => router.push("/AjukanKarya")}
              className="mt-20 scale-125 ml-4"
              variant="base">
              Ajukan Sekarang
            </FormButton>
          </div>
          <Image src={Gambar} alt="Gambar" width={620} height={500} />
        </div>
        <div className="h-[100px] w-full pt-10 bg-[#F5F8FA]">
          <ul className="flex justify-evenly font-semibold  ">
            <li>
              <Link href={"/AjukanKarya"} className="flex">
                <IconSubject />
                Ajukan Karya
              </Link>
            </li>
            <li>
              <Link href={"/ListKarya"} className="flex">
                <Img />
                List Karya
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className=" grid lg:grid-cols-3 grid-cols-1 gap-4 bg-white rounded-xl p-8 mt-4">
        {filteredFiles.map((file, i) => (
          <FileCard
            key={i}
            file={file}
            onLike={() => addLikes(file)}
            onRead={() => {
              router.push(file.path);
              addViews(file.id, file.views + 1);
            }}
            user={userData}
          />
        ))}
      </div>
      <LinkButton href={"/ListKarya"} className="m-5" variant="base">
        Lihat Lebih Banyak{" "}
      </LinkButton>
      <div>
        <div className="justify-center flex bg-white pt-40 flex-col h-screen xl:flex-row items-center px-4">
          <div className="max-w-max">
            <h1
              className={`text-[64px] text-start ${archivo_black.className} leading-none`}>
              <span className="text-red-500">R</span>uang Belajar
            </h1>
            <p className="xl:text-[32px] lg:text-[30px] md:text-[28px] sm:text-[26px] text-[24px] font-normal my-2">
              MGMP Tata Busana, Bersama kita berkarya
            </p>
            <FormButton
              onClick={() => signIn()}
              className="mt-[17px] scale-125 ml-4"
              variant="base">
              Get Started Now!
            </FormButton>
          </div>
          <div className="mt-12">
            <Image
              src={gambar1}
              width={500}
              height={500}
              alt="Orang Sukses Amin"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
