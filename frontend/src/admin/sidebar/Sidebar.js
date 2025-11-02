import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext";
import CerrarSesionModal from "../../modal/CerrarSesion";
import {
  BsGear,
  BsFileEarmarkText,
  BsPeople,
  BsPerson,
  BsBox,
  BsPersonBadge,
  BsQuestionCircle,
  BsGraphUp,
  BsSpeedometer2,
  BsChatDots,
  BsArrowLeftShort,
  BsArrowRightShort,
  BsBoxArrowRight,
} from "react-icons/bs";

const Sidebar = ({ admin }) => {
  const { colapsado, setColapsado } = useSidebar();
  const [mostrarModalCerrarSesion, setMostrarModalCerrarSesion] = useState(false);

  const menuItems = [
    { label: "Dashboard", icon: <BsSpeedometer2 />, path: "/admin/dashboard" },
    { label: "Perfil", icon: <BsPerson />, path: "/admin/perfil" },
    { label: "Configuración", icon: <BsGear />, path: "/admin/configuracion" },
    { label: "Usuarios", icon: <BsPeople />, path: "/admin/usuarios" },
    { label: "Productos", icon: <BsBox />, path: "/admin/productos" },
    { label: "Predicción de ventas", icon: <BsGraphUp />, path: "/admin/prediccion" },
    { label: "Empresa", icon: <BsBox />, path: "/admin/empresa" },
    { label: "Documentos legales", icon: <BsFileEarmarkText />, path: "/admin/documentos" },
    { label: "Empleados", icon: <BsPersonBadge />, path: "/admin/empleados" },
    { label: "Preguntas", icon: <BsQuestionCircle />, path: "/admin/preguntasFrecuentes" },
    { label: "Opiniones", icon: <BsChatDots />, path: "/admin/opiniones" },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 z-40 border-r border-gray-100 bg-gradient-to-b from-white to-blue-50 shadow-lg transition-all duration-500 ease-in-out h-[calc(100vh-4rem)]
      ${colapsado ? "w-20" : "w-64"} flex flex-col`}
    >
      {/* Botón de colapsar */}
      <div
        onClick={() => setColapsado(!colapsado)}
        className="absolute -right-3 top-4 bg-white border shadow-md p-1 rounded-full cursor-pointer hover:scale-105 transition-transform z-50"
      >
        {colapsado ? <BsArrowRightShort /> : <BsArrowLeftShort />}
      </div>

      {/* Contenedor scrollable superior */}
      <div className="flex-1 overflow-y-auto">
        {/* Encabezado fijo arriba */}
        <div className="px-3 py-4 border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
          {!colapsado && (
            <div>
              <p className="text-sm font-semibold text-gray-700">Administrador</p>
              {admin?.nombre && (
                <p className="text-sm text-blue-600 truncate">{admin.nombre}</p>
              )}
            </div>
          )}
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-1 px-2 py-3">
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
      </div>

      {/* Botón de cerrar sesión fijo abajo */}
      <div className="p-3 border-t border-gray-200 bg-white/80 backdrop-blur-sm sticky bottom-0">
        <button
          onClick={() => setMostrarModalCerrarSesion(true)}
          className={`flex items-center gap-3 p-2 rounded-lg text-sm font-medium w-full transition-all duration-200 
          text-red-600 hover:bg-red-100 hover:text-red-700 ${
            colapsado ? "justify-center" : "pl-4"
          }`}
          title={colapsado ? "Cerrar sesión" : ""}
        >
          <BsBoxArrowRight />
          {!colapsado && "Cerrar sesión"}
        </button>
      </div>

      <CerrarSesionModal
        visible={mostrarModalCerrarSesion}
        onClose={() => setMostrarModalCerrarSesion(false)}
      />
    </aside>
  );
};

export default Sidebar;
