import React from "react";
import { Outlet } from "react-router-dom";
import { Offline } from "react-detect-offline";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "../Components/Header";

export default function LayoutAPP() {
  const notifyOffline = () => {
    toast.error("You are currently offline", {
      position: "top-right",
    });
  };

  return (
    <>
      <Header />
      <Offline>{notifyOffline()}</Offline>
      <Outlet />
    </>
  );
}
