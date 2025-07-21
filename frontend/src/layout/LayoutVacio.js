// src/components/home/LayoutVacio.js
import React from "react";
import { Outlet} from "react-router-dom";
import EncabezadoSimple from "../encabezados/EncabezadoSimple";

const LayoutVacio = () => {
  return (
    <div className="min-h-screen pt-20">
      {<EncabezadoSimple />}
      <Outlet />
    </div>
  );
};

export default LayoutVacio;
