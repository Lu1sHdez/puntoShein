import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../ApiConexion.js'; // Ajusta la importación según tu archivo de configuración
import ModalDetalle from './modales/DetalleProducto'; // Importamos el modal de detalle
import ModalGeneral from './crear/ModalGeneral'; // Importamos el modal para crear producto
import { FaPlusCircle, FaTrashAlt } from 'react-icons/fa'; // Icono para el botón de crear producto
import CargandoBarra from '../../Animations/CargandoBarra';
import ModalConfirmacionEliminar from './modales/ModalConfirmacionEliminar';  // Importamos el modal de confirmación
import CargandoModal from '../../Animations/CargandoModal.js';

const ProductosLista = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCrearVisible, setModalCrearVisible] = useState(false); // Estado para controlar el modal de creación
  const [productoSeleccionado, setProductoSeleccionado] = useState(null);
  const [modalEliminarVisible, setModalEliminarVisible] = useState(false); // Estado para el modal de eliminación
  const [cargando, setCargando] = useState(false); // Estado para mostrar el modal de carga


  const cargarProductos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/api/productos/obtener`);
      setProductos(response.data);
    } catch (err) {
      setError('No se pudo obtener los productos');
      console.error('Error al obtener los productos:', err);
    } finally {
      setLoading(false);
    }
  };
  // Obtener productos desde la API
  useEffect(() => {
    cargarProductos();
    const fetchProductos = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/productos/obtener`);
        setProductos(response.data);
      } catch (err) {
        setError('No se pudo obtener los productos');
        console.error('Error al obtener los productos:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProductos();
  }, []); // Solo se ejecuta al montar el componente
  

  // Función para eliminar un producto
  const handleEliminarProducto = async (id) => {
    setCargando(true); // Iniciar carga
    try {
      await axios.delete(`${API_URL}/api/productos/eliminar/${id}`);
      setProductos(productos.filter(producto => producto.id !== id)); // Eliminar de la lista localmente
    } catch (err) {
      setCargando(false); // Finalizar carga
      console.error('Error al eliminar el producto:', err);
      alert('No se pudo eliminar el producto');
    } finally {
      setCargando(false); // Finalizar carga
    }
  };

  // Mostrar barra de carga si los productos están cargando
  if (loading) return <CargandoBarra message="Cargando productos..." />;

  // Si ocurre un error al cargar productos
  if (error) return <div className="text-center text-red-500">{error}</div>;

  // Función para abrir el modal de detalles
  const handleVerDetalles = (producto) => {
    setProductoSeleccionado(producto);
    setModalVisible(true); // Abrimos el modal al hacer clic en "Ver Detalles"
  };

  // Función para cerrar el modal de detalles
  const handleCerrarModal = () => {
    setModalVisible(false);
    setProductoSeleccionado(null); // Limpiamos el producto seleccionado cuando se cierra el modal
  };

  // Función para abrir el modal de creación
  const handleAbrirModalCrear = () => {
    setModalCrearVisible(true); // Abrimos el modal de creación de producto
  };

  // Función para cerrar el modal de creación
  const handleCerrarModalCrear = () => {
    setModalCrearVisible(false); // Cerramos el modal de creación de producto
  };
  // Función para abrir el modal de confirmación de eliminación
  const handleAbrirModalEliminar = (producto) => {
    setProductoSeleccionado(producto);
    setModalEliminarVisible(true); // Abrimos el modal de eliminación
  };
  // Función para cerrar el modal de confirmación de eliminación
  const handleCerrarModalEliminar = () => {
    setModalEliminarVisible(false); // Cerramos el modal de eliminación
  };

  return (
    <div className="productos-lista relative p-6 bg-gray-50 rounded-lg shadow-lg">
      <h2 className="text-3xl font-semibold text-center mb-6 text-pink-600">Lista de Productos</h2>
      <div className="absolute top-6 left-6 text-sm text-gray-700 font-medium">
        Total de productos: <span className="text-pink-600 font-bold">{productos.length}</span>
      </div>


      {/* Botón Agregar producto */}
      <button
        title="Crear nuevo producto"
        aria-label="Crear Producto"
        className="absolute top-6 right-6 flex items-center gap-2 bg-gray-200 text-pink-600 px-4 py-2 rounded-full shadow-sm hover:bg-gray-300 transition-colors duration-200 z-10 text-sm font-medium border border-pink-300"
        onClick={handleAbrirModalCrear}
      >
        <FaPlusCircle size={16} />
        <span>Agregar otro producto</span>
      </button>


      {/* Tabla de productos */}
      <div className="productos-table overflow-x-auto bg-white shadow-md rounded-lg">
        <div className="productos-table-header grid grid-cols-5 gap-4 text-center font-semibold text-gray-700 bg-gray-100 py-3 px-4 rounded-t-lg">
          <div>Imagen</div>
          <div>Nombre</div>
          <div>Precio</div>
          <div>Stock</div>
          <div>Acciones</div>
        </div>

        {productos.map((producto) => (
          <div key={producto.id} className="producto-row grid grid-cols-5 gap-4 text-center py-4 border-b border-gray-200 hover:bg-gray-50 transition-colors duration-200">
            {/* Imagen */}
            <div className="producto-imagen flex justify-center items-center">
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-20 h-20 object-cover rounded-lg shadow-md"
              />
            </div>
            {/* Nombre */}
            <div className="producto-nombre text-left">{producto.nombre}</div>
            {/* Precio */}
            <div className="producto-precio text-lg font-semibold text-green-600">${producto.precio}</div>
            {/* Stock */}
            <div className={`producto-stock ${producto.stock <= 5 ? 'text-red-500 font-semibold' : 'text-gray-700'}`}>
              {producto.stock}
            </div>
            
            {/* Botones de acciones */}
            <div className="producto-actions flex justify-center items-center">
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-200"
                onClick={() => handleVerDetalles(producto)}
              >
                Ver Detalles
              </button>
              <button
                aria-label="Eliminar Producto"
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-200 ml-2"
                onClick={() => handleAbrirModalEliminar(producto)}
              >
                <FaTrashAlt size={20} />
              </button>
            </div>
            
          </div>
        ))}
      </div>

      {/* Modal de detalles */}
      {modalVisible && (
        <ModalDetalle
          visible={modalVisible}
          producto={productoSeleccionado}
          onClose={handleCerrarModal}
        />
      )}

      {/* Modal para crear un nuevo producto */}
      {modalCrearVisible && (
        <ModalGeneral
          visible={modalCrearVisible}
          onClose={handleCerrarModalCrear}
          onProductoCreado={cargarProductos} 
          />
      )}
      {/* Modal de confirmación de eliminación */}
      {modalEliminarVisible && (
        <ModalConfirmacionEliminar
          visible={modalEliminarVisible}
          onClose={handleCerrarModalEliminar}
          onConfirm={() => handleEliminarProducto(productoSeleccionado.id)}
          producto={productoSeleccionado}
        />
      )}
      {/* Modal de carga */}
      {cargando && (
        <CargandoModal
          mensaje="Eliminando producto..."
          visible={cargando}
        />
      )}
    </div>
  );
};

export default ProductosLista;
