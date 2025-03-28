import Header from "@/components/header";
import React from "react";
import { Outlet } from "react-router-dom";

export const AppLayout = () => {
  return (
    <div>
      <div className="flex flex-col items-center p-4">
        <main className="min-h-screen container">
          <Header />
          <Outlet />
        </main>
      </div>
      <div className="p-10 text-center bg-gray-800 mt-10 w-full">
        Math with interest by act
      </div>
    </div>
  );
};
