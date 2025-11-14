import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value;
  const url = req.nextUrl.clone();

  const publicRoutes = ["/auth/login", "/auth/register"];
  const isPublicRoute = publicRoutes.some((route) => url.pathname === route);

  if (isPublicRoute && token) {
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  if (url.pathname.startsWith("/dashboard") && !token) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  if (url.pathname === "/") {
    if (token) {
      url.pathname = "/dashboard";
      return NextResponse.redirect(url);
    } else {
      url.pathname = "/auth/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/auth/login", "/auth/register"],
};
