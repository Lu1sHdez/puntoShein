// src/components/home/encabezado/EncabezadoGeneral.js
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";

const EncabezadoGeneral = () => {
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const empresaRes = await axios.get(`${API_URL}/api/empresa/empresa`, {
          withCredentials: true,
        });
        setEmpresa(empresaRes.data);
      } catch (error) {
        console.error("Error al cargar datos de la empresa:", error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <header className="bg-gray-50 shadow px-6 py-4 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center space-x-4">
        <Link to="/" className="flex items-center space-x-4">
          {empresa && (
            <>
              <img
                src={empresa.logo}
                alt="Logo de empresa"
                className="h-14 w-14 rounded-full object-cover shadow-md border border-gray-300"
              />
              <h1 className="text-3xl font-bold text-black uppercase">{empresa.nombre}</h1>
            </>
          )}
        </Link>
      </div>
    </header>
  );
};

export default EncabezadoGeneral;
