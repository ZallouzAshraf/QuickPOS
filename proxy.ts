import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("authToken")?.value;

  const url = req.nextUrl.clone();

  if (url.pathname === "auth/login" && token) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/dashboard") && !token) {
    url.pathname = "auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
