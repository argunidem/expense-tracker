import { BarChartBig, DollarSign, LayoutDashboard, LogOut, PiggyBank, User } from "lucide-react";

export const items = [
   {
      href: "/",
      text: "Dashboard",
      icon: LayoutDashboard,
   },
   {
      href: "/expenses",
      text: "Expenses",
      icon: DollarSign,
   },
   {
      href: "/incomes",
      text: "Incomes",
      icon: BarChartBig,
   },
   {
      href: "/budgets",
      text: "Budgets",
      icon: PiggyBank,
   },
   {
      href: "/profile",
      text: "Profile",
      icon: User,
   },
   {
      text: "Logout",
      icon: LogOut,
   },
];
