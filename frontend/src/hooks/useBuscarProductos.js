import { useState } from "react";
import axios from "axios";

const useBuscarProductos = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const buscarProductos = async (nombre) => {
    setLoading(true);
    setError("");

    try {
      const response = await axios.get(`http://localhost:4000/api/productos/buscar?nombre=${nombre}`);
      setProductos(response.data);
    } catch (error) {
      setError(error.response?.data?.mensaje || "Error al buscar productos.");
      setProductos([]);
    } finally {
      setLoading(false);
    }
  };

  return { productos, loading, error, buscarProductos };
};

export default useBuscarProductos;
