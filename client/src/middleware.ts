import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protect } from "./lib/protect";

const publicRoutes = ["/", "/login", "/register"];
const privateRoutes = ["/dashboard", "/expenses", "/incomes", "/budgets"];

export async function middleware(request: NextRequest) {
   const { status } = await protect(request.cookies.toString());

   if (publicRoutes.includes(request.nextUrl.pathname) && status === "success") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
   } else if (privateRoutes.includes(request.nextUrl.pathname) && status === "fail") {
      return NextResponse.redirect(new URL("/login", request.url));
   }
}

export const config = {
   matcher: ["/", "/login", "/register", "/dashboard", "/expenses", "/incomes", "/budgets"],
};
