import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useSidebar } from '../../context/SidebarContext';

import {
  FaUserCircle,
  FaBox,
  FaShoppingCart,
  FaClipboardList,
  FaHome,
  FaAngleLeft,
  FaAngleRight,
} from 'react-icons/fa';
import { Cargando } from '../../Animations/Cargando';

const SidebarUsuario = () => {
  const [usuario, setUsuario] = useState(null);
  const { colapsado, setColapsado } = useSidebar(); // ✅ CORRECTO
  const navigate = useNavigate();
  const location = useLocation();

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
    <aside
      className={`min-h-screen bg-white border-r shadow-md p-4 fixed top-16 left-0 z-40 transition-all duration-300 ${
        colapsado ? 'w-20' : 'w-64'
      }`}
    >
      {/* Botón colapsar */}
      <div
        className="absolute top-4 right-[-12px] bg-white border rounded-full shadow p-1 z-50 cursor-pointer"
        onClick={() => setColapsado(!colapsado)}
      >
        {colapsado ? <FaAngleRight /> : <FaAngleLeft />}
      </div>

      {/* Navegación */}
      <nav className="space-y-2 mt-4">
        {links.map((link) => (
          <Link
            key={link.to}
            to={link.to}
            title={colapsado ? link.label : ""}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition ${
              location.pathname === link.to
                ? 'bg-pink-600 text-white shadow'
                : 'text-gray-700 hover:bg-gray-100 hover:text-pink-600'
            } ${colapsado ? 'justify-center' : ''}`}
          >
            <span className="text-lg">{link.icon}</span>
            {!colapsado && <span>{link.label}</span>}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default SidebarUsuario;
