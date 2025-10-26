import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../../ApiConexion";
import CargandoModal from "../../../../Animations/CargandoModal";
import { mostrarConfirmacion } from "../../../../Animations/ConfirmacionSwal";
import { motion, AnimatePresence } from "framer-motion";

const ModalGestionTallas = ({ visible, onClose, refreshTallas }) => {
  const [tallas, setTallas] = useState([]);
  const [nuevaTalla, setNuevaTalla] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (visible) {
      axios
        .get(`${API_URL}/api/tallas/obtener`, { withCredentials: true })
        .then((res) => setTallas(res.data))
        .catch(() => setMensaje("Error al obtener tallas"));
    }
  }, [visible]);

  const crearTalla = async () => {
    if (!nuevaTalla.trim()) return;

    setCargando(true);
    try {
      await axios.post(
        `${API_URL}/api/tallas/crear`,
        { nombre: nuevaTalla },
        { withCredentials: true }
      );
      setNuevaTalla("");
      setMensaje("Talla creada con éxito");
      await refreshTallas();
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || "Error al crear talla");
    } finally {
      setCargando(false);
    }
  };

  const eliminarTalla = async (id, nombre) => {
    const confirmado = await mostrarConfirmacion({
      titulo: `¿Eliminar talla "${nombre}"?`,
      texto: "Esta acción no se puede deshacer.",
      icono: "warning",
      confirmText: "Sí, eliminar",
    });

    if (!confirmado) return;

    setCargando(true);
    try {
      await axios.delete(`${API_URL}/api/tallas/${id}`, {
        withCredentials: true,
      });
      await refreshTallas();
      setTallas((prev) => prev.filter((t) => t.id !== id));
      setMensaje("Talla eliminada correctamente");
    } catch (error) {
      setMensaje("Error al eliminar talla");
    } finally {
      setCargando(false);
    }
  };

  const actualizarTalla = async (id, nuevoNombre, nombreAnterior) => {
    if (nuevoNombre.trim() === nombreAnterior.trim()) return;

    const confirmado = await mostrarConfirmacion({
      titulo: "¿Actualizar talla?",
      texto: `¿Deseas cambiar "${nombreAnterior}" a "${nuevoNombre}"?`,
      icono: "info",
      confirmText: "Sí, actualizar",
    });

    if (!confirmado) return;

    setCargando(true);
    try {
      await axios.put(
        `${API_URL}/api/tallas/${id}`,
        { nombre: nuevoNombre },
        { withCredentials: true }
      );
      await refreshTallas();
      setMensaje("Talla actualizada correctamente");
    } catch (error) {
      setMensaje("Error al actualizar talla");
    } finally {
      setCargando(false);
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
          <CargandoModal visible={cargando} mensaje="Procesando..." />

          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 20, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="relative mx-auto mt-10 sm:mt-14 bg-white rounded-3xl shadow-2xl w-[95%] max-w-lg overflow-hidden border border-gray-100"
          >
            {/* === Encabezado === */}
            <div className="sticky top-0 bg-gradient-to-r from-blue-600 to-blue-500 text-white px-6 py-4 flex justify-between items-center">
              <h2 className="text-lg sm:text-xl font-bold">Gestión de Tallas</h2>
              <button
                onClick={onClose}
                className="text-white bg-blue-700/40 hover:bg-blue-800 px-3 py-1 rounded-md text-sm font-medium transition"
              >
                Cerrar ✕
              </button>
            </div>

            {/* === Contenido === */}
            <div className="p-6 sm:p-8 max-h-[80vh] overflow-y-auto">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Nueva talla
                </label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={nuevaTalla}
                    onChange={(e) => setNuevaTalla(e.target.value)}
                    placeholder="Ej: M, L, XL"
                    className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
                  />
                  <button
                    onClick={crearTalla}
                    disabled={cargando}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 font-medium transition"
                  >
                    Crear
                  </button>
                </div>
              </div>

              {mensaje && (
                <p
                  className={`text-sm mb-4 text-center ${
                    mensaje.toLowerCase().includes("error")
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {mensaje}
                </p>
              )}

              {/* === Lista de tallas === */}
              <ul className="divide-y divide-gray-100">
                {tallas.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center py-2"
                  >
                    <input
                      type="text"
                      defaultValue={t.nombre}
                      onBlur={(e) =>
                        actualizarTalla(t.id, e.target.value, t.nombre)
                      }
                      className="flex-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-400 outline-none transition"
                    />
                    <button
                      onClick={() => eliminarTalla(t.id, t.nombre)}
                      className="text-red-600 hover:text-red-700 text-sm font-semibold ml-3"
                    >
                      Eliminar
                    </button>
                  </li>
                ))}
              </ul>

              <div className="pt-6">
                <button
                  onClick={onClose}
                  className="w-full px-4 py-2 bg-gray-400 text-white rounded-md hover:bg-gray-500 active:bg-gray-600 transition font-semibold"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ModalGestionTallas;
