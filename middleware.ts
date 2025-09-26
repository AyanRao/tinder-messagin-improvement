import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const isLoginPage = request.nextUrl.pathname === "/login";
  const isRootPage = request.nextUrl.pathname === "/";
  const loggedIn = request.cookies.get("loggedIn")?.value === "true";

  if (!loggedIn && isRootPage) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login"],
};
