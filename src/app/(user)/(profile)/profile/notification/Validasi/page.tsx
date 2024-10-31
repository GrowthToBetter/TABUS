/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Home from "../../_components/Validasi";
import prisma from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/authOption";
import { redirect } from "next/navigation";
import { FileFullPayload, userFullPayload } from "@/utils/relationsip";

export default async function page() {
  const session = await nextGetServerSession();
  let file:FileFullPayload[]=[];
  if (session?.user?.role==="GURU") {
     file = await prisma.fileWork.findMany({
      where: {
        userId: session?.user?.id,
      },
      include: {
        user: { include: { userAuth: true } },
        TaskValidator: true,
        comment: { include: { user: true } },
      },
    });
  } else{
    file = await prisma.fileWork.findMany({
      include: {
        user: { include: { userAuth: true } },
        TaskValidator: true,
        comment: { include: { user: true } },
      },
    });
  }
  return <Home file={file? file : []} Session={session}/>;
}

export const maxDuration = 60;