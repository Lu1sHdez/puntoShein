import React from 'react';
import { Navigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';

const ProtectedRoute = ({ element: Component, allowedRoles }) => {
  const token = localStorage.getItem('token');

  if (!token) {
    return <Navigate to="/login" />;
  }

  try {
    const decoded = jwtDecode(token);

    // Verificar si el rol del usuario está permitido
    if (!allowedRoles.includes(decoded.rol)) {
      return <Navigate to="/login" />;
    }

    return <Component />; 
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default ProtectedRoute;
