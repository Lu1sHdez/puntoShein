import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext"; 

import {
  FaCog,
  FaUsers,
  FaBox,
  FaUserTie,
  FaQuestionCircle,
  FaChartLine,
  FaTachometerAlt,
  FaKey,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

const Sidebar = ({ admin }) => {
  const { colapsado, setColapsado } = useSidebar(); 

  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { label: "Configuración", icon: <FaCog />, path: "/admin/configuracion" },
    { label: "Usuarios", icon: <FaUsers />, path: "/admin/usuarios" },
    { label: "Productos", icon: <FaBox />, path: "/admin/productos" },
    { label: "Empresa", icon: <FaBox />, path: "/admin/empresa" },
    { label: "Empleados", icon: <FaUserTie />, path: "/admin/empleados" },
    { label: "Preguntas", icon: <FaQuestionCircle />, path: "/admin/preguntasFrecuentes" },
    { label: "Análisis", icon: <FaChartLine />, path: "/admin/gestionProductos" },
    { label: "Inicio rápido", icon: <FaKey />, path: "/admin/inicio-rapido" },
  ];

  return (
    <aside
      className={`min-h-screen bg-white border-r shadow-md p-4 fixed top-16 left-0 z-40 pt-4 transition-all duration-300 ${
        colapsado ? "w-20" : "w-64"
      }`}
    >
      {/* Botón para colapsar/expandir */}
      <div className="absolute top-4 right-[-12px] bg-white border rounded-full shadow p-1 z-50 cursor-pointer"
           onClick={() => setColapsado(!colapsado)}
      >
        {colapsado ? <FaAngleRight /> : <FaAngleLeft />}
      </div>

      {/* Encabezado */}
      {!colapsado && (
        <div className="mb-4 border-b pb-3">
          <p className="text-sm font-semibold text-black">
            Administrador{admin?.nombre ? ` - ${admin.nombre}` : ""}
          </p>
        </div>
      )}

      {/* Menú de navegación */}
      <nav className="flex flex-col gap-4">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md text-sm font-medium transition-all ${
                isActive
                  ? "bg-pink-600 text-white"
                  : "text-gray-700 hover:bg-gray-100"
              } ${colapsado ? "justify-center" : ""}`
            }
            title={colapsado ? item.label : ""}
          >
            {item.icon}
            {!colapsado && item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
