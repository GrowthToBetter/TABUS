/* eslint-disable @typescript-eslint/no-explicit-any */
import { Role } from "@prisma/client";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";


export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  if (!token) {
    if (
      pathname.startsWith("/admin") ||
      pathname.startsWith("/AjukanKarya") ||
      pathname.startsWith("/profile")
    ) {
      return NextResponse.redirect(
        new URL(`/signin?callbackUrl=${pathname}`, req.url)
      );
    }
    return NextResponse.next();
  }

  const restrictedRolesForAdmin = ["GURU", "VALIDATOR"];
  const adminAccessRoles = ["ADMIN", "SUPERADMIN"];

  if (
    pathname.startsWith("/auth") || 
    (pathname.startsWith("/admin") &&
      restrictedRolesForAdmin.includes(token.role as Role)) ||
    (pathname.startsWith("/admin/dataCategory") &&
      !adminAccessRoles.includes(token.role as Role)) ||
    (pathname.startsWith("/admin/studentData") &&
      !adminAccessRoles.includes(token.role as Role))
  ) {
    return NextResponse.rewrite(new URL("/unauthorized", req.url), {
      status: 403,
    });
  }

  const res = NextResponse.next();
  res.headers.set("Access-Control-Allow-Credentials", "true");
  res.headers.set("Access-Control-Allow-Origin", "*");
  res.headers.set(
    "Access-Control-Allow-Methods",
    "GET, DELETE, PATCH, POST, PUT"
  );
  res.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  res.headers.set("X-Frame-Options", "ALLOW-FROM https://docs.google.com");
  res.cookies.set("myCookie", "someValue", {
    sameSite: "none",
    secure: true,
  });

  return res;
}

export const config = {
  matcher: ['/:path*'],
};
