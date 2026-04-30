import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/session/user.session";

export enum Role {
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
  ADMIN = "ADMIN",
}

// 🔴 পরিবর্তন: ফাংশনটির নাম অবশ্যই 'proxy' হতে হবে যদি ফাইলের নাম proxy.ts হয়
export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await getSession();
  const user = session?.data?.user || session?.user;

  const isAdminRoute = pathname.startsWith("/admin");
  const isSellerRoute = pathname.startsWith("/seller");
  const isAuthPage = pathname === "/login" || pathname === "/register";

  if (!user) {
    if (isAdminRoute || isSellerRoute) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    return NextResponse.next();
  }

  const userRole = user.role?.toUpperCase();

  if (isAuthPage) {
    if (userRole === Role.ADMIN) return NextResponse.redirect(new URL("/admin", request.url));
    if (userRole === Role.SELLER) return NextResponse.redirect(new URL("/seller", request.url));
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isAdminRoute && userRole !== Role.ADMIN) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (isSellerRoute && userRole !== Role.SELLER) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-user-data", JSON.stringify(user));

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

// এটিও নিশ্চিত করুন
export const config = {
  matcher: [
    "/admin/:path*",
    "/seller/:path*",
    "/login",
    "/register",
  ],
};