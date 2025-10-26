import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../ApiConexion.js";
import ModalDetalle from "./modales/DetalleProducto";
import ModalGeneral from "./crear/ModalGeneral";
import ModalConfirmacionEliminar from "./modales/ModalConfirmacionEliminar";
import CargandoBarra from "../../Animations/CargandoBarra";
import CargandoModal from "../../Animations/CargandoModal.js";
import { FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import { motion } from "framer-motion";

const ProductosLista = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCrearVisible, setModalCrearVisible] = useState(false);
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false);
  const [cargando, setCargando] = useState(false);

  const cargarProductos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/productos/obtener`);
      setProductos(response.data);
    } catch (err) {
      setError("No se pudo obtener los productos");
      console.error("Error al obtener los productos:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEliminarProducto = async (id) => {
    setCargando(true);
    try {
      await axios.delete(`${API_URL}/api/productos/eliminar/${id}`);
      setProductos(productos.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Error al eliminar el producto:", err);
      alert("No se pudo eliminar el producto");
    } finally {
      setCargando(false);
    }
  };

  const handleVerDetalles = (producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true);
  };

  const handleCerrarModal = () => {
    setModalVisible(false);
    setProductoSeleccionado(null);
  };

  const handleAbrirModalCrear = () => setModalCrearVisible(true);
  const handleCerrarModalCrear = () => setModalCrearVisible(false);
  const handleAbrirModalEliminar = (producto) => {
    setProductoSeleccionado(producto);
    setModalEliminarVisible(true);
  };
  const handleCerrarModalEliminar = () => setModalEliminarVisible(false);

  if (loading) return <CargandoBarra message="Cargando productos..." />;
  if (error)
    return <div className="text-center text-red-500 font-medium">{error}</div>;

  return (
    <motion.section
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 py-10 bg-gradient-to-b from-blue-50 via-white to-blue-50 rounded-3xl shadow-2xl border border-blue-100 animate-fade-in-up"
    >
      {/* === Encabezado === */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-6 mb-8">
        <div className="text-center sm:text-left space-y-1">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Lista de Productos
          </h2>
          <p className="text-gray-500 text-sm">
            Gestiona tus productos, visualiza su stock y elimina los que ya no estén disponibles.
          </p>
        </div>

        <button
          onClick={handleAbrirModalCrear}
          className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-3 rounded-full shadow-md hover:bg-blue-700 active:bg-blue-800 transition-all duration-200 text-sm sm:text-base font-semibold w-full sm:w-auto"
        >
          <FaPlusCircle size={18} />
          <span>Agregar producto</span>
        </button>
      </div>

      {/* === Resumen === */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 text-center sm:text-left">
        <p className="text-gray-600 text-sm sm:text-base">
          Total de productos:{" "}
          <span className="text-blue-600 font-bold">{productos.length}</span>
        </p>
      </div>

      {/* === Contenedor === */}
      <div className="bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden">
        {/* Cabecera de tabla */}
        <div className="hidden md:grid grid-cols-5 gap-4 text-center font-semibold text-blue-700 bg-blue-50 py-4 px-4 uppercase text-xs tracking-wider">
          <div>Imagen</div>
          <div>Nombre</div>
          <div>Precio</div>
          <div>Stock</div>
          <div>Acciones</div>
        </div>

        {/* === Vista tipo cards (responsive) === */}
        <div className="block md:hidden p-4">
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="bg-gradient-to-b from-white to-blue-50 border border-gray-100 rounded-2xl shadow-sm mb-5 p-5 transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-semibold text-gray-800 text-lg truncate">
                  {producto.nombre}
                </h3>
                <span
                  className={`text-sm font-semibold ${
                    producto.stock <= 5 ? "text-red-500" : "text-gray-600"
                  }`}
                >
                  Stock: {producto.stock}
                </span>
              </div>
              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <img
                  src={producto.imagen}
                  alt={producto.nombre}
                  className="w-full sm:w-32 h-32 object-cover rounded-xl shadow-sm"
                />
                <div className="flex-1 space-y-3">
                  <p className="text-green-600 font-semibold text-lg">
                    ${producto.precio}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={() => handleVerDetalles(producto)}
                      className="btn-principal flex-1 sm:flex-none"
                    >
                      Ver detalles
                    </button>
                    <button
                      onClick={() => handleAbrirModalEliminar(producto)}
                      className="btn-eliminar flex-1 sm:flex-none flex items-center justify-center gap-2"
                    >
                      <FaTrashAlt size={14} />
                      <span className="hidden sm:inline">Eliminar</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* === Tabla en escritorio === */}
        {productos.length > 0 ? (
          <div className="hidden md:block divide-y divide-gray-100">
            {productos.map((producto) => (
              <div
                key={producto.id}
                className="grid grid-cols-5 gap-4 text-center py-4 px-4 hover:bg-blue-50 transition-all duration-200 items-center"
              >
                {/* Imagen */}
                <div className="flex justify-center items-center">
                  <img
                    src={producto.imagen}
                    alt={producto.nombre}
                    className="w-20 h-20 object-cover rounded-lg shadow-sm"
                  />
                </div>

                {/* Nombre */}
                <div className="text-gray-800 font-medium text-left truncate">
                  {producto.nombre}
                </div>

                {/* Precio */}
                <div className="text-green-600 font-semibold text-lg">
                  ${producto.precio}
                </div>

                {/* Stock */}
                <div
                  className={`text-lg font-semibold ${
                    producto.stock <= 5 ? "text-red-500" : "text-gray-700"
                  }`}
                >
                  {producto.stock}
                </div>

                {/* Acciones */}
                <div className="flex justify-center items-center gap-3">
                  <button
                    onClick={() => handleVerDetalles(producto)}
                    className="btn-principal px-3 py-1 text-sm"
                  >
                    Ver detalles
                  </button>
                  <button
                    onClick={() => handleAbrirModalEliminar(producto)}
                    className="btn-eliminar px-3 py-1 flex items-center justify-center"
                  >
                    <FaTrashAlt size={15} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center text-gray-500 py-10 italic bg-gray-50">
            No hay productos registrados.
          </div>
        )}
      </div>

      {/* === Modales === */}
      {modalVisible && (
        <ModalDetalle
          visible={modalVisible}
          producto={productoSeleccionado}
          onClose={handleCerrarModal}
        />
      )}
      {modalCrearVisible && (
        <ModalGeneral
          visible={modalCrearVisible}
          onClose={handleCerrarModalCrear}
          onProductoCreado={cargarProductos}
        />
      )}
      {modalEliminarVisible && (
        <ModalConfirmacionEliminar
          visible={modalEliminarVisible}
          onClose={handleCerrarModalEliminar}
          onConfirm={() => handleEliminarProducto(productoSeleccionado.id)}
          producto={productoSeleccionado}
        />
      )}
      {cargando && (
        <CargandoModal mensaje="Eliminando producto..." visible={cargando} />
      )}
    </motion.section>
  );
};

export default ProductosLista;
