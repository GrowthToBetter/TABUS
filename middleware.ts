/* eslint-disable @typescript-eslint/no-explicit-any */
import { getSession } from "next-auth/react";
import { NextResponse } from "next/server";

import { withAuth } from "next-auth/middleware";

export enum Role {
  GURU = "GURU",
  ADMIN = "ADMIN",
  SUPERADMIN = "SUPERADMIN",
  VALIDATOR = "VALIDATOR",
  DELETE = "DELETE",
}

export default withAuth(
  async function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    const session = await getSession({ req: req as any });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = NextResponse.next();
    res.headers.set("Access-Control-Allow-Credentials", "true");
    res.headers.set("Access-Control-Allow-Origin", "*");
    res.headers.set(
      "Access-Control-Allow-Methods",
      "GET,DELETE,PATCH,POST,PUT"
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

    if (!token) {
      if (
        pathname.startsWith("/admin") ||
        pathname.startsWith("/product") ||
        pathname.startsWith("/AjukanKarya") ||
        pathname.startsWith("/profile")
      ) {
        return NextResponse.redirect(
          new URL(`/auth/login?callbackUrl=${pathname}`, req.url)
        );
      }
    }

    if (token) {
      const restrictedRolesForAdmin = [Role.GURU, Role.VALIDATOR];
      const adminAccessRoles = [Role.ADMIN, Role.SUPERADMIN];

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
    }

    return res;
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: ['/:path*'],
};

