import React from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../ApiConexion";
import { NavLink } from "react-router-dom";
import { useSidebar } from "../../context/SidebarContext"; 

import {
  FaCog,
  FaUsers,
  FaUser,
  FaBox,
  FaUserTie,
  FaQuestionCircle,
  FaChartLine,
  FaTachometerAlt,
  FaKey,
  FaAngleLeft,
  FaAngleRight,
  FaSignOutAlt
} from "react-icons/fa";

const Sidebar = ({ admin }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { colapsado, setColapsado } = useSidebar(); 

  const menuItems = [
    { label: "Dashboard", icon: <FaTachometerAlt />, path: "/admin/dashboard" },
    { label: "Perfil", icon: <FaUser/>, path: "/admin/perfil" },
    { label: "Configuración", icon: <FaCog />, path: "/admin/configuracion" },
    { label: "Usuarios", icon: <FaUsers />, path: "/admin/usuarios" },
    { label: "Productos", icon: <FaBox />, path: "/admin/productos" },
    { label: "Empresa", icon: <FaBox />, path: "/admin/empresa" },
    { label: "Empleados", icon: <FaUserTie />, path: "/admin/empleados" },
    { label: "Preguntas", icon: <FaQuestionCircle />, path: "/admin/preguntasFrecuentes" },
    { label: "Análisis", icon: <FaChartLine />, path: "/admin/gestionProductos" },
  ];
  const menuItems2 = [
    { label: "Cerrar sesión", icon: <FaKey />, path: "/cerrar-sesion" },
  ];

  const handleLogout = async () => {
    const confirmar = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "¿Estás seguro de que deseas cerrar sesión?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar",
    });
  
    if (confirmar.isConfirmed) {
      try {
        await axios.post(`${API_URL}/api/autenticacion/logout`, {}, { withCredentials: true });
        logout();
        navigate("/");
      } catch (error) {
        Swal.fire({
          icon: "error",
          title: "Error al cerrar sesión",
          text: "Ocurrió un problema al cerrar sesión.",
        });
      }
    }
  };

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
                  ? "bg-black text-white"
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
      <div className="mt-10 pt-4 border-t">
      <button
        onClick={handleLogout}
        className={`flex items-center gap-3 p-2 rounded-md text-sm font-medium text-red-600 hover:bg-red-100 transition-all w-full ${
          colapsado ? "justify-center" : ""
        }`}
        title={colapsado ? "Cerrar sesión" : ""}
      >
        <FaSignOutAlt />
        {!colapsado && "Cerrar sesión"}
      </button>
    </div>

    </aside>
  );
};

export default Sidebar;
