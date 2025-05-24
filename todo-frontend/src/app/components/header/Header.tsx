"use client";

import logout from "@/app/networking/auth/logout";
import Button from "../atoms/dashboard/Button";
import { useRouter } from "next/navigation";

const Header = () => {
  const router = useRouter();
  const username = localStorage.getItem("username");
  const isAdmin = localStorage.getItem("isAdmin");

  const handleLogout = async () => {
    const data = await logout();
    if (data?.success) {
      router.push("/login");
    }
    localStorage.removeItem("username");
    localStorage.removeItem("isAdmin");
  };

  return (
    <div className="w-full justify-between flex items-center p-4 bg-gray-100">
      <h1>
        Welcome {username} {isAdmin === "true" && <sup>(Admin)</sup>}
      </h1>
      <Button
        label="Logout"
        handleClick={handleLogout}
        myClassname="bg-red-800"
      />
    </div>
  );
};

export default Header;
