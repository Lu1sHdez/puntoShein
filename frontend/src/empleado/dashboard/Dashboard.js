// src/empleado/dashboard/Dashboard.js
import React, { useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { useNavigate} from 'react-router-dom';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); // Usar useNavigate para la navegación

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

      // Si el rol no es válido o no es un "empleado", redirigir al login
      if (!decoded.rol || decoded.rol !== 'empleado') {
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
      <h2>Panel de Control - Empleado</h2>
      <ul>
        {/* Aquí agregas las opciones que el empleado puede ver y gestionar */}
        <li><a href="/empleado/tareas">Ver Tareas</a></li>
        <li><a href="/empleado/empleados">Ver Empleados</a></li>
        <li><a href="/empleado/productos">Ver Productos</a></li>
        <li><a href="/empleado/perfil">Mi Perfil</a></li>
      </ul>
    </div>
  );
};

export default Dashboard;
