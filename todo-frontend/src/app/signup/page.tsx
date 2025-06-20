"use client";

import Link from "next/link";
import {  useState } from "react";
import signup from "../networking/auth/signup";
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    const data = await signup(username,email, password);
    if (data?.token) {
      localStorage.setItem("username", data.username);
      localStorage.setItem("isAdmin", data.isAdmin);
      localStorage.setItem("token", data.token);
      router.push("/");
    }else{
      alert(data?.message || "Signup failed. Please try again.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-center text-[32px]">Signup</h1>
      <form className="mt-6" onSubmit={handleSignup}>
        <div className="flex flex-col gap-4 max-w-[400px] mx-auto">
          <input
            type="text"
            placeholder="Username"
            className="p-2 border border-grey rounded-sm"
            value={username}
            required
            minLength={3}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="p-2 border border-grey rounded-sm"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            className="p-2 border border-grey rounded-sm"
            value={password}
            required
            minLength={8}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
           type="submit"
          >
            Signup
          </button>
          <Link href="/login" className="text-blue-500 text-center underline">
            Login
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Signup;
