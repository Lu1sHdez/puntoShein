import React, { useEffect, useState } from "react";
import Encabezado from "./encabezado/encabezado";
import Cuerpo from "./cuerpo/cuerpo";
import Pie from "./pie/pie";
import LogoAnimacion from "../Animations/LogoAnimacion";
import { motion } from "framer-motion";

const WelcomePage = () => {
  const [cargando, setCargando]= useState(true);

  useEffect(() => {
    setTimeout(() => {
      setCargando(false);  // Desactivar la animación después de 3 segundos
    }, 3000);
  }, []);

  if(cargando){
    return <LogoAnimacion/>
  }
  return (
    <>
      <Encabezado />
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
            <Cuerpo />
        </motion.div>
      <Pie />
    </>
  );
};


export default WelcomePage;
