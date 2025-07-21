// src/components/home/LayoutVacio.js
import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import EncabezadoSimple from "./encabezado/EncabezadoSimple";


const LayoutVacio = () => {
  return (
    <div className="min-h-screen pt-20">
      {<EncabezadoSimple />}
      <Outlet />
    </div>
  );
};

export default LayoutVacio;
