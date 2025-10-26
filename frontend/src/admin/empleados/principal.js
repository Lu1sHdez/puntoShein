import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../ApiConexion";
import EmpleadosRegistrados from "./components/Empleados";
import NuevoEmpleado from "./components/NuevoEmpleado";
import { motion } from "framer-motion";
import CargandoBarra from "../../Animations/CargandoBarra";
import { dataLoadingAnimation } from "../../components/Funciones";

const PrincipalEmpleados = () => {
  const [seccionActiva, setSeccionActiva] = useState("todos");
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerEmpleados = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/empleado/obtener`, {
        withCredentials: true,
      });
      setEmpleados(res.data.empleados);
    } catch (error) {
      console.error("Error al obtener empleados:", error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  if (cargando) return <CargandoBarra message="Cargando empleados..." />;

  return (
    <motion.div
      {...dataLoadingAnimation}
      className="p-6 sm:p-8 max-w-6xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 animate-fade-in-up"
    >
      {/* === ENCABEZADO === */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center sm:text-left">
          Gestión de Empleados
        </h1>
        <p className="text-gray-500 text-sm text-center sm:text-right mt-2 sm:mt-0">
          Administra el personal registrado y agrega nuevos empleados.
        </p>
      </div>

      {/* === NAVEGACIÓN TIPO TABS === */}
      <div className="border-b border-gray-200 mb-6">
        <nav className="flex flex-wrap justify-center sm:justify-start gap-6">
          <button
            onClick={() => setSeccionActiva("todos")}
            className={`pb-2 text-base sm:text-lg font-medium transition duration-200 relative ${
              seccionActiva === "todos"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Todos los empleados
          </button>
          <button
            onClick={() => setSeccionActiva("agregar")}
            className={`pb-2 text-base sm:text-lg font-medium transition duration-200 relative ${
              seccionActiva === "agregar"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Agregar empleado
          </button>
        </nav>
      </div>

      {/* === CONTENIDO DINÁMICO === */}
      <div className="mt-6">
        {seccionActiva === "todos" ? (
          <EmpleadosRegistrados empleados={empleados} cargando={cargando} />
        ) : (
          <NuevoEmpleado actualizarLista={obtenerEmpleados} />
        )}
      </div>
    </motion.div>
  );
};

export default PrincipalEmpleados;
