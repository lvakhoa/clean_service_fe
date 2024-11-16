import { NextRequest, NextResponse } from "next/server";
import authAction from "./apis/auth.action";
import { cookies } from "next/headers";
import {
  ADMIN_ENDPOINTS,
  CUSTOMER_ENDPOINTS,
  HELPER_ENDPOINTS,
  PUBLIC_ENDPOINTS,
} from "./configs/endpoints";

export default async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (
    !Object.values(PUBLIC_ENDPOINTS).some(
      (endpoint) => endpoint !== "/" && pathname.startsWith(endpoint)
    ) &&
    !Object.values(ADMIN_ENDPOINTS).some(
      (endpoint) => endpoint !== "/" && pathname.startsWith(endpoint)
    ) &&
    !Object.values(HELPER_ENDPOINTS).some(
      (endpoint) => endpoint !== "/" && pathname.startsWith(endpoint)
    ) &&
    !Object.values(CUSTOMER_ENDPOINTS).some(
      (endpoint) => endpoint !== "/" && pathname.startsWith(endpoint)
    )
  ) {
    return NextResponse.next();
  }

  if (
    pathname === "/" ||
    Object.values(PUBLIC_ENDPOINTS).some(
      (endpoint) => endpoint !== "/" && pathname.startsWith(endpoint)
    )
  ) {
    return NextResponse.next();
  }

  try {
    const claims = await authAction.decodeCookie({
      headers: {
        Cookie: cookies().toString(),
      },
    });

    const role = claims.data?.claims.find(
      (claim) => claim.type === "Role"
    )?.value;
    if (!role) {
      return NextResponse.redirect(
        new URL(PUBLIC_ENDPOINTS.landing, request.url)
      );
    }

    if (role === "Admin") {
      if (
        Object.values(ADMIN_ENDPOINTS).some((endpoint) =>
          pathname.startsWith(endpoint)
        )
      ) {
        return NextResponse.next();
      } else {
        return NextResponse.redirect(
          new URL(ADMIN_ENDPOINTS.chart, request.url)
        );
      }
    } else if (role === "Helper") {
      if (
        Object.values(HELPER_ENDPOINTS).some((endpoint) =>
          pathname.startsWith(endpoint)
        )
      ) {
        return NextResponse.next();
      }
    } else if (role === "Customer") {
      if (
        Object.values(CUSTOMER_ENDPOINTS).some((endpoint) =>
          pathname.startsWith(endpoint)
        )
      ) {
        return NextResponse.next();
      }
    }
    return NextResponse.redirect(
      new URL(PUBLIC_ENDPOINTS.landing, request.url)
    );
  } catch (error) {
    return NextResponse.redirect(
      new URL(PUBLIC_ENDPOINTS.landing, request.url)
    );
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
