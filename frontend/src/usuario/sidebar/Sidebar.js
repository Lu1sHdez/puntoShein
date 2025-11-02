import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useSidebar } from "../../context/SidebarContext";
import CerrarSesionModal from "../../modal/CerrarSesion";
import { Cargando } from "../../Animations/Cargando";
import {
  BsPersonCircle,
  BsBoxSeam,
  BsCart3,
  BsClipboardCheck,
  BsHouseDoor,
  BsArrowLeftShort,
  BsArrowRightShort,
  BsBoxArrowRight,
} from "react-icons/bs";

const SidebarUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const { colapsado, setColapsado } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const [mostrarModalCerrarSesion, setMostrarModalCerrarSesion] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return navigate("/login");

    try {
      const decoded = jwtDecode(token);
      if (decoded.rol !== "usuario") return navigate("/login");
      setUsuario(decoded);
    } catch {
      navigate("/login");
    }
  }, [navigate]);

  if (!usuario) return <Cargando message="Cargando menú..." />;

  const menuItems = [
    { label: "Dashboard", icon: <BsHouseDoor />, path: "/usuario/dashboard" },
    { label: "Mi Perfil", icon: <BsPersonCircle />, path: "/usuario/perfil" },
    { label: "Productos", icon: <BsBoxSeam />, path: "/usuario/productos" },
    { label: "Carrito", icon: <BsCart3 />, path: "/productos/carrito" },
    { label: "Mis Pedidos", icon: <BsClipboardCheck />, path: "/usuario/pedidos" },
  ];

  return (
    <aside
      className={`fixed top-16 left-0 z-40 border-r border-gray-100 bg-gradient-to-b from-white to-blue-50 shadow-lg transition-all duration-500 ease-in-out h-[calc(100vh-4rem)]
      ${colapsado ? "w-20" : "w-64"} flex flex-col`}
    >
      {/* === Botón de colapsar === */}
      <div
        onClick={() => setColapsado(!colapsado)}
        className="absolute -right-3 top-4 bg-white border shadow-md p-1 rounded-full cursor-pointer hover:scale-105 transition-transform z-50"
      >
        {colapsado ? <BsArrowRightShort /> : <BsArrowLeftShort />}
      </div>

      {/* === Contenedor principal con scroll === */}
      <div className="flex-1 overflow-y-auto">
        {/* Encabezado fijo */}
        <div className="px-3 py-4 border-b border-gray-200 sticky top-0 bg-white/80 backdrop-blur-sm z-10">
          {!colapsado && (
            <div>
              <p className="text-sm font-semibold text-gray-700">Usuario</p>
              {usuario?.nombre && (
                <p className="text-sm text-blue-600 truncate">{usuario.nombre}</p>
              )}
            </div>
          )}
        </div>

        {/* Navegación */}
        <nav className="flex flex-col gap-1 px-2 py-3">
          {menuItems.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              className={`flex items-center gap-3 p-2 rounded-lg text-sm font-medium transition-all duration-200
              ${
                location.pathname === item.path
                  ? "bg-blue-600 text-white shadow-md"
                  : "text-gray-700 hover:bg-blue-100 hover:text-blue-700"
              }
              ${colapsado ? "justify-center" : "pl-4"}`}
              title={colapsado ? item.label : ""}
            >
              <span className="text-base">{item.icon}</span>
              {!colapsado && <span>{item.label}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* === Botón de cerrar sesión === */}
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

      {/* Modal de confirmación */}
      <CerrarSesionModal
        visible={mostrarModalCerrarSesion}
        onClose={() => setMostrarModalCerrarSesion(false)}
      />
    </aside>
  );
};

export default SidebarUsuario;
