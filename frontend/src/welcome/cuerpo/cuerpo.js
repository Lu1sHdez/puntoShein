import React, { useEffect, useState } from "react";
import CargandoBarra from "../../Animations/CargandoBarra";
import Bienvenida from "./secciones/bienvenida";
import Categorias from "./secciones/categorias";
import PorqueElegirnos from "./secciones/porqueElegirnos";
import SeccionOpiniones from "./secciones/opiniones";
import CarruselPromociones from "./secciones/carrusel";

const CuerpoBienvenida = () => {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setCargando(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  if (cargando) return <CargandoBarra />;

  return (
    <>
      <Bienvenida />
      <Categorias />
      <PorqueElegirnos />
      <SeccionOpiniones />
      <CarruselPromociones />
    </>
  );
};

export default CuerpoBienvenida;
