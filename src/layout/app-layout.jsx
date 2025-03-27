import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div className="flex flex-col items-center">
      <main className="min-h-screen container">
        <Header />
        <Outlet />
      </main>

      <div className="p-10 text-center bg-gray-800 mt-10">
        Math with interest by act
      </div>
    </div>
  );
};
