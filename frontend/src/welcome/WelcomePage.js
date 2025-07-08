// src/welcome/WelcomePage.js
import React from "react";
import Encabezado from "./encabezado/encabezado";
import Cuerpo from "./cuerpo/cuerpo";
import Pie from "./pie/pie";
import { motion } from "framer-motion";

const WelcomePage = () => {
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
