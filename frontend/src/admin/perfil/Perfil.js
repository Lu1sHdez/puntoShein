import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formAnimation } from '../../components/Funciones';
import { API_URL } from '../../ApiConexion';
import { mostrarNotificacion } from '../../Animations/NotificacionSwal';
import CargandoBarra from '../../Animations/CargandoBarra';
import RecuperarPasswordAdmin from '../perfil/modales/RecuperarPasswordAdmin';
import RestablecerPasswordAdmin from '../perfil/modales/RestablecerPasswordAdmin';
import VerificarCodigoAdmin from '../perfil/modales/VerificarCodigoAdmin';
import CargandoModal from '../../Animations/CargandoModal';
import ActualizarFotoPerfilAdmin from "./modales/ActualizarFotoPerfilAdmin";
import { Pencil } from "lucide-react";

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [datosOriginales, setDatosOriginales] = useState({});
  const [datosEditables, setDatosEditables] = useState({});
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);
  const [mostrarRestablecer, setMostrarRestablecer] = useState(false);
  const [mostrarVerificarCodigo, setMostrarVerificarCodigo] = useState(false);
  const [Guardando, setGuardando] = useState(false);
  const [mostrarModalFoto, setMostrarModalFoto] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/perfil`, {
          withCredentials: true,
        });
        setUsuario(response.data);
        setDatosOriginales(response.data);
        setDatosEditables({
          nombre: response.data.nombre,
          apellido_paterno: response.data.apellido_paterno,
          apellido_materno: response.data.apellido_materno,
          telefono: response.data.telefono,
          correo: response.data.correo,
        });
        setFotoPerfil(response.data.foto_perfil);
      } catch (error) {
        if (error.response?.status === 401) navigate('/login');
      }
    };
    obtenerPerfil();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosEditables((prev) => ({ ...prev, [name]: value }));
  };

  const seHizoCambio = () => {
    return Object.keys(datosEditables).some(
      (key) => datosEditables[key] !== datosOriginales[key]
    );
  };

  const guardarCambios = async () => {
    setGuardando(true);
    try {
      await axios.put(`${API_URL}/api/admin/perfil`, datosEditables, {
        withCredentials: true,
      });
      setModoEdicion(false);
      setDatosOriginales(datosEditables);
      mostrarNotificacion("success", "Perfil actualizado correctamente.");
    } catch (error) {
      mostrarNotificacion("error", "Error al guardar cambios.");
    } finally {
      setGuardando(false);
    }
  };

  if (!usuario) return <CargandoBarra message="Cargando perfil..." />;

  return (
    <motion.div
      {...formAnimation}
      className="p-6 max-w-2xl mx-auto bg-white rounded-lg shadow-md mt-8"
    >
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Perfil del Administrador
      </h2>

      {/* === Foto de perfil === */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative">
          {fotoPerfil ? (
            <img
              src={fotoPerfil}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-400 shadow-md"
            />
          ) : (
            <div
              onClick={() => setMostrarModalFoto(true)}
              className="w-32 h-32 rounded-full border-4 border-blue-300 bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:scale-105 transition-transform"
            >
              <Pencil size={30} className="opacity-70 mb-1" />
              <span className="text-sm font-medium">Foto de perfil</span>
            </div>
          )}
        </div>

        <button
          onClick={() => setMostrarModalFoto(true)}
          className="mt-3 btn-principal"
        >
          Cambiar foto
        </button>
      </div>

      {/* === Datos del perfil === */}
      <div className="grid grid-cols-1 gap-4">
        <Campo label="Usuario:" valor={usuario.nombre_usuario} disabled />
        <Campo
          label="Nombre:"
          name="nombre"
          valor={datosEditables.nombre}
          onChange={handleChange}
          editable={modoEdicion}
        />
        <Campo
          label="Apellido Paterno:"
          name="apellido_paterno"
          valor={datosEditables.apellido_paterno}
          onChange={handleChange}
          editable={modoEdicion}
        />
        <Campo
          label="Apellido Materno:"
          name="apellido_materno"
          valor={datosEditables.apellido_materno}
          onChange={handleChange}
          editable={modoEdicion}
        />
        <Campo
          label="Correo:"
          name="correo"
          valor={datosEditables.correo}
          onChange={handleChange}
          editable={modoEdicion}
        />
        <Campo
          label="Teléfono:"
          name="telefono"
          valor={datosEditables.telefono}
          onChange={handleChange}
          editable={modoEdicion}
        />
        <Campo label="Rol:" valor={usuario.rol} disabled />
      </div>

      {/* === Acciones === */}
      <div className="flex justify-between items-center mt-6 flex-wrap gap-3">
        <button
          onClick={() => setMostrarRecuperacion(true)}
          className="text-blue-600 underline hover:text-blue-800 transition text-sm"
        >
          Cambiar contraseña
        </button>

        {!modoEdicion ? (
          <button
            onClick={() => setModoEdicion(true)}
            className="btn-principal"
          >
            Editar perfil
          </button>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={guardarCambios}
              disabled={!seHizoCambio()}
              className={`px-4 py-2 rounded-lg text-white transition font-semibold ${
                seHizoCambio()
                  ? 'bg-blue-600 hover:bg-blue-700'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Guardar
            </button>
            <button
              onClick={() => {
                setModoEdicion(false);
                setDatosEditables({ ...datosOriginales });
              }}
              className="btn-secundario"
            >
              Cancelar
            </button>
          </div>
        )}
      </div>

      {/* === Modales === */}
      {mostrarRecuperacion && (
        <RecuperarPasswordAdmin
          correo={usuario.correo}
          onClose={() => setMostrarRecuperacion(false)}
          onCodigoEnviado={() => {
            setMostrarRecuperacion(false);
            setMostrarVerificarCodigo(true);
          }}
        />
      )}

      {mostrarVerificarCodigo && (
        <VerificarCodigoAdmin
          correo={usuario.correo}
          onClose={() => setMostrarVerificarCodigo(false)}
          onCodigoCorrecto={() => {
            setMostrarVerificarCodigo(false);
            setMostrarRestablecer(true);
          }}
        />
      )}

      {mostrarRestablecer && (
        <RestablecerPasswordAdmin onClose={() => setMostrarRestablecer(false)} />
      )}

      {mostrarModalFoto && (
        <ActualizarFotoPerfilAdmin
          onClose={() => setMostrarModalFoto(false)}
          onFotoActualizada={(url) => setFotoPerfil(url)}
        />
      )}

      <CargandoModal mensaje="Guardando cambios..." visible={Guardando} />
    </motion.div>
  );
};

// === Componente Campo reutilizable ===
const Campo = ({ label, name, valor, onChange, editable, disabled = false }) => (
  <div className="flex items-center">
    <label className="w-1/3 text-sm font-medium text-gray-600">{label}</label>
    <input
      type="text"
      name={name}
      value={valor}
      disabled={disabled || !editable}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none transition-all ${
        disabled || !editable
          ? 'bg-gray-100 text-gray-600 cursor-not-allowed'
          : 'focus:ring-2 focus:ring-blue-500 focus:border-blue-500'
      }`}
    />
  </div>
);

export default Perfil;
