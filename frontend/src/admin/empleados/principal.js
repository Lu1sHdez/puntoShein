import React, { useEffect, useState } from 'react';
import EmpleadosRegistrados from './components/Empleados';
import NuevoEmpleado from './components/NuevoEmpleado';
import { API_URL } from '../../ApiConexion';
import axios from 'axios';

const PrincipalEmpleados = () => {
  const [seccionActiva, setSeccionActiva] = useState('todos');
  const [empleados, setEmpleados] = useState([]);
  const [cargando, setCargando] = useState(true);

  const obtenerEmpleados = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/empleado/obtener`, { withCredentials: true });
      setEmpleados(res.data.empleados);
    } catch (error) {
      console.error('Error al obtener empleados:', error);
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerEmpleados();
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Gestión de Empleados</h1>

      {/* Navegación estilo tabs */}
      <div className="border-b border-gray-300 mb-6">
        <nav className="flex space-x-6">
          <button
            onClick={() => setSeccionActiva('todos')}
            className={`pb-2 text-lg font-medium transition duration-200 relative ${
              seccionActiva === 'todos'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            Todos los empleados
          </button>
          <button
            onClick={() => setSeccionActiva('agregar')}
            className={`pb-2 text-lg font-medium transition duration-200 relative ${
              seccionActiva === 'agregar'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-500 hover:text-blue-500'
            }`}
          >
            Agregar empleado
          </button>
        </nav>
      </div>

      {/* Contenido dinámico */}
      <div className="mt-4">
        {seccionActiva === 'todos' ? (
          <EmpleadosRegistrados empleados={empleados} cargando={cargando} />
        ) : (
          <NuevoEmpleado actualizarLista={obtenerEmpleados} />
        )}
      </div>
    </div>
  );
};

export default PrincipalEmpleados;
