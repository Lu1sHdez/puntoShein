import React, { useState, useEffect } from "react";
import { Link, Routes, Route } from "react-router-dom";
import {
  BsGear,
  BsPeople,
  BsBox,
  BsPersonBadge,
  BsFileEarmarkText,
  BsQuestionCircle,
  BsGraphUp,
  BsChatDots,
} from "react-icons/bs";
import { BsPersonLinesFill } from "react-icons/bs";
import { motion } from "framer-motion";
import CargandoBarra from "../../Animations/CargandoBarra.js";
import { dashboardAnimation } from "../../components/Funciones.js";

// Componentes
import Configuracion from "../setting/Configuracion";
import Empresa from "../empresa/Empresa";
import Usuarios from "../usuarios/Usuarios";
import Empleados from "../empleados/principal";
import Productos from "../productos/Productos";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <CargandoBarra message="Cargando..." />;

  const tarjetas = [
    {
      titulo: "Configuración",
      icono: <BsGear />,
      descripcion: "Administra las configuraciones del sistema.",
      ruta: "/admin/configuracion",
    },
    {
      titulo: "Usuarios",
      icono: <BsPeople />,
      descripcion: "Gestiona los usuarios del sistema.",
      ruta: "/admin/usuarios",
    },
    {
      titulo: "Productos",
      icono: <BsBox />,
      descripcion: "Administra el inventario de productos.",
      ruta: "/admin/productos",
    },
    {
      titulo: "Empleados",
      icono: <BsPersonBadge />,
      descripcion: "Gestiona la información de los empleados.",
      ruta: "/admin/empleados",
    },
    {
      titulo: "Perfil",
      icono: <BsPersonLinesFill />,
      descripcion: "Visualiza y edita tu perfil de administrador.",
      ruta: "/admin/perfil",
    },
    {
      titulo: "Empresa",
      icono: <BsBox />,
      descripcion: "Administra la información de la empresa.",
      ruta: "/admin/empresa",
    },
    {
      titulo: "Preguntas Frecuentes",
      icono: <BsQuestionCircle />,
      descripcion: "Administra las preguntas frecuentes de la empresa.",
      ruta: "/admin/preguntasFrecuentes",
    },
    {
      titulo: "Predicción de ventas",
      icono: <BsGraphUp />,
      descripcion: "Consulta la demanda estimada y anticipa el stock necesario.",
      ruta: "/admin/prediccion",
    },
    {
      titulo: "Inicio rápido (PIN)",
      icono: <BsGraphUp />,
      descripcion: "Genera un PIN temporal para iniciar sesión desde el smartwatch.",
      ruta: "/admin/inicio-rapido",
    },
    {
      titulo: "Opiniones",
      icono: <BsChatDots />,
      descripcion: "Aprueba o rechaza opiniones del público.",
      ruta: "/admin/opiniones",
    },
    {
      titulo: "Documentos Legales",
      icono: <BsFileEarmarkText />,
      descripcion: "Crea, edita o consulta los documentos legales de la empresa.",
      ruta: "/admin/documentos",
    },
  ];

  return (
    <motion.div {...dashboardAnimation} className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Panel de Administración
        </h1>
        <p className="text-gray-500">Gestiona todas las secciones de tu sistema desde aquí.</p>
      </div>

      {/* === Tarjetas principales === */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {tarjetas.map((item, idx) => (
          <Link
            key={idx}
            to={item.ruta}
            className="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] w-full max-w-sm overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 text-4xl mb-4 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                {item.icono}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {item.titulo}
              </h2>
              <p className="text-gray-500 text-sm">{item.descripcion}</p>
            </div>

            {/* Indicador inferior animado */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
          </Link>
        ))}
      </div>

      {/* === Rutas (para mantener compatibilidad interna) === */}
      <Routes>
        <Route path="/admin/configuracion" element={<Configuracion />} />
        <Route path="/admin/empresa" element={<Empresa />} />
        <Route path="/admin/usuarios" element={<Usuarios />} />
        <Route path="/admin/empleados" element={<Empleados />} />
        <Route path="/admin/productos" element={<Productos />} />
        <Route path="/admin/perfil" element={<Productos />} />
      </Routes>
    </motion.div>
  );
};

export default Dashboard;
