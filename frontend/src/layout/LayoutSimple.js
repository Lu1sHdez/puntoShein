// src/components/home/LayoutGeneral.js
import React from "react";
import { Outlet} from "react-router-dom";
import EncabezadoGeneral from "../encabezados/encabezado";
import PiePublico from "../public/pie/pie";

const LayoutGeneral = () => {

  return (
    <div className="min-h-screen">
      <EncabezadoGeneral />
      <Outlet />
      <PiePublico />
    </div>
  );
};

export default LayoutGeneral;
