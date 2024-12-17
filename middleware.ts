import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!token) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  // if (
  //   token.role !== "ADMIN" &&
  //   token.role !== "SUPER_ADMIN" &&
  //   request.nextUrl.pathname.startsWith("/admin")
  // ) {
  //   return NextResponse.redirect(new URL("/", request.url));
  // }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
