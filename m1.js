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

  // Function to check if the token is expired
  function isTokenExpired(token) {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 < Date.now();
    } catch (e) {
      return true; // If there is an error decoding the token, consider it expired
    }
  }

  if (unprotectedPages.includes(url.pathname)) {
    if (!token || isTokenExpired(token)) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (protectedPages.includes(url.pathname)) {
    if (token && !isTokenExpired(token)) {
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
