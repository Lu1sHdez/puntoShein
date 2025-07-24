import React,{useState} from "react";
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
  FaSignOutAlt
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
    { label: "Empresa", icon: <FaBox />, path: "/admin/empresa" },
    { label: "Documentos legales", icon: <FaFileAlt/>, path: "/admin/documentos" },
    { label: "Empleados", icon: <FaUserTie />, path: "/admin/empleados" },
    { label: "Preguntas", icon: <FaQuestionCircle />, path: "/admin/preguntasFrecuentes" },
    { label: "Análisis", icon: <FaChartLine />, path: "/admin/gestionProductos" },
    { label: "Opiniones", icon: <FaCommentDots />, path: "/admin/opiniones" }
  ];

  return (
    <aside
      className={`bg-white border-r shadow-md p-4 fixed top-16 left-0 z-40 pt-4 transition-all duration-300 overflow-y-auto ${
        colapsado ? "w-20" : "w-64"
      } h-[calc(100vh-4rem)]`}
    >
      <div
        className="absolute top-4 right-[-1px] bg-white border rounded-full shadow p-1 z-50 cursor-pointer"
        onClick={() => setColapsado(!colapsado)}
      >
        {colapsado ? <FaAngleRight /> : <FaAngleLeft />}
      </div>

      {!colapsado && (
        <div className="mb-4 border-b pb-3">
          <p className="text-sm font-semibold text-black">
            Administrador{admin?.nombre ? ` - ${admin.nombre}` : ""}
          </p>
        </div>
      )}

      <nav className="flex flex-col gap-4">
        {menuItems.map((item, idx) => (
          <NavLink
            key={idx}
            to={item.path}
            className={({ isActive }) =>
              `flex items-center gap-3 p-2 rounded-md text-sm font-medium transition-all ${
                isActive ? "bg-black text-white" : "text-gray-700 hover:bg-gray-100"
              } ${colapsado ? "justify-center" : ""}`
            }
            title={colapsado ? item.label : ""}
          >
            {item.icon}
            {!colapsado && item.label}
          </NavLink>
        ))}
      </nav>

      <button
        onClick={() => setMostrarModalCerrarSesion(true)}
        className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition-all w-full ${
          colapsado ? "justify-center" : ""
        }`}
        title={colapsado ? "Cerrar sesión" : ""}
      >
        <FaSignOutAlt />
        {!colapsado && "Cerrar sesión"}
      </button>
      <CerrarSesionModal
        visible={mostrarModalCerrarSesion}
        onClose={() => setMostrarModalCerrarSesion(false)}
      />
    </aside>
    
  );
};

export default Sidebar;
