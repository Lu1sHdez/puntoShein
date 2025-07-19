import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../ApiConexion";
import { FaCheck, FaTimes } from "react-icons/fa";

const OpinionesAdmin = () => {
  const [opiniones, setOpiniones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");

  const obtenerOpiniones = async () => {
    try {
      setCargando(true);
      const res = await axios.get(`${API_URL}/api/opinion/todas`, { withCredentials: true });
      setOpiniones(res.data);
    } catch (error) {
      console.error(error);
      setError("Error al cargar opiniones.");
    } finally {
      setCargando(false);
    }
  };

  const actualizarEstado = async (id, estado) => {
    const confirmar = await Swal.fire({
      title: "¿Estás seguro?",
      text: `La opinión será marcada como ${estado}.`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, continuar",
      cancelButtonText: "Cancelar",
    });

    if (!confirmar.isConfirmed) return;

    try {
      await axios.put(`${API_URL}/api/opinion/actualizar/${id}`, { estado }, { withCredentials: true });
      Swal.fire("Éxito", `Opinión ${estado} correctamente.`, "success");
      obtenerOpiniones();
    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar el estado.", "error");
    }
  };

  useEffect(() => {
    obtenerOpiniones();
  }, []);

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Gestión de Opiniones</h2>

      {cargando ? (
        <p className="text-center text-gray-600">Cargando opiniones...</p>
      ) : error ? (
        <p className="text-center text-red-600 font-semibold">{error}</p>
      ) : opiniones.length === 0 ? (
        <p className="text-center text-gray-500">No hay opiniones registradas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 shadow rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700 text-sm">
              <tr>
                <th className="px-4 py-3 text-left border">Correo</th>
                <th className="px-4 py-3 text-left border">Nombre</th>
                <th className="px-4 py-3 text-left border">Mensaje</th>
                <th className="px-4 py-3 text-center border">Estado</th>
                <th className="px-4 py-3 text-center border">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-800 text-sm">
              {opiniones.map((op, index) => (
                <tr key={op.id} className={`border-t ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}>
                  <td className="px-4 py-2 border break-words">{op.correo}</td>
                  <td className="px-4 py-2 border break-words">{op.nombre}</td>
                  <td className="px-4 py-2 border break-words">{op.mensaje}</td>
                  <td className="px-4 py-2 border text-center capitalize font-medium">
                    <span className={`px-2 py-1 rounded text-white text-xs ${op.estado === "aprobada" ? "bg-green-500" : op.estado === "rechazada" ? "bg-red-500" : "bg-gray-400"}`}>
                      {op.estado}
                    </span>
                  </td>
                  <td className="px-4 py-2 border text-center space-x-2">
                    {op.estado !== "aprobada" && (
                      <button
                        onClick={() => actualizarEstado(op.id, "aprobada")}
                        className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-full transition"
                        title="Aprobar opinión"
                      >
                        <FaCheck />
                      </button>
                    )}
                    {op.estado !== "rechazada" && (
                      <button
                        onClick={() => actualizarEstado(op.id, "rechazada")}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition"
                        title="Rechazar opinión"
                      >
                        <FaTimes />
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OpinionesAdmin;
