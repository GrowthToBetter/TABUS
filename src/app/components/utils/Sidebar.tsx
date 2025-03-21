/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import DashboardIcon from "@/app/(admin)/admin/components/Icon/DashboardIcon";
import StudentDataIcon from "@/app/(admin)/admin/components/Icon/StudentDataIcon";
import TeamDataIcon from "@/app/(admin)/admin/components/Icon/TeamDataIcon";
import AchievementIcon from "@/app/(admin)/admin/components/Icon/AchievementIcon";
import { FormButton } from "./Button";
import { userFullPayload } from "@/utils/relationsip";
import useSWR from "swr";
import { fetcher } from "@/utils/server-action/Fetcher";
import { useSession } from "next-auth/react";
import ModalProfile from "./Modal";

interface SideProps {
  title: string;
  href: string;
  icon: React.JSX.Element;
}

export default function Sidebar() {
  const [userData, setUserData] = useState<userFullPayload>();
  const { data: session, status } = useSession();
  const [modal, setModal] = useState(false);
  const { data, error } = useSWR(
    `/api/user?userId=${session?.user?.id}`,
    fetcher,
    {
      refreshInterval: 1000,
    }
  );
  useEffect(() => {
    if (data) {
      const { user } = data;
      setUserData(user);
    }
  }, [data]);
  const [active, setActive] = useState(true);
  const SidebarItem: SideProps[] = [
    {
      title: "Dashboard",
      href: "/admin",
      icon: <DashboardIcon />,
    },
    {
      title: "Student Data",
      href: "/admin/studentData",
      icon: <StudentDataIcon />,
    },
    {
      title: "Data Category",
      href: "/admin/dataCategory",
      icon: <TeamDataIcon />,
    },
    {
      title: "Data Files",
      href: "/admin/Files",
      icon: <TeamDataIcon />,
    },
  ];
  const handleClick = () => {
    setActive(!active);
  };
  return (
    <div className="relative">
      <FormButton
        type="button"
        onClick={handleClick}
        className=" rounded-full top-0 left-0"
        variant="base">
        Menu
      </FormButton>
      {active && (
        <div className="lg:block lg:w-80 relative">
          <aside
            id="sidebar"
            className={`fixed left-0 bg-white top-0 z-20 h-full flex-shrink-0 transition-all duration-300 lg:w-80 lg:opacity-100 hidden lg:flex`}
            aria-label="Sidebar">
            <div className="relative flex min-h-0 flex-1 flex-col border-r px-4 border-gray-200 bg-white pt-0 justify-between">
              <div className="flex flex-1 flex-col overflow-y-auto pb-4 pt-5">
                <div className="flex-1 space-y-12 max-h-[60px] w-full bg-white px-3w">
                  <ul className="space-y-4 pb-2">
                    {SidebarItem.map((x, i) => (
                      <li key={i}>
                        <Link
                          href={x.href}
                          className="group flex items-center gap-x-4 rounded-[50px] px-5 py-3 text-black/70 font-normal text-primary-400 hover:bg-secondary-color hover:text-[#F45846] transition-all">
                          <div>{x.icon}</div>
                          <p className="text-[18px] font-semibold">{x.title}</p>
                        </Link>
                      </li>
                    ))}
                    {userData?.role === "SUPERADMIN" ? (
                      <li>
                        <Link
                          href={"/admin/addSchool"}
                          className="group flex items-center gap-x-4 rounded-[50px] px-5 py-3 text-black/70 font-normal text-primary-400 hover:bg-secondary-color hover:text-[#F45846] transition-all">
                          <div>
                            <AchievementIcon />
                          </div>
                          <p className="text-[18px] font-semibold">
                            Add School
                          </p>
                        </Link>
                      </li>
                    ) : (
                      ""
                    )}
                  </ul>
                </div>
              </div>
              <div className="flex items-center justify-center mb-8">
                <button
                  onClick={handleClick}
                  className="group flex items-center rounded-[50px] px-5 py-3 text-base font-normal text-primary-400 hover:bg-secondary-color hover:text-white transition-all gap-x-3 w-full">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4Z"
                      className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 12C7 12.5523 7.44772 13 8 13L16 13C16.5523 13 17 12.5523 17 12C17 11.4477 16.5523 11 16 11L8 11C7.44772 11 7 11.4477 7 12Z"
                      className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12.7071 7.29289C13.0976 7.68342 13.0976 8.31658 12.7071 8.70711L9.41421 12L12.7071 15.2929C13.0976 15.6834 13.0976 16.3166 12.7071 16.7071C12.3166 17.0976 11.6834 17.0976 11.2929 16.7071L7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289Z"
                      className="fill-current hover:fill-secondary-color" // Apply hover effect to SVG path
                    />
                  </svg>
                </button>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
