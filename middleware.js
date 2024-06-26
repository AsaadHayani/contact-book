import { NextResponse } from "next/server";

export function middleware(request) {
  const token = request.cookies.get("Bearer");
  const protectedPages = [
    "/",
    "/users",
    "/users/invite-user",
    "/contacts",
    "/contacts/create",
    "/activities",
    "/export-email",
    "/profile",
    "/profile/edit",
    "/send-email",
    "/print",
  ];

  const unprotectedPages = [
    "/login",
    "/register",
    "/forgot-password",
    "change-password",
    "reset-password",
    "set-password",
  ];

  const url = request.nextUrl.clone();

  if (protectedPages.includes(url.pathname)) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (unprotectedPages.includes(url.pathname)) {
    if (token) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/users",
    "/users/invite-user",
    "/contacts",
    "/contacts/create",
    "/activities",
    "/export-email",
    "/profile",
    "/profile/edit",
    "/send-email",
    "/print",
    "/login",
    "/register",
    "/forgot-password",
  ],
};
