import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { protect } from "./lib/auth";

const publicRoutes = ["/login", "/register"];
const privateRoutes = ["/expenses", "/incomes", "/budgets", "/data-table"];

export async function middleware(request: NextRequest) {
   const { status } = await protect(request.cookies.toString());
   if (publicRoutes.includes(request.nextUrl.pathname) && status === "success") {
      return NextResponse.redirect(new URL("/", request.url));
   } else if (privateRoutes.includes(request.nextUrl.pathname) && status === "fail") {
      return NextResponse.redirect(new URL("/login", request.url));
   }
   return NextResponse.next();
}

export const config = {
   matcher: ["/data-table", "/login", "/register", "/expenses", "/incomes", "/budgets"],
};
