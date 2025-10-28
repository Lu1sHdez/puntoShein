import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../ApiConexion.js";
import CargandoBarra from "../../Animations/CargandoBarra";
import { useLocation } from "react-router-dom";
import Filtros from "./filtros/Filtros";
import ModalAutenticacion from "../autenticacion/Autenticacion";
import CargandoModal from "../../Animations/CargandoModal.js";
import useBuscarProductos from "./buscar/buscar";
import ProductosGrid from "./ProductosGrid.js";

const Productos = () => {
  const [estado, setEstado] = useState({
    productos: [],
    cargando: true,
    sinResultados: false,
  });
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [subcategoriaSeleccionada, setSubcategoriaSeleccionada] = useState("");
  const [mostrarSidebar, setMostrarSidebar] = useState(false);
  const [mostrarModal, setMostrarModal] = useState(false);
  const [cargandoCarrito] = useState(false);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const terminoBusqueda = queryParams.get("buscar");

  const {
    productosFiltrados,
    cargando: cargandoBusqueda,
    sinResultados: sinResultadosBusqueda,
  } = useBuscarProductos(terminoBusqueda);

  // === Función para mezclar productos aleatoriamente ===
  const shuffleArray = (array) =>
    array
      .map((value) => ({ value, sort: Math.random() }))
      .sort((a, b) => a.sort - b.sort)
      .map(({ value }) => value);

  // === Obtener productos ===
  const fetchProductos = async (tipo = "inicial", signal) => {
    if (tipo === "inicial")
      setEstado((prev) => ({ ...prev, cargando: true }));

    try {
      let url = `${API_URL}/api/productos/filtrar`;
      const params = new URLSearchParams();

      if (categoriaSeleccionada)
        params.append("categoria_id", categoriaSeleccionada);
      if (subcategoriaSeleccionada)
        params.append("subcategoria_id", subcategoriaSeleccionada);

      if (params.toString()) url += `?${params.toString()}`;

      const res = await axios.get(url, { signal });

      setEstado({
        productos: shuffleArray(res.data),
        cargando: false,
        sinResultados: res.data.length === 0,
      });
    } catch (error) {
      if (axios.isCancel(error)) return; // Evita errores por abortar solicitud
      console.error("Error al obtener productos:", error);
      setEstado((prev) => ({ ...prev, cargando: false }));
    }
  };

  // === Carga inicial ===
  useEffect(() => {
    const controller = new AbortController();
    const timeout = setTimeout(() => fetchProductos("inicial", controller.signal), 150);
    return () => {
      controller.abort();
      clearTimeout(timeout);
    };
  }, []);

  // === Filtro dinámico ===
  useEffect(() => {
    const controller = new AbortController();
    if (categoriaSeleccionada || subcategoriaSeleccionada)
      fetchProductos("filtro", controller.signal);

    return () => controller.abort();
  }, [categoriaSeleccionada, subcategoriaSeleccionada]);

  // === Bloquear scroll cuando el sidebar está abierto ===
  useEffect(() => {
    document.body.style.overflow = mostrarSidebar ? "hidden" : "auto";
  }, [mostrarSidebar]);

  const { productos, cargando, sinResultados } = estado;

  // === Determinar qué mostrar según la búsqueda o filtros ===
  const productosAMostrar = terminoBusqueda ? productosFiltrados : productos;
  const cargandoActual = cargando || cargandoBusqueda;
  const sinResultadosActual = terminoBusqueda
    ? sinResultadosBusqueda
    : sinResultados;

  if (cargandoActual) return <CargandoBarra />;

  return (
    <section className="pt-0 pb-20 bg-gray-50 min-h-screen relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
        {/* Encabezado */}
        <div className="sticky top-0 bg-gray-50 z-30 py-6 flex justify-between items-center border-b border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 animate-fade-in-up">
            Nuestros Productos
          </h2>
          <div className="flex gap-2">
            <button
              aria-label="Ver todos los productos"
              onClick={() => {
                setCategoriaSeleccionada("");
                setSubcategoriaSeleccionada("");
                fetchProductos("inicial");
              }}
              className="btn-secundario hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Todos
            </button>

            <button
              aria-label="Mostrar filtros"
              onClick={() => setMostrarSidebar(true)}
              className="btn-principal flex items-center gap-1 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              <i className="fas fa-sliders-h"></i> Filtros
            </button>
          </div>
        </div>

        {/* Contenido principal */}
        {sinResultadosActual ? (
          <div className="text-center text-gray-600 text-lg font-medium py-12 animate-fade-in-up">
            No se encontraron productos{" "}
            {terminoBusqueda && `para "${terminoBusqueda}"`}.
          </div>
        ) : (
          <ProductosGrid productos={productosAMostrar} />
        )}
      </div>

      {/* Sidebar Filtros */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 transform transition-transform duration-500 ease-in-out ${
          mostrarSidebar ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex justify-between items-center bg-gray-50/80 backdrop-blur-md">
          <h3 className="text-lg font-semibold text-gray-800">
            Filtrar Productos
          </h3>
          <button
            onClick={() => setMostrarSidebar(false)}
            className="text-gray-600 hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        <Filtros
          categoriaSeleccionada={categoriaSeleccionada}
          setCategoriaSeleccionada={setCategoriaSeleccionada}
          subcategoriaSeleccionada={subcategoriaSeleccionada}
          setSubcategoriaSeleccionada={setSubcategoriaSeleccionada}
          cerrarSidebar={() => setMostrarSidebar(false)}
        />
      </div>

      {/* Overlay al abrir filtros */}
      {mostrarSidebar && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
          onClick={() => setMostrarSidebar(false)}
        ></div>
      )}

      {/* Modales */}
      {mostrarModal && (
        <ModalAutenticacion onClose={() => setMostrarModal(false)} />
      )}
      {cargandoCarrito && (
        <CargandoModal
          mensaje="Agregando al carrito..."
          visible={cargandoCarrito}
        />
      )}
    </section>
  );
};

export default Productos;
