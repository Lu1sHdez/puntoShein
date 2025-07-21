import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import useAuth from "../../hooks/useAuth";
import { useSidebar } from '../../context/SidebarContext';
import CerrarSesionModal from '../../modal/CerrarSesion';
import { Cargando } from '../../Animations/Cargando';

import {
  FaUserCircle,
  FaBox,
  FaShoppingCart,
  FaClipboardList,
  FaHome,
  FaAngleLeft,
  FaAngleRight,
  FaSignOutAlt
} from 'react-icons/fa';

const SidebarUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const { colapsado, setColapsado } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [mostrarModalCerrarSesion, setMostrarModalCerrarSesion] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    try {
      const decoded = jwtDecode(token);
      if (decoded.rol !== 'usuario') return navigate('/login');
      setUsuario(decoded);
    } catch {
      navigate('/login');
    }
  }, [navigate]);

  if (!usuario) return <Cargando message="Cargando menú..." />;

  const links = [
    { to: '/usuario/dashboard', label: 'Inicio', icon: <FaHome /> },
    { to: '/usuario/perfil', label: 'Mi Perfil', icon: <FaUserCircle /> },
    { to: '/usuario/productos', label: 'Productos', icon: <FaBox /> },
    { to: '/usuario/carrito', label: 'Carrito', icon: <FaShoppingCart /> },
    { to: '/usuario/pedidos', label: 'Mis Pedidos', icon: <FaClipboardList /> },
  ];

  return (
    <>
      <aside
        className={`bg-white border-r shadow-md p-4 fixed top-16 left-0 z-40 pt-4 transition-all duration-300 overflow-y-auto ${
          colapsado ? "w-20" : "w-64"
        } h-[calc(100vh-4rem)]`}
      >
        <div
          className="absolute top-4 right-[-8px] bg-white border rounded-full shadow p-1 z-50 cursor-pointer"
          onClick={() => setColapsado(!colapsado)}
        >
          {colapsado ? <FaAngleRight /> : <FaAngleLeft />}
        </div>

        <nav className="space-y-2 mt-4">
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              title={colapsado ? link.label : ""}
              className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
                location.pathname === link.to
                  ? 'bg-black text-white shadow'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-black'
              } ${colapsado ? 'justify-center' : ''}`}
            >
              <span className="text-lg">{link.icon}</span>
              {!colapsado && <span>{link.label}</span>}
            </Link>
          ))}
        </nav>

        <div className="mt-10 pt-4 border-t">
          <button
            onClick={() => setMostrarModalCerrarSesion(true)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium text-red-600 hover:bg-red-100 transition w-full ${
              colapsado ? "justify-center" : ""
            }`}
            title={colapsado ? "Cerrar sesión" : ""}
          >
            <span className="text-lg"><FaSignOutAlt /></span>
            {!colapsado && <span>Cerrar sesión</span>}
          </button>
        </div>
      </aside>

      {/* Modal de cerrar sesión */}
      <CerrarSesionModal
        visible={mostrarModalCerrarSesion}
        onClose={() => setMostrarModalCerrarSesion(false)}
      />
    </>
  );
};

export default SidebarUsuario;
