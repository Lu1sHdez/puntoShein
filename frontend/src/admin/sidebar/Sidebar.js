import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import CerrarSesionModal from "../../modal/CerrarSesion";

import {
  FaCog,
  FaFileAlt,
  FaUsers,
  FaUser,
  FaBox,
  FaUserTie,
  FaQuestionCircle,
  FaChartLine,
  FaTachometerAlt,
  FaCommentDots,
  FaAngleLeft,
  FaAngleRight,
  FaSignOutAlt,
} from "react-icons/fa";

const Sidebar = ({ admin }) => {
  const { colapsado, setColapsado } = useSidebar();
  const [mostrarModalCerrarSesion, setMostrarModalCerrarSesion] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { label: "Perfil", icon: <FaUser />, path: "/admin/perfil" },
    { label: "Configuración", icon: <FaCog />, path: "/admin/configuracion" },
    { label: "Usuarios", icon: <FaUsers />, path: "/admin/usuarios" },
    { label: "Productos", icon: <FaBox />, path: "/admin/productos" },
    { label: "Predicción de ventas", icon: <FaChartLine />, path: "/admin/prediccion" },
    { label: "Empresa", icon: <FaBox />, path: "/admin/empresa" },
    { label: "Documentos legales", icon: <FaFileAlt />, path: "/admin/documentos" },
    { label: "Empleados", icon: <FaUserTie />, path: "/admin/empleados" },
    { label: "Preguntas", icon: <FaQuestionCircle />, path: "/admin/preguntasFrecuentes" },
    { label: "Opiniones", icon: <FaCommentDots />, path: "/admin/opiniones" },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 z-40 border-r border-gray-100 bg-gradient-to-b from-white to-blue-50 shadow-lg transition-all duration-500 ease-in-out h-[calc(100vh-4rem)] overflow-y-auto
      ${colapsado ? "w-20" : "w-64"} flex flex-col justify-between`}
    >
      {/* Botón de colapsar */}
      <div
        onClick={() => setColapsado(!colapsado)}
        className="absolute -right-3 top-4 bg-white border shadow-md p-1 rounded-full cursor-pointer hover:scale-105 transition-transform z-50"
      >
        {colapsado ? <FaAngleRight /> : <FaAngleLeft />}
      </div>

      {/* Encabezado */}
      <div className="px-3 py-4 border-b border-gray-200">
        {!colapsado && (
          <div>
            <p className="text-sm font-semibold text-gray-700">Administrador</p>
            {admin?.nombre && (
              <p className="text-sm text-blue-600 truncate">{admin.nombre}</p>
            )}
          </div>
        )}
      </div>

      {/* Navegación principal */}
      <nav className="flex flex-col gap-2 px-2 mt-4">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }
              ${colapsado ? "justify-center" : "pl-4"}`
            }
            title={colapsado ? item.label : ""}
          >
            <span className="text-base">{item.icon}</span>
            {!colapsado && <span>{item.label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Cerrar sesión */}
      <div className="p-3 border-t border-gray-200">
        <button
          onClick={() => setMostrarModalCerrarSesion(true)}
          className={`flex items-center gap-3 p-2 rounded-lg text-sm font-medium w-full transition-all duration-200 
          text-red-600 hover:bg-red-100 hover:text-red-700 ${
            colapsado ? "justify-center" : "pl-4"
          }`}
          title={colapsado ? "Cerrar sesión" : ""}
        >
          <FaSignOutAlt />
          {!colapsado && "Cerrar sesión"}
        </button>
      </div>

      {/* Modal de confirmación */}
      <CerrarSesionModal
        visible={mostrarModalCerrarSesion}
        onClose={() => setMostrarModalCerrarSesion(false)}
      />
    </aside>
  );
};

export default Sidebar;
