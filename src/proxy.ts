import { NextRequest, NextResponse } from "next/server";
import { userService } from "./services/user.service";
import { Roles } from "./constant/roles";


export async function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const { data } = await userService.getSession();

  // ======================
  // SELLER DASHBOARD
  // ======================
  if (pathname.startsWith("/seller")) {
    if (!data) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (data.user.role !== Roles.seller) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ======================
  // ADMIN DASHBOARD
  // ======================
  if (pathname.startsWith("/admin")) {
    if (!data) {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (data.user.role !== Roles.admin) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // ======================
  // CUSTOMER / USER
  // ======================
  

  return NextResponse.next();
}
export const config = {
  matcher: [
    "/seller/:path*",
    "/admin/:path*",
  ],
};
