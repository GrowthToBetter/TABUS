/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import Link from "next/link";
import Image from "next/image";
import { FormButton, LinkButton } from "./Button";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { signIn, signOut, useSession } from "next-auth/react";
import ModalProfile from "./Modal";
import { Button } from "./buttons";
import { set } from "date-fns";
import { IFrameViewer } from "./Iframe";

export const NAV_ITEMS = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Panduan",
    child: [
      {
        label: "Siswa",
        roleRequired: ["ALL"],
      },
      {
        label: "Guru",
        roleRequired: ["ALL"],
      },
      {
        label: "Admin",
        authRequired: true,
        roleRequired: ["ADMIN", "SUPERADMIN"],
      },
    ],
  },
  {
    label: "ajukan",
    href: "/AjukanKarya",
    authRequired: true,
  },
  {
    label: "List Karya",
    href: "/ListKarya",
  },
];

export default function Navbar() {
  const [modal, setModal] = useState<boolean>(false);
  const [prof, setprof] = useState<boolean>(false);
  const [label, setLabel] = useState<string | null>(null);
  const handleProf = () => {
    prof ? setprof(false) : setprof(true);
  };
  const handleClick = () => {
    setModal(!modal);
  };

  const pathName = usePathname();
  const router = useRouter();
  const [tutorial, setTutorial] = useState<string | null>(null);

  const { data: session, status } = useSession();
  return (
    <main>
      <nav className="bg-Secondary fixed w-full z-20 top-0 start-0 border-b border-gray-200">
        <div className="min-w-max flex flex-wrap items-center justify-between mx-auto p-4 lg:px-20">
          <div className="w-fit h-fit flex-col justify-center items-center space-x-72"></div>
          <Link
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse">
            <div>
              <h1 className="-tracking-tight text-2xl text-white font-bold">
                Ruang Belajar
                <p className="text-center text-sm font-normal text-white tracking-widest">
                  Optimalkan Karya Guru
                </p>
              </h1>
            </div>
          </Link>
          {tutorial === "Guru" && (
            <ModalProfile
              onClose={() => {
                setTutorial(null);
              }}
              title="Panduan">
              <div className="flex justify-center flex-col items-center">
                <ul>
                  <li>1. Daftar Melalui Admin sekolah masing masing</li>
                  <li>
                    2. Apabila belum memiliki admin, bergabung sekarang bersama
                    kami
                  </li>
                  <li>
                    3. Setelah melakukan pendaftaran, login dengan akun yang
                    didaftarkan
                  </li>
                  <li>4. update profile</li>
                  <li>5. Ajukan Karya yang Diinginkan</li>
                  <li>
                    6. Proses Pengajuan dilakukan dengan menentukan jenis karya
                    yang ingin diupload
                  </li>
                  <li>
                    7. Apabila memilih Upload File, Pilih genre file terlebih
                    dahulu, Lalu Baru pilih file yang akan diupload
                  </li>
                  <li>
                    8. Setelah Upload Succes, tutup tab upload dan tambahkan
                    cover
                  </li>
                  <li>
                    9. Apabila Jenis file adalah link, isi sesuai format yang
                    disediakan, setelah selesai tambahkan cover seperti diatas
                  </li>
                  <li>
                    10. Tunggu Validator untuk memverifikasi karya yang telah
                    diupload
                  </li>
                  <li>
                    11. Lihat pada bagian notifikasi apabila terdapat komentar,
                    atau melihat status terbaru dari karya
                  </li>
                  <li>
                    12. Karya yang telah diverifikasi bisa dilihat pada List
                    Karya yang diakses dari halaman Home atau Navbar Karya
                  </li>
                  <li>
                    13. Karya Yang berupa word atau docs dapat dibaca On Page,
                    sedangkan pdf atau Image akan ter- Redirect ke lokasi file
                    disimpan
                  </li>
                </ul>
                <div className="h-32 w-full invisible"></div>
              </div>
            </ModalProfile>
          )}
          {tutorial === "Admin" && (
            <ModalProfile
              title="Panduan Guru"
              onClose={() => setTutorial(null)}>
              <IFrameViewer
                url={"/video/tutorial.mp4"}
                onClose={() => setTutorial(null)}
              />
            </ModalProfile>
          )}
          {tutorial === "Siswa" && (
            <ModalProfile
              title="Panduan Guru"
              onClose={() => setTutorial(null)}>
              <IFrameViewer
                url={"/video/Siswa.mp4"}
                onClose={() => setTutorial(null)}
              />
            </ModalProfile>
          )}
          <div
            className="items-center justify-between hidden w-full md:flex md:w-auto md:order-1"
            id="navbar-sticky">
            <ul className="flex flex-col ltr:space-x-reverse items-center justify-center p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-md-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 opacity-80">
              {NAV_ITEMS.filter(
                (item) => !item.authRequired || (item.authRequired && session)
              ).map((item, index) => (
                <li key={index}>
                  {item.child ? (
                    <DropdownMenu.Root>
                      <DropdownMenu.Trigger asChild>
                        <button className="text-black rounded-md hover:text-black hover:bg-white duration-200 hover:border-2 p-2">
                          {item.label}
                        </button>
                      </DropdownMenu.Trigger>
                      <DropdownMenu.Content
                        className="bg-white border border-gray-200 rounded-md p-2 shadow-lg"
                        sideOffset={5}>
                        {item.child
                          .filter(
                            (item) =>
                              !item.authRequired ||
                              item.roleRequired?.includes("ALL") ||
                              (session?.user &&
                                item.roleRequired?.includes(
                                  session.user.role
                                ))
                          )
                          .map((childItem, childIndex) => (
                            <DropdownMenu.Item key={childIndex} asChild>
                              <Button
                                onClick={() => {
                                  setTutorial(childItem.label);
                                }}
                                className={`${"text-blue-500 border-2 bg-white border-Primary"} rounded-md hover:text-black hover:bg-white duration-200 hover:border-2 p-2 block`}>
                                {childItem.label}
                              </Button>
                            </DropdownMenu.Item>
                          ))}
                      </DropdownMenu.Content>
                    </DropdownMenu.Root>
                  ) : (
                    <Link
                      href={item.href}
                      className={`${
                        pathName === item.href
                          ? "text-blue-500 border-2 bg-white border-Primary"
                          : "text-black"
                      } rounded-md hover:text-black hover:bg-white duration-200 hover:border-2 p-2`}>
                      {item.label}
                    </Link>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse">
            <div>
              {status === "unauthenticated" ? (
                <button
                  onClick={() => signIn()}
                  className="focus:outline-none text-black bg-Primariy hover:bg-slate-100 focus:ring focus:ring-slate-100 font-medium rounded-full border border-slate-300 text-sm px-5 py-2.5 me-2 mb-2">
                  Sign In
                </button>
              ) : (
                <>
                  {status === "loading" ? (
                    <div className="flex gap-x-3 items-center">
                      <svg
                        aria-hidden="true"
                        className="inline w-5 h-5 animate-spin text-blue-900 fill-white"
                        viewBox="0 0 100 101"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                          fill="currentColor"
                        />
                        <path
                          d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                          fill="currentFill"
                        />
                      </svg>
                    </div>
                  ) : (
                    <div className="">
                      <FormButton
                        type="button"
                        variant="base"
                        onClick={handleProf}
                        withArrow
                        className="flex justify-center gap-x-2 py-2 px-4 ">
                        <Image
                          src={session?.user?.image as string}
                          alt="user image"
                          width={36}
                          height={36}
                          className="rounded-full"
                        />
                      </FormButton>
                      {prof && (
                        <div className="w-full p-2 max-w-56 bg-Secondary mt-1 border border-slate-300 rounded-lg fixed right-12 top-24 inline-block">
                          <FormButton
                            variant="base"
                            onClick={() => router.push("/profile")}
                            className="w-full mx-auto text-sm text-center ">
                            Profile
                          </FormButton>
                          <FormButton
                            onClick={() => signOut({ callbackUrl: "/signin" })}
                            variant="base"
                            className="w-full mx-auto text-sm text-black border-t-2 border-Primary">
                            Sign Out
                          </FormButton>
                          <FormButton
                            variant="base"
                            className="w-full"
                            onClick={() =>
                              router.push("/profile/notification/Karya")
                            }>
                            Notification
                          </FormButton>
                        </div>
                      )}
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </nav>
    </main>
  );
}
