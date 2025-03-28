import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../ApiConexion";

const useBuscarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [debouncedNombre, setDebouncedNombre] = useState(""); // Almacenamos el término de búsqueda con debounce

  const buscarProductos = async (nombre) => {
    if (!nombre.trim()) {
      setProductos([]); // Limpiar productos si no hay término de búsqueda
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`${API_URL}/api/productos/buscar?nombre=${nombre}`);
      setProductos(response.data); // Actualiza los productos con la respuesta de la API
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al buscar productos.");
      setProductos([]); // Vacía los productos en caso de error
    } finally {
      setLoading(false);
    }
  };

  // Utilizamos el "debounce" para esperar un poco antes de hacer la búsqueda
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedNombre(debouncedNombre);
    }, 500); // Espera 500ms después de que el usuario deje de escribir

    return () => clearTimeout(timer); // Limpiar el temporizador si el término cambia antes del retraso
  }, [debouncedNombre]);

  useEffect(() => {
    if (debouncedNombre) {
      buscarProductos(debouncedNombre); // Ejecuta la búsqueda cuando `debouncedNombre` cambia
    }
  }, [debouncedNombre]);

  return { productos, loading, error, setDebouncedNombre }; // Devolvemos `setDebouncedNombre` para poder actualizar el término de búsqueda
};

export default useBuscarProductos;
