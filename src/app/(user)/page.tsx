import React from "react";
import Home from "./_components/Home";
import prisma from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/authOption";
import { FileFullPayload, userFullPayload } from "@/utils/relationsip";

export default async function page() {
  const session = await nextGetServerSession();
  const userData = await prisma.user.findFirst({
    where: {
      id: session?.user?.id,
    },
    include: {
      userAuth: true,
      File: { include: { TaskValidator: true, comment:{include:{user:true}}, suggest:{include:{user:true}} } },
      taskValidator: { include: { user: true } },
      comment: { include: { file: true } },
    },
  });
  const files = await prisma.fileWork.findMany({
    include:{
      suggest:{include:{user:true}},
      comment:{include:{user:true}},
      user:true
    }
  });
  return <Home userData={userData as userFullPayload} files={files as FileFullPayload[]}/>;
}


export const maxDuration = 60;