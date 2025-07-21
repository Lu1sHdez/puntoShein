import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../ApiConexion';
import { FaClock, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import CargandoModal from '../../../Animations/CargandoModal';
import {mostrarConfirmacion} from "../../../Animations/ConfirmacionSwal"

const InvitacionesEnviadas = () => {
  const [invitaciones, setInvitaciones] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState("");
  const [eliminando, setEliminando] = useState(false);


  const obtenerInvitaciones = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/empleado/invitaciones/obtener`, { withCredentials: true });
      setInvitaciones(res.data.invitaciones);
    } catch (err) {
      setError("Error al cargar las invitaciones.");
    } finally {
      setCargando(false);
    }
  };

  useEffect(() => {
    obtenerInvitaciones();
  }, []);

  const getIconoEstado = (estado) => {
    switch (estado) {
      case "pendiente":
        return <FaClock className="text-yellow-500" />;
      case "usada":
        return <FaCheckCircle className="text-green-600" />;
      case "expirada":
        return <FaTimesCircle className="text-red-500" />;
      default:
        return null;
    }
  };

  const eliminarInvitacion = async (id) => {
    const confirmado = await mostrarConfirmacion({
      titulo: "Eliminar invitación expirada",
      texto: "¿Deseas eliminar permanentemente esta invitación?",
      confirmText: "Sí, eliminar",
      cancelText: "Cancelar",
      confirmColor: "#e11d48", // rojo-600
    });
    if (!confirmado) return;
    setEliminando(true);
  
    try {
      await axios.delete(`${API_URL}/api/empleado/invitaciones/eliminar/${id}`, {
        withCredentials: true,
      });
      setInvitaciones(prev => prev.filter(inv => inv.id !== id));
    } catch (error) {
      alert("Error al eliminar la invitación.");
    }finally{
      setEliminando(false);
    }
  };
  

  return (
    <div className="mt-10">
      <CargandoModal visible={eliminando} mensaje="Eliminando invitación..." />

      <h2 className="text-2xl font-semibold mb-4">Invitaciones Enviadas</h2>

      {cargando ? (
        <p>Cargando...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : invitaciones.length === 0 ? (
        <p>No hay invitaciones enviadas.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow text-sm">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="py-2 px-4">Correo</th>
                <th className="py-2 px-4">Fecha Envío</th>
                <th className="py-2 px-4">Expira</th>
                <th className="py-2 px-4">Estado</th>
                <th className="py-2 px-4">Acciones</th>

              </tr>
            </thead>
            <tbody>
              {invitaciones.map((inv) => (
                <tr key={inv.id} className="border-t">
                  <td className="py-2 px-4">{inv.correo}</td>
                  <td className="py-2 px-4">{new Date(inv.createdAt).toLocaleString()}</td>
                  <td className="py-2 px-4">{new Date(inv.expiracion).toLocaleString()}</td>
                  <td className="py-2 px-4 flex items-center gap-2">
                    {getIconoEstado(inv.estado)}
                    <span className="capitalize">{inv.estado}</span>
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => eliminarInvitacion(inv.id)}
                      className="text-red-600 hover:underline"
                    >
                      Eliminar
                    </button>
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

export default InvitacionesEnviadas;
