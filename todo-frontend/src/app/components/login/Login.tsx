"use client";

import login from "@/app/networking/auth/login";
import Link from "next/link";
import {  useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const data = await login(email, password);
    localStorage.setItem("username", data.username);
    localStorage.setItem("isAdmin", data.isAdmin);
    if (data?.token) {
      localStorage.setItem("token", data.token);
      router.push("/");
    }else{
      alert("Login failed. Please check your credentials.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-[32px]">Login</h1>
      <form className="mt-6">
        <div className="flex flex-col gap-4 max-w-[400px] mx-auto">
          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-grey rounded-sm"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-grey rounded-sm"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleLogin}
          >
            Login
          </button>
          <Link href="/signup" className="text-blue-500 text-center">
            Don't have an account? <span className="underline">Signup</span>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Login;
