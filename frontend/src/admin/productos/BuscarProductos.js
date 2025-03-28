import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaSearch } from 'react-icons/fa';  // Importamos el ícono de búsqueda
import { API_URL } from '../../ApiConexion';


const BuscarProducto = ({ setProductos, setError, setLoading }) => {
  const [searchTerm, setSearchTerm] = useState('');  // Almacena el término de búsqueda actual
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');  // Almacena el término después del debounce

  // Handle changes to the search input
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);  // Actualiza el término de búsqueda con lo que el usuario escribe
  };

  // Implementación de debounce para esperar antes de hacer la llamada a la API después de que el usuario deje de escribir
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);  // Actualiza el término de búsqueda después de un retraso
    }, 2000);  // 2000ms de retraso para evitar hacer una solicitud en cada pulsación de tecla

    return () => clearTimeout(timer);  // Borra el temporizador si el término de búsqueda cambia antes de que termine el retraso
  }, [searchTerm]);

  // Cuando el término de búsqueda con debounce cambia, realiza la búsqueda
  useEffect(() => {
    // Función para buscar productos basado en el término de búsqueda
    const buscarProductos = async () => {
      if (debouncedSearchTerm.trim() === '') {
        setProductos([]);  // Limpiar resultados si el término de búsqueda está vacío
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await axios.get(`${API_URL}/api/admin/buscar?nombre=${debouncedSearchTerm}`, {
          withCredentials: true,
        });
        setProductos(response.data);  // Establece los productos encontrados basado en el término de búsqueda
      } catch (err) {
        setError('No se pudo obtener los productos');
        console.error('Error al obtener los productos:', err);
      } finally {
        setLoading(false);  // Detiene el estado de carga
      }
    };

    if (debouncedSearchTerm) {
      buscarProductos();  // Llama a la función de búsqueda cuando el término de búsqueda con debounce cambia
    }
  }, [debouncedSearchTerm, setError, setLoading, setProductos]);  // Añadir estas funciones como dependencias

  return (
    <div className="mb-6 flex items-center justify-center">
      <div className="relative w-full md:w-96">
        <input
          type="text"
          value={searchTerm}  // El valor del input está vinculado al `searchTerm`
          onChange={handleSearchChange}  // Llama a la función `handleSearchChange` cuando el usuario escribe
          placeholder="Buscar producto..."
          className="w-full p-4 pl-12 border border-gray-300 rounded-lg shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-300 ease-in-out hover:bg-gray-50 focus:ring-offset-2 focus:ring-offset-gray-100 text-xl placeholder-gray-500"
          autoFocus  // Asegura que el cursor esté en el campo de entrada al cargar la página
        />
        <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
      </div>
    </div>
  );
};

export default BuscarProducto;
