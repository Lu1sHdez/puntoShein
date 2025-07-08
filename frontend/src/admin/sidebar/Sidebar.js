// src/admin/sidebar/Sidebar.js
import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaCog,
  FaUsers,
  FaBox,
  FaUserTie,
  FaQuestionCircle,
  FaChartLine,
  FaTachometerAlt,
  FaKey,
} from "react-icons/fa";

const Sidebar = ({ admin }) =>  {
  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { label: "Configuración", icon: <FaCog />, path: "/admin/configuracion" },
    { label: "Usuarios", icon: <FaUsers />, path: "/admin/usuarios" },
    { label: "Productos", icon: <FaBox />, path: "/admin/productos" },
    { label: "Empleados", icon: <FaUserTie />, path: "/admin/empleados" },
    { label: "Preguntas", icon: <FaQuestionCircle />, path: "/admin/preguntasFrecuentes" },
    { label: "Análisis", icon: <FaChartLine />, path: "/admin/gestionProductos" },
    { label: "Inicio rápido", icon: <FaKey />, path: "/admin/inicio-rapido" },
  ];

  return (
    <aside className="w-64 min-h-screen bg-white border-r shadow-md p-4 fixed top-6 left-0 z-40 pt-20">
    <div className="mb-4 border-b pb-3">
        <p className="text-sm font-semibold text-black">
        Administrador{admin?.nombre ? ` - ${admin.nombre}` : ""}
        </p>
    </div>

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
            }`
            }
        >
            {item.icon}
            {item.label}
        </NavLink>
        ))}
    </nav>
    </aside>

  );
};

export default Sidebar;
