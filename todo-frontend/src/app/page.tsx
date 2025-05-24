"use client"

import { useRouter } from "next/navigation";
import TodoDashboard from "./components/dashboard/TodoDashboard";
// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [isMounted,setIsMounted] = useState(false);
  // const cookieStore = cookies();
  // const token = localStorage.getItem("token");  

  useEffect(() => {
    setIsMounted(true);
      const token = typeof window !== "undefined" ? window?.localStorage.getItem("token") : null;
      if (!token) {
        router.push("/login");
      }
    }, []);

    if (!isMounted) {
      return null; 
    }

  return <TodoDashboard />;
}
