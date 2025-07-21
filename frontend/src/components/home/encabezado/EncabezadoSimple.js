import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";

const EncabezadoSimple = () => {
  const [empresa, setEmpresa] = useState(null);

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const empresaRes = await axios.get(`${API_URL}/api/empresa/empresa`, {
          withCredentials: true,
        });
        setEmpresa(empresaRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <header className="bg-gray-50 shadow px-6 py-4 fixed top-0 w-full z-50">
      <div className="max-w-7xl mx-auto flex justify-center sm:justify-start items-center">
        <Link to="/" className="flex items-center gap-4">
          {empresa ? (
            <>
              <img
                src={empresa.logo}
                alt="Logo de empresa"
                className="h-12 w-12 sm:h-14 sm:w-14 rounded-full object-cover border border-gray-300 shadow"
              />
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800 uppercase">
                {empresa.nombre}
              </h1>
            </>
          ) : (
            <h1 className="text-xl font-semibold text-gray-500">Cargando...</h1>
          )}
        </Link>
      </div>
    </header>
  );
};

export default EncabezadoSimple;
