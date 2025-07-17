import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";

const useBuscarProductos = (terminoBusqueda) => {
  const [productosFiltrados, setProductosFiltrados] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [sinResultados, setSinResultados] = useState(false);

  useEffect(() => {
    const buscar = async () => {
      if (!terminoBusqueda) return;

      setCargando(true);
      try {
        const res = await axios.get(`${API_URL}/api/productos/buscar?nombre=${terminoBusqueda}`);
        setProductosFiltrados(res.data);
        setSinResultados(res.data.length === 0);
      } catch (error) {
        console.error("Error al buscar productos:", error);
      } finally {
        setCargando(false);
      }
    };

    buscar();
  }, [terminoBusqueda]);

  return { productosFiltrados, cargando, sinResultados };
};

export default useBuscarProductos;
