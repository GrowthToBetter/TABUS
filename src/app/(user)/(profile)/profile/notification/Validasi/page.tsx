/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React from "react";
import Home from "../../_components/Validasi";
import prisma from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/authOption";
import { userFullPayload } from "@/utils/relationsip";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export default async function page() {
  const session = await nextGetServerSession();
  const userData = await prisma.user.findFirst({
    where: { id: session?.user?.id },
    include: { userAuth: true, File: { include: { TaskValidator: true } } },
  });
  if (!session?.user?.id) return redirect("/signin");
  if (userData || session) {
    revalidatePath("/profile/notification/Validasi");
  }
  return <>
  {<Home userData={userData as userFullPayload} session={session} /> }
  </>;
}
