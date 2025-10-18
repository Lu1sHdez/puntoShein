// src/welcome/WelcomePage.js
import React from "react";
import Cuerpo from "./cuerpo/cuerpo";
import { motion } from "framer-motion";

const WelcomePage = () => {

  return (
    <>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <Cuerpo />
        </motion.div>
    </>
  );
};


export default WelcomePage;