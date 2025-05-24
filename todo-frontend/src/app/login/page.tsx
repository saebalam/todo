"use client"
import {  useRouter } from "next/navigation";
import Login from "../components/login/Login";
import { useEffect } from "react";

const Page = () => {
  // const cookieStore = cookies();
  const router = useRouter();

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;
    if (token) {
      router.push("/");
    }
  }, []);
  // const token = localStorage?.getItem("token");

  // if (token) {
  //   redirect("/");
  // }
  return <Login />;
};

export default Page;
