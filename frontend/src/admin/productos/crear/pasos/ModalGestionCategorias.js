import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../ApiConexion";
import CargandoModal from "../../../../Animations/CargandoModal";
import { motion, AnimatePresence } from "framer-motion";

const ModalGestionCategorias = ({ visible, onClose, categorias, refreshCategorias }) => {
  const [tipo, setTipo] = useState("categoria");
  const [nombre, setNombre] = useState("");
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [mensaje, setMensaje] = useState({ texto: "", tipo: "" });
  const [isLoading, setIsLoading] = useState(false);

  if (!visible) return null;

  const limpiarFormulario = () => {
    setNombre("");
    setCategoriaSeleccionada("");
    setMensaje({ texto: "", tipo: "" });
  };

  const handleClose = () => {
    limpiarFormulario();
    onClose();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre.trim()) {
      setMensaje({ texto: "El nombre es requerido", tipo: "error" });
      return;
    }

    if (tipo === "subcategoria" && !categoriaSeleccionada) {
      setMensaje({ texto: "Debe seleccionar una categoría", tipo: "error" });
      return;
    }

    setIsLoading(true);
    try {
      const endpoint = tipo === "categoria" ? "categorias" : "subcategorias";
      const payload =
        tipo === "categoria"
          ? { nombre }
          : { nombre, categoria_id: categoriaSeleccionada };

      await axios.post(`${API_URL}/api/productos/${endpoint}`, payload, {
        withCredentials: true,
      });

      setMensaje({
        texto: `${tipo === "categoria" ? "Categoría" : "Subcategoría"} creada con éxito`,
        tipo: "success",
      });
      setNombre("");
      setCategoriaSeleccionada("");
      refreshCategorias();
    } catch (error) {
      const errorMsg = error.response?.data?.mensaje || "Error al crear";
      setMensaje({ texto: errorMsg, tipo: "error" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-50 bg-black bg-opacity-40 backdrop-blur-sm overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 10, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative mx-auto mt-10 sm:mt-16 bg-white rounded-3xl shadow-2xl w-[95%] max-w-lg overflow-hidden border border-gray-100"
          >
            {/* === Encabezado === */}
            <div className="sticky top-0 z-10 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold">
                {tipo === "categoria" ? "Nueva Categoría" : "Nueva Subcategoría"}
              </h2>
              <button
                onClick={handleClose}
                className="text-white bg-blue-700/40 hover:bg-blue-800 px-3 py-1 rounded-md text-sm font-medium transition"
              >
                Cerrar ✕
              </button>
            </div>

            {/* === Contenido === */}
            <div className="p-6 sm:p-8">
              <CargandoModal mensaje="Guardando..." visible={isLoading} />

              {/* Botones de tipo */}
              <div className="flex mb-5 justify-center gap-2">
                <button
                  onClick={() => {
                    setTipo("categoria");
                    setCategoriaSeleccionada("");
                    setMensaje({ texto: "", tipo: "" });
                  }}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${
                    tipo === "categoria"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Categoría
                </button>
                <button
                  onClick={() => {
                    setTipo("subcategoria");
                    if (categorias.length > 0) {
                      setCategoriaSeleccionada(categorias[0].id);
                    }
                    setMensaje({ texto: "", tipo: "" });
                  }}
                  className={`px-4 py-2 rounded-md font-semibold transition-all ${
                    tipo === "subcategoria"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                  }`}
                >
                  Subcategoría
                </button>
              </div>

              {/* Formulario */}
              <form onSubmit={handleSubmit} className="space-y-4">
                {tipo === "subcategoria" && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Categoría Padre
                    </label>
                    <select
                      value={categoriaSeleccionada}
                      onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
                    >
                      <option value="">Seleccione una categoría</option>
                      {categorias.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                          {cat.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Nombre de {tipo === "categoria" ? "la Categoría" : "la Subcategoría"}
                  </label>
                  <input
                    type="text"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                    className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
                    placeholder={`Ej: ${tipo === "categoria" ? "Ropa" : "Vestidos"}`}
                  />
                </div>

                {mensaje.texto && (
                  <div
                    className={`p-2 rounded-md text-sm text-center ${
                      mensaje.tipo === "error"
                        ? "bg-red-100 text-red-700 border border-red-200"
                        : "bg-green-100 text-green-700 border border-green-200"
                    }`}
                  >
                    {mensaje.texto}
                  </div>
                )}

                <div className="flex justify-end gap-3 pt-3">
                  <button
                    type="button"
                    onClick={handleClose}
                    className="btn-secundario px-4 py-2"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="btn-principal px-4 py-2"
                  >
                    Crear
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalGestionCategorias;
