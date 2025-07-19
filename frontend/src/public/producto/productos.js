import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../ApiConexion.js";
import CargandoBarra from "../../Animations/CargandoBarra";
import { useLocation, useNavigate} from "react-router-dom";
import Filtros from "./filtros/Filtros";
import { agregarAlCarrito } from "./carrito/agregar.js";
import useSesionUsuario from "../../context/useSesionUsuario";
import ModalAutenticacion from "../autenticacion/Autenticacion";
import CargandoModal from "../../Animations/CargandoModal.js";
import useBuscarProductos from "./buscar/buscar";
import ProductosGrid from "./ProductosGrid.js"

const Productos = () => {
  const [productos, setProductos] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("");
  const [cargandoInicial, setCargandoInicial] = useState(true);
  const [cargandoFiltro, setCargandoFiltro] = useState(false);
  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargandoCarrito, setCargandoCarrito] = useState(false);
  const { usuarioAutenticado, id } = useSesionUsuario();
  const [sinResultados, setSinResultados] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const terminoBusqueda = queryParams.get("buscar");
  const { productosFiltrados, cargando: cargandoBusqueda, sinResultados: sinResultadosBusqueda } = useBuscarProductos(terminoBusqueda);

  const navigate = useNavigate();


  const shuffleArray = (array) => {
    return array
      .map(value => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);
  };

  const handleAgregarCarrito = async (producto_id) => {
    if (!usuarioAutenticado) {
      setMostrarModal(true);
      return;
    }
    setCargandoCarrito(true);
    try {
      await agregarAlCarrito({ producto_id, usuario_id: id });
    } catch (error) {
      alert("Error al agregar al carrito.");
    }finally{
      setCargandoCarrito(false);
    }
  };
  
  const fetchProductos = async (tipo = "inicial") => {
    if (tipo === "inicial") setCargandoInicial(true);
    else setCargandoFiltro(true);

    try {
      let url = `${API_URL}/api/productos/filtrar`;
      const params = new URLSearchParams();
      if (categoriaSeleccionada) params.append("categoria_id", categoriaSeleccionada);
      if (subcategoriaSeleccionada) params.append("subcategoria_id", subcategoriaSeleccionada);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await axios.get(url);
      setProductos(shuffleArray(res.data));
      setSinResultados(res.data.length === 0);
    } catch (error) {
      console.error("Error al obtener productos:", error);
    } finally {
      if (tipo === "inicial") setCargandoInicial(false);
      else setCargandoFiltro(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProductos("inicial");
    }, 100); // pequeño retraso intencional para carga visual más suave
  
    return () => clearTimeout(timeout);
  }, []);
  
  useEffect(() => {
    if (categoriaSeleccionada || subcategoriaSeleccionada) {
      fetchProductos("filtro");
    }
  }, [categoriaSeleccionada, subcategoriaSeleccionada]);

  if (cargandoInicial) return <CargandoBarra />;

  return (
    <section className="pt-0 pb-16 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">Nuestros Productos</h2>

        {/* Botones flotantes en la esquina superior derecha */}
        <div className="fixed top-24 right-6 z-40 flex flex-col items-end gap-2">
        <button
          onClick={() => {
            setCategoriaSeleccionada("");
            setSubcategoriaSeleccionada("");
            fetchProductos("/cuerpo"); // vuelve a cargar productos
          }}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 text-sm font-medium transition"
        >
          Todos los productos
        </button>

          <button
            onClick={() => setMostrarSidebar(true)}
            className="px-3 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 text-sm font-medium transition flex items-center gap-1"
          >
            <i className="fas fa-sliders-h"></i>
            Filtros
          </button>
        </div>
        {cargandoFiltro || cargandoBusqueda ? (
        <CargandoBarra />
          ) : terminoBusqueda ? (
            sinResultadosBusqueda ? (
              <div className="text-center text-gray-600 text-lg font-medium py-12">
                No se encontraron productos para "{terminoBusqueda}".
              </div>
            ) : (
              <ProductosGrid productos={productosFiltrados} />
            )
          ) : sinResultados ? (
            <div className="text-center text-gray-600 text-lg font-medium py-12">
              No se encontraron productos para los filtros seleccionados.
            </div>
          ) : (
            <ProductosGrid productos={productos} />
          )}

      </div>

      {/* Sidebar Filtros */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-lg z-50 transition-transform transform ${
          mostrarSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="text-lg font-semibold">Filtrar Productos</h3>
          <button onClick={() => setMostrarSidebar(false)} className="btn-principal">✖</button>
        </div>

        <Filtros
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          subcategoriaSeleccionada={subcategoriaSeleccionada}
          setSubcategoriaSeleccionada={setSubcategoriaSeleccionada}
          cerrarSidebar={() => setMostrarSidebar(false)}
        />
      </div>
      {mostrarModal && (
        <ModalAutenticacion onClose={() => setMostrarModal(false)} />
      )}
      {cargandoCarrito && (
        <CargandoModal mensaje="Agregando al carrito..." visible={cargandoCarrito} />
      )}

    </section>
  );
};

export default Productos;
