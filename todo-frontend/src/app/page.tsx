'use client'

import TodoDashboard from "./components/dashboard/TodoDashboard";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  // const cookieStore = cookies();
  const token = localStorage.getItem("token");  

  if (!token) {
    redirect("/login"); // redirect if no token
  }

  return <TodoDashboard token={token} />;
}
