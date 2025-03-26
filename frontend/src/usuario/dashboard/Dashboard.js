import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate, Link, Routes, Route } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaBox, FaShoppingCart, FaClipboardList, FaUserCircle } from 'react-icons/fa';
import { dashboardAnimation } from '../../components/Funciones.js';
import Perfil from '../perfil/Perfil.js';
/* import Productos from '../productos/Productos';
import Carrito from '../carrito/Carrito';
import Pedidos from '../pedidos/Pedidos'; */

const DashboardUsuario = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);

      if (!decoded.rol || decoded.rol !== 'usuario') {
        navigate('/login');
      }
    } catch (error) {
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return <div className="text-center text-xl">Cargando...</div>;

  return (
    <motion.div {...dashboardAnimation} className="p-6">
      <h1 className="text-3xl font-bold mb-6">Dashboard - Usuario</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/usuario/perfil" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
          <FaUserCircle className="text-4xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold">Mi Perfil</h2>
          <p className="text-gray-500 mt-2">Gestiona tu información personal.</p>
        </Link>

        <Link to="/usuario/productos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
          <FaBox className="text-4xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold">Ver Productos</h2>
          <p className="text-gray-500 mt-2">Explora el catálogo de productos.</p>
        </Link>

        <Link to="/usuario/carrito" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
          <FaShoppingCart className="text-4xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold">Ver Carrito</h2>
          <p className="text-gray-500 mt-2">Revisa los productos agregados al carrito.</p>
        </Link>

        <Link to="/usuario/pedidos" className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105">
          <FaClipboardList className="text-4xl text-gray-700 mb-4" />
          <h2 className="text-xl font-semibold">Mis Pedidos</h2>
          <p className="text-gray-500 mt-2">Consulta el estado de tus pedidos.</p>
        </Link>
      </div>

      <Routes>
        <Route path="/usuario/perfil" element={<Perfil />} />
        {/* <Route path="/usuario/productos" element={<Productos />} />
        <Route path="/usuario/carrito" element={<Carrito />} />
        <Route path="/usuario/pedidos" element={<Pedidos />} /> */}
      </Routes>
    </motion.div>
  );
};

export default DashboardUsuario;