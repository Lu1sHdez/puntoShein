import React, { useState, useEffect } from "react";
import axios from "axios";
import PasoDatosBasicos from "./pasos/PasoDatosBasicos.js";
import PasoImagen from "./pasos/PasoImagen.js";
import PasoConfirmacion from "./pasos/PasoConfirmacion.js";
import PasoTallas from "./pasos/PasoTallas.js";
import PasoCategoriaSubcategoria from "./pasos/PasoCategoriaSubcategoria.js";
import { API_URL } from "../../../ApiConexion.js";
import { motion, AnimatePresence } from "framer-motion";

const ModalCrearProducto = ({ visible, onClose, onProductoCreado }) => {
  const [progreso, setProgreso] = useState(1);
  const [producto, setProducto] = useState({
    nombre: "",
    descripcion: "",
    color: "",
    precio: 0,
    imagen: "",
    subcategoria_id: "",
    categoria_id: "",
    tallas: [],
  });
  const [categorias, setCategorias] = useState([]);
  const [subcategorias, setSubcategorias] = useState([]);
  const [selectedCategoria, setSelectedCategoria] = useState("");

  // === Obtener categorías ===
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/productos/categorias`, {
          withCredentials: true,
        });
        setCategorias(response.data);
      } catch (err) {
        console.error("Error al obtener categorías:", err);
      }
    };
    if (visible) fetchCategorias();
  }, [visible]);

  // === Obtener subcategorías según categoría seleccionada ===
  useEffect(() => {
    const fetchSubcategorias = async () => {
      if (selectedCategoria) {
        try {
          const response = await axios.get(
            `${API_URL}/api/productos/subcategorias?categoria_id=${selectedCategoria}`,
            { withCredentials: true }
          );
          setSubcategorias(response.data);
        } catch (err) {
          console.error("Error al obtener subcategorías:", err);
        }
      }
    };
    fetchSubcategorias();
  }, [selectedCategoria]);

  const handleCategoriaChange = (e) => {
    const categoriaId = e.target.value;
    const categoriaSeleccionada = categorias.find((c) => c.id == categoriaId);

    setProducto((prev) => ({
      ...prev,
      categoria_id: categoriaId,
      categoria: categoriaSeleccionada,
      subcategoria_id: "",
      subcategoria: null,
    }));
    setSelectedCategoria(categoriaId);
  };

  const handleSiguientePaso = () => setProgreso((prev) => prev + 1);
  const handleAnteriorPaso = () => setProgreso((prev) => prev - 1);

  const refreshCategorias = async () => {
    try {
      const [catResponse, subcatResponse] = await Promise.all([
        axios.get(`${API_URL}/api/productos/categorias`, { withCredentials: true }),
        selectedCategoria
          ? axios.get(`${API_URL}/api/productos/subcategorias?categoria_id=${selectedCategoria}`, {
              withCredentials: true,
            })
          : Promise.resolve({ data: [] }),
      ]);
      setCategorias(catResponse.data);
      setSubcategorias(selectedCategoria ? subcatResponse.data : []);
    } catch (err) {
      console.error("Error al refrescar categorías:", err);
    }
  };

  const handleGuardarProducto = async () => {
    try {
      const response = await axios.post(`${API_URL}/api/productos/crear`, producto, {
        withCredentials: true,
      });
      if (typeof onProductoCreado === "function") {
        await onProductoCreado();
      }
      onClose();
    } catch (error) {
      console.error("Error al crear producto:", error);
    }
  };

  if (!visible) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Contenedor principal */}
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative mx-auto mt-6 sm:mt-10 bg-white rounded-3xl shadow-2xl w-[95%] max-w-5xl overflow-hidden border border-gray-100"
          >
            {/* Encabezado */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-xl sm:text-2xl font-bold">Crear un nuevo producto</h2>
              <button
                onClick={onClose}
                className="text-white bg-blue-700/40 hover:bg-blue-800 px-3 py-1 rounded-md text-sm font-medium transition"
              >
                Cerrar ✕
              </button>
            </div>

            {/* Contenido desplazable */}
            <div className="p-6 sm:p-8 max-h-[90vh] overflow-y-auto">
              {/* Barra de progreso */}
              <div className="mb-8">
                <div className="flex justify-between text-xs sm:text-sm mb-2">
                  {["Paso 1", "Paso 2", "Paso 3", "Paso 4", "Paso 5"].map((label, index) => (
                    <span
                      key={index}
                      className={`font-semibold ${
                        progreso === index + 1 ? "text-blue-600" : "text-gray-400"
                      }`}
                    >
                      {label}
                    </span>
                  ))}
                </div>
                <div className="w-full h-2 bg-gray-200 rounded-full">
                  <div
                    className="h-full bg-blue-500 rounded-full transition-all duration-300"
                    style={{ width: `${(progreso / 5) * 100}%` }}
                  />
                </div>
              </div>

              {/* Pasos */}
              {progreso === 1 && (
                <PasoDatosBasicos
                  producto={producto}
                  setProducto={setProducto}
                  onSiguiente={handleSiguientePaso}
                />
              )}

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

              {progreso === 3 && (
                <PasoTallas
                  producto={producto}
                  setProducto={setProducto}
                  onAnterior={handleAnteriorPaso}
                  onSiguiente={handleSiguientePaso}
                />
              )}

              {progreso === 4 && (
                <PasoImagen
                  producto={producto}
                  setProducto={setProducto}
                  onAnterior={handleAnteriorPaso}
                  onSiguiente={handleSiguientePaso}
                />
              )}

              {progreso === 5 && (
                <PasoConfirmacion
                  producto={producto}
                  onAnterior={handleAnteriorPaso}
                  onGuardar={handleGuardarProducto}
                />
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalCrearProducto;
