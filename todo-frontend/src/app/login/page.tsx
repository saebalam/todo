"use client"
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Login from "../components/login/Login";

const Page = () => {
  // const cookieStore = cookies();
  const token = localStorage.getItem("token");

  if (token) {
    redirect("/");
  }
  return <Login />;
};

export default Page;
