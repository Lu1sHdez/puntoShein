import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PasoDatosBasicos from './pasos/PasoDatosBasicos.js';
import PasoImagen from './pasos/PasoImagen.js';
import PasoConfirmacion from './pasos/PasoConfirmacion.js';
import PasoTallas from './pasos/PasoTallas.js';
import PasoCategoriaSubcategoria from './pasos/PasoCategoriaSubcategoria.js'; // Paso para Categoría/Subcategoría
import { API_URL } from '../../../ApiConexion.js';

const ModalCrearProducto = ({ visible, onClose,onProductoCreado  }) => {
  const [progreso, setProgreso] = useState(1);
  const [producto, setProducto] = useState({
    nombre: '',
    descripcion: '',
    color: '',
    precio: 0,
    imagen: '',
    subcategoria_id: '',
    categoria_id: '',
    tallas: [],
  });
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState(''); // Estado para la categoría seleccionada

  // Obtener todas las categorías cuando el modal se muestra
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/productos/categorias`, {
          withCredentials: true,
        });
        setCategorias(response.data); // Almacenamos las categorías obtenidas
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      }
    };
    fetchCategorias(); // Llamamos a la función para obtener las categorías
  }, [visible]); // Solo se ejecuta cuando el modal se muestra

  // Obtener subcategorías según la categoría seleccionada
  useEffect(() => {
    const fetchSubcategorias = async () => {
      if (selectedCategoria) {
        try {
          const response = await axios.get(`${API_URL}/api/productos/subcategorias?categoria_id=${selectedCategoria}`, {
            withCredentials: true,
          });
          setSubcategorias(response.data); // Almacenamos las subcategorías obtenidas
        } catch (err) {
          console.error('Error al obtener subcategorías:', err);
        }
      }
    };
    fetchSubcategorias(); // Llamamos a la función para obtener las subcategorías
  }, [selectedCategoria]); // Solo se ejecuta cuando cambia `selectedCategoria`

  // Cuando cambia la categoria, actualizar el estado de `selectedCategoria`
  const handleCategoriaChange = (e) => {
    const categoriaId = e.target.value;
    const categoriaSeleccionada = categorias.find(c => c.id == categoriaId);
  
    setProducto(prev => ({
      ...prev,
      categoria_id: categoriaId,
      categoria: categoriaSeleccionada, // ← aquí guardas el objeto completo
      subcategoria_id: '',
      subcategoria: null
    }));
    setSelectedCategoria(categoriaId);
  };
  
  // Función para avanzar al siguiente paso
  const handleSiguientePaso = () => {
    setProgreso(prev => prev + 1);
  };

  // Función para retroceder al paso anterior
  const handleAnteriorPaso = () => {
    setProgreso(prev => prev - 1);
  };

  const refreshCategorias = async () => {
    try {
      const [catResponse, subcatResponse] = await Promise.all([
        axios.get(`${API_URL}/api/productos/categorias`, { withCredentials: true }),
        selectedCategoria ? 
          axios.get(`${API_URL}/api/productos/subcategorias?categoria_id=${selectedCategoria}`, { withCredentials: true }) 
          : Promise.resolve({ data: [] })
      ]);
      
      setCategorias(catResponse.data);
      setSubcategorias(selectedCategoria ? subcatResponse.data : []);
    } catch (err) {
      console.error('Error al refrescar categorías:', err);
    }
  };

  const handleGuardarProducto = async () => {
    try {
      const response = await axios.post(
        `${API_URL}/api/productos/crear`,
        producto,
        { withCredentials: true }
      );
      console.log(response.data); // Producto creado correctamente
  
      // ✅ Llamar a la función que recarga los productos en ProductosLista
      if (typeof onProductoCreado === 'function') {
        await onProductoCreado();
      }
  
      // ✅ Cerrar el modal
      onClose();
    } catch (error) {
      console.error('Error al crear producto:', error);
    }
  };
  

  // Si el modal no está visible, no se renderiza nada
  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-[95%] max-w-5xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Crear un nuevo producto</h2>

        {/* Barra de Progreso */}
        <div className="mb-4">
          <div className="flex justify-between">
            <span className={`text-sm ${progreso === 1 ? 'font-semibold text-blue-500' : 'text-gray-500'}`}>Paso 1</span>
            <span className={`text-sm ${progreso === 2 ? 'font-semibold text-blue-500' : 'text-gray-500'}`}>Paso 2</span>
            <span className={`text-sm ${progreso === 3 ? 'font-semibold text-blue-500' : 'text-gray-500'}`}>Paso 3</span>
            <span className={`text-sm ${progreso === 4 ? 'font-semibold text-blue-500' : 'text-gray-500'}`}>Paso 4</span>
            <span className={`text-sm ${progreso === 5 ? 'font-semibold text-blue-500' : 'text-gray-500'}`}>Paso 5</span>
          </div>
          <div className="h-1 bg-gray-200 rounded-full mt-2">
            <div
              className={`h-full bg-blue-500 rounded-full`}
              style={{ width: `${(progreso / 5) * 100}%` }}
            ></div>
          </div>
        </div>

        {/* Paso 1: Datos Básicos */}
        {progreso === 1 && (
          <PasoDatosBasicos
            producto={producto}
            setProducto={setProducto}
            onSiguiente={handleSiguientePaso}
          />
        )}

        {/* Paso 2: Selección de Categoría/Subcategoría */}
        {/* Paso 2: Selección de Categoría/Subcategoría */}
        {progreso === 2 && (
          <PasoCategoriaSubcategoria
            producto={producto}
            setProducto={setProducto}
            categorias={categorias}
            subcategorias={subcategorias}
            onCategoriaChange={handleCategoriaChange}
            onSiguiente={handleSiguientePaso}
            onAnterior={handleAnteriorPaso}
            refreshData={refreshCategorias}
          />
        )}

        {/* Paso 3: Tallas */}
        {progreso === 3 && (
          <PasoTallas
            producto={producto}
            setProducto={setProducto}
            onAnterior={handleAnteriorPaso}
            onSiguiente={handleSiguientePaso}
          />
        )}

        {/* Paso 4: Imagen */}
        {progreso === 4 && (
          <PasoImagen
            producto={producto}
            setProducto={setProducto}
            onAnterior={handleAnteriorPaso}
            onSiguiente={handleSiguientePaso}
          />
        )}

        {/* Paso 5: Confirmación */}
        {progreso === 5 && (
          <PasoConfirmacion
            producto={producto}
            onAnterior={handleAnteriorPaso}
            onGuardar={handleGuardarProducto}
          />
        )}

        {/* Botones de navegación */}
        <div className="flex justify-between mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearProducto;
