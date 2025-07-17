import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../ApiConexion.js";
import CargandoBarra from "../../Animations/CargandoBarra";
import { Link, useLocation, useNavigate} from "react-router-dom";
import Filtros from "./filtros/Filtros";
import { agregarAlCarrito } from "./carrito/agregar.js";
import useSesionUsuario from "../../context/useSesionUsuario";
import ModalAutenticacion from "../autenticacion/Autenticacion";
import CargandoModal from "../../Animations/CargandoModal.js";
import useBuscarProductos from "./buscar/buscar";


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
  const resetearFiltros = () => {
    setCategoriaSeleccionada("");
    setSubcategoriaSeleccionada("");
    fetchProductos("filtro"); // usa solo cargador secundario
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchProductos("inicial");
    }, 100); // pequeño retraso intencional para carga visual más suave
  
    return () => clearTimeout(timeout);
  }, []);
  

  // Cuando cambian los filtros
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
            // Eliminar el parámetro 'buscar' de la URL
            navigate("/cuerpo");
            // Llamar a fetchProductos para mostrar los productos sin filtros
            fetchProductos("inicial");
          }}
          className="px-3 py-2 bg-gray-200 text-gray-700 rounded shadow hover:bg-gray-300 text-sm font-medium transition"
        >
          Todos los productos
        </button>
          <button
            onClick={() => setMostrarSidebar(true)}
            className="px-3 py-2 bg-pink-600 text-white rounded shadow hover:bg-pink-700 text-sm font-medium transition flex items-center gap-1"
          >
            <i className="fas fa-sliders-h"></i>
            Filtros
          </button>
        </div>

        {cargandoFiltro || cargandoBusqueda ? (
            <CargandoBarra />
          ) : terminoBusqueda ? (
            sinResultadosBusqueda ? (
              <div className="text-center col-span-full text-gray-600 text-lg font-medium py-12">
                No se encontraron productos para "{terminoBusqueda}".
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
                {productosFiltrados.map((producto, index) => (
                  <div
                    key={producto.id}
                    className="bg-white rounded-lg shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden flex flex-col animate-fade-in-up"
                    style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                  >
                    {/* Imagen */}
                    <div className="aspect-[4/5] w-full overflow-hidden">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                      />
                    </div>

                    {/* Contenido */}
                    <div className="p-4 flex flex-col justify-between flex-1">
                      <div className="mb-3">
                        <h3 className="text-base font-semibold text-gray-800 truncate">
                          {producto.nombre}
                        </h3>
                        <p className="text-sm text-gray-500 line-clamp-2">
                          {producto.descripcion}
                        </p>
                      </div>
                      <div className="mt-auto">
                        <span className="block text-lg font-bold text-pink-600 mb-2">
                          ${producto.precio}
                        </span>
                        <div className="flex justify-between gap-2">
                          <Link
                            to={`/producto/${producto.id}`}
                            className="btn-ver flex-1 text-center"
                          >
                            Detalles
                          </Link>
                          <button
                            onClick={() => handleAgregarCarrito(producto.id)}
                            className="btn-agregar flex-1"
                          >
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )
          ) : sinResultados ? (
            <div className="text-center col-span-full text-gray-600 text-lg font-medium py-12">
              No se encontraron productos para los filtros seleccionados.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
              {productos.map((producto, index) => (
                <div
                  key={producto.id}
                  className="bg-white rounded-lg shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden flex flex-col animate-fade-in-up"
                  style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
                >
                  {/* Imagen */}
                  <div className="aspect-[4/5] w-full overflow-hidden">
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
                    />
                  </div>

                  {/* Contenido */}
                  <div className="p-4 flex flex-col justify-between flex-1">
                    <div className="mb-3">
                      <h3 className="text-base font-semibold text-gray-800 truncate">
                        {producto.nombre}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-2">
                        {producto.descripcion}
                      </p>
                    </div>
                    <div className="mt-auto">
                      <span className="block text-lg font-bold text-pink-600 mb-2">
                        ${producto.precio}
                      </span>
                      <div className="flex justify-between gap-2">
                        <Link
                          to={`/producto/${producto.id}`}
                          className="btn-ver flex-1 text-center"
                        >
                          Detalles
                        </Link>
                        <button
                          onClick={() => handleAgregarCarrito(producto.id)}
                          className="btn-agregar flex-1"
                        >
                          Agregar
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
