// src/usuario/dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

const DashboardUsuario = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Usar useNavigate para navegación

  useEffect(() => {
    const token = localStorage.getItem('token');
    
    // Si no hay token, redirigir al login
    if (!token) {
      navigate('/login');
      return;
    }

    try {
      // Decodificar el token
      const decoded = jwtDecode(token);
      setUser(decoded);

      // Si el rol no es válido, redirigir al login
      if (!decoded.rol || decoded.rol !== 'usuario') {
        navigate('/login');
      }
    } catch (error) {
      // Si hay un error en la decodificación, redirigir al login
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return <div>Cargando...</div>;

  return (
    <div>
      <h1>Bienvenido, {user.nombre_usuario}</h1>
      <h2>Panel de Control - Usuario</h2>
      <ul>
        <li><a href="/perfil">Mi Perfil</a></li>
        <li><a href="/productos">Ver Productos</a></li>
        <li><a href="/carrito">Ver Carrito</a></li>
        <li><a href="/pedidos">Mis Pedidos</a></li> {/* Agrega una opción para ver pedidos */}
      </ul>
    </div>
  );
};

export default DashboardUsuario;
