// src/components/encabezado/EncabezadoSimple.js
import React from "react";
import { Link } from "react-router-dom";
import { FaShoppingBag } from "react-icons/fa";

const EncabezadoSimple = () => {
  return (
    <header className="bg-white shadow px-6 py-4 fixed top-0 w-full z-50">
      <Link to="/" className="flex items-center space-x-2">
        <FaShoppingBag className="text-pink-600 text-2xl" />
        <span className="text-xl font-bold text-gray-800">Punto Shein</span>
      </Link>
    </header>
  );
};

export default EncabezadoSimple;
