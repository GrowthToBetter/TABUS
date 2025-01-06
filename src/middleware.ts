/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextResponse } from "next/server";


export async function middleware() {


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
