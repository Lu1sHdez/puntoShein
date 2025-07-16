import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../ApiConexion';
import CargandoModal from '../../../../Animations/CargandoModal';
import { mostrarConfirmacion } from '../../../../Animations/ConfirmacionSwal';

const ModalGestionTallas = ({ visible, onClose, refreshTallas }) => {
  const [tallas, setTallas] = useState([]);
  const [nuevaTalla, setNuevaTalla] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    if (visible) {
      axios.get(`${API_URL}/api/tallas/obtener`, { withCredentials: true })
        .then(res => setTallas(res.data));
    }
  }, [visible]);

  const crearTalla = async () => {
    if (!nuevaTalla.trim()) return;

    setCargando(true);
    try {
      await axios.post(`${API_URL}/api/tallas/crear`, { nombre: nuevaTalla }, { withCredentials: true });
      setNuevaTalla('');
      setMensaje('Talla creada con éxito');
      await refreshTallas();
    } catch (error) {
      setMensaje(error.response?.data?.mensaje || 'Error al crear talla');
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
      await axios.delete(`${API_URL}/api/tallas/${id}`, { withCredentials: true });
      await refreshTallas();
      setTallas(prev => prev.filter(t => t.id !== id));
      setMensaje('Talla eliminada correctamente');
    } catch (error) {
      setMensaje("Error al eliminar talla");
    } finally {
      setCargando(false);
    }
  };

  const actualizarTalla = async (id, nuevoNombre, nombreAnterior) => {
    if (nuevoNombre.trim() === nombreAnterior.trim()) return;

    const confirmado = await mostrarConfirmacion({
      titulo: `¿Actualizar talla?`,
      texto: `¿Deseas cambiar "${nombreAnterior}" a "${nuevoNombre}"?`,
      icono: "info",
      confirmText: "Sí, actualizar",
    });

    if (!confirmado) return;

    setCargando(true);
    try {
      await axios.put(`${API_URL}/api/tallas/${id}`, { nombre: nuevoNombre }, { withCredentials: true });
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
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm z-50 flex justify-center items-center">
      <CargandoModal visible={cargando} mensaje="Procesando..." />
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Gestión de Tallas</h2>

        <input
          type="text"
          value={nuevaTalla}
          onChange={(e) => setNuevaTalla(e.target.value)}
          placeholder="Nombre de la talla"
          className="w-full border p-2 rounded mb-2"
        />
        <button
          onClick={crearTalla}
          disabled={cargando}
          className="bg-pink-500 text-white px-4 py-2 rounded w-full mb-4 hover:bg-pink-600"
        >
          Crear Talla
        </button>

        {mensaje && <p className="text-sm text-green-600 mb-3">{mensaje}</p>}

        <ul>
          {tallas.map((t) => (
            <li key={t.id} className="flex justify-between items-center border-b py-1">
              <input
                type="text"
                defaultValue={t.nombre}
                onBlur={(e) => actualizarTalla(t.id, e.target.value, t.nombre)}
                className="flex-1 p-1 border rounded mr-2"
              />
              <button
                onClick={() => eliminarTalla(t.id, t.nombre)}
                className="text-red-600 hover:underline"
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>

        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 w-full"
        >
          Cerrar
        </button>
      </div>
    </div>
  );
};

export default ModalGestionTallas;
