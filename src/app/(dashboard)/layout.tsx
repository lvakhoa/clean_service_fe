import Header from "@/components/dashboard/Header";
import Sidebar from "@/components/dashboard/Sidebar";
import { verifySession } from "@/helpers/verifySession";
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";

const DashboardLayout = async (props: { children: React.ReactNode }) => {
  const session = await verifySession();

  return (
    <div className="flex overflow-hidden flex-col bg-slate-100">
      <Header />
      <div className="flex max-md:flex-col">
        <Sidebar role={session.role} />
        <main className="flex flex-col p-8 w-full max-md:ml-0 max-md:w-full">
          {props.children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
