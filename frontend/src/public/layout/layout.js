import React from "react";
import EncabezadoPublico from "../encabezado/encabezado";
import PiePublico from "../pie/pie";
import { Outlet } from "react-router-dom";

const LayoutPublico = () => {
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <EncabezadoPublico />
      <main className="flex-grow">
        <Outlet />
      </main>
      <PiePublico />
    </div>
  );
};

export default LayoutPublico;
