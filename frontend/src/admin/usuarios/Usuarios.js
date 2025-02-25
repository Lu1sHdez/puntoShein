import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import RegresarButton from '../../components/Regresar.js';

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [rol, setRol] = useState('');
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Función para manejar el cambio en el filtro de roles
  const handleRoleChange = (event) => {
    const selectedRole = event.target.value;
    setRol(selectedRole);
  };

  // Función para manejar el cambio en el campo de búsqueda
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Debounce para la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search); // Actualizamos el estado del "debouncedSearch" después de un pequeño retraso
    }, 1000); // Ajusta el tiempo del retraso si es necesario

    return () => clearTimeout(timer); // Limpiamos el temporizador cuando se actualice el valor de 'search'
  }, [search]);

  // Función para obtener los usuarios según el rol y la búsqueda
  const fetchUsuarios = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/admin/usuarios?rol=${rol}&search=${debouncedSearch}`, {
        withCredentials: true,
      });
      setUsuarios(response.data);
    } catch (error) {
      setError('Error al obtener los usuarios');
      console.error('Error al obtener los usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  // Usamos useEffect para llamar a fetchUsuarios cuando el rol o la búsqueda cambian
  useEffect(() => {
    setLoading(true);
    fetchUsuarios();
  }, [rol, debouncedSearch]); // Solo actualizamos cuando 'debouncedSearch' cambia

  const handleEliminar = async (id) => {
    try {
      await axios.delete(`http://localhost:4000/api/admin/usuarios/${id}`, {
        withCredentials: true,
      });
      setUsuarios(usuarios.filter((usuario) => usuario.id !== id));
    } catch (error) {
      console.error('Error al eliminar el usuario:', error);
    }
  };

  const cambiarRol = async (userId, newRole) => {
    try {
      // Hacemos la solicitud PUT para actualizar el rol
      await axios.put(
        `http://localhost:4000/api/admin/usuarios/${userId}/rol`,
        { rol: newRole }, // Enviamos el nuevo rol
        { withCredentials: true }
      );
      // Si todo sale bien, actualizamos el rol del usuario en el estado
      setUsuarios(usuarios.map(usuario =>
        usuario.id === userId ? { ...usuario, rol: newRole } : usuario
      ));
      alert('Rol actualizado exitosamente');
    } catch (error) {
      console.error('Error al actualizar el rol:', error);
      alert('Hubo un problema al actualizar el rol');
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl mb-6">Gestión de Usuarios</h1>

      <div className="mb-4">
        <label htmlFor="roleFilter" className="mr-2">Filtrar por rol:</label>
        <select
          id="roleFilter"
          value={rol}
          onChange={handleRoleChange}
          className="p-2 border border-gray-300 rounded-md"
        >
          <option value="">Todos</option>
          <option value="usuario">Usuarios</option>
          <option value="administrador">Administradores</option>
          <option value="empleado">Empleados</option>
        </select>
      </div>

      <div className="mb-4">
        <label htmlFor="search" className="mr-2">Buscar usuario:</label>
        <input
          type="text"
          id="search"
          value={search} // Mantener el valor constante para el campo de búsqueda
          onChange={handleSearchChange}
          placeholder="Buscar por nombre o correo"
          className="p-2 border border-gray-300 rounded-md w-full"
        />
      </div>

      <div className="overflow-y-auto max-h-96 shadow-md sm:rounded-lg">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="sticky top-0 bg-gray-100">
            <tr>
              <th className="py-2 px-4 border-b font-bold">ID</th>
              <th className="py-2 px-4 border-b font-bold">Nombre</th>
              <th className="py-2 px-4 border-b font-bold">Correo</th>
              <th className="py-2 px-4 border-b font-bold">Rol</th>
              <th className="py-2 px-4 border-b font-bold">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuarios.map((usuario) => (
              <tr key={usuario.id}>
                <td className="py-2 px-4 border-b">{usuario.id}</td>
                <td className="py-2 px-4 border-b">{usuario.nombre}</td>
                <td className="py-2 px-4 border-b">{usuario.correo}</td>
                <td className="py-2 px-4 border-b">
                  <select
                    value={usuario.rol}
                    onChange={(e) => cambiarRol(usuario.id, e.target.value)} // Llamamos a la función para cambiar el rol
                    className="p-2 border border-gray-300 rounded-md"
                  >
                    <option value="usuario">Usuario</option>
                    <option value="administrador">Administrador</option>
                    <option value="empleado">Empleado</option>
                  </select>
                </td>

                <td className="py-2 px-4 border-b">
                  <button className="text-blue-500 hover:text-blue-700">Editar</button>
                  <button
                    className="text-red-500 hover:text-red-700 ml-4"
                    onClick={() => handleEliminar(usuario.id)}
                  >
                    Eliminar
                  </button>
                  <Link to={`/admin/usuarios/${usuario.id}`} className="text-green-500 hover:text-green-700 ml-4">
                    Ver más
                  </Link>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <RegresarButton />
    </div>
  );
};

export default Usuarios;
