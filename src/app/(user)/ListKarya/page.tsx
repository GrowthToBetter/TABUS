import React from "react";
import Main from "./_components/Main";
import prisma from "@/lib/prisma";
import { nextGetServerSession } from "@/lib/authOption";
import { FileFullPayload, userFullPayload } from "@/utils/relationsip";

export default async function Partner() {
  const session = await nextGetServerSession();
  const getUser = await prisma.fileWork.findMany({
    where: { AND: [{ NOT: { status: "DENIED" } }, { NOT: { status: "PENDING" } }] },
    include:{
      comment:{include:{user:true}},
      suggest:{include:{user:true}}
    }
  });
  const getCurrentUser = await prisma.user.findFirst({
    where: { id: session?.user?.id },
  });
  const getGenre = await prisma.genre.findMany();
  return (
    <main className="min-h-screen bg-slate-100 py-36">
      <section>
        <Main currentUser={getCurrentUser as userFullPayload} genre={getGenre} session={session!} ListData={getUser as FileFullPayload[]} />
      </section>
    </main>
  );
}
