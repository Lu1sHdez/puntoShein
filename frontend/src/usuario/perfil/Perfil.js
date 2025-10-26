import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formAnimation } from '../../components/Funciones';
import { API_URL } from '../../ApiConexion';
import { mostrarNotificacion } from '../../Animations/NotificacionSwal';
import CargandoBarra from '../../Animations/CargandoBarra';
import CargandoModal from '../../Animations/CargandoModal';
import ActualizarFotoPerfil from "../perfil/modales/ActualizarFotoPerfil";
import { Pencil } from "lucide-react";

import RecuperarPassword from '../perfil/modales/RecuperarPassword';
import VerificarCodigo from '../perfil/modales/VerificarCodigo';
import RestablecerPassword from '../perfil/modales/RestablecerPassword';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [datosOriginales, setDatosOriginales] = useState({});
  const [datosEditables, setDatosEditables] = useState({});
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarModalFoto, setMostrarModalFoto] = useState(false);
  const [fotoPerfil, setFotoPerfil] = useState(null);


  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);
  const [mostrarVerificarCodigo, setMostrarVerificarCodigo] = useState(false);
  const [mostrarRestablecer, setMostrarRestablecer] = useState(false);
  const [Guardando, setGuardando] = useState(false); // Para mostrar el modal de carga


  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/usuario/perfil`, { withCredentials: true });
        setUsuario(response.data);
        
        setDatosOriginales(response.data);
        setDatosEditables({
          nombre: response.data.nombre,
          apellido_paterno: response.data.apellido_paterno,
          apellido_materno: response.data.apellido_materno,
          telefono: response.data.telefono,
          correo: response.data.correo
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
    setDatosEditables(prev => ({ ...prev, [name]: value }));
  };

  const seHizoCambio = () => {
    return Object.keys(datosEditables).some(
      key => datosEditables[key] !== datosOriginales[key]
    );
  };

  const guardarCambios = async () => {
    setGuardando(true);
    try {
      await axios.put(`${API_URL}/api/usuario/perfil`, datosEditables, { withCredentials: true });
      mostrarNotificacion("success", "¡Perfil actualizado!");
      setModoEdicion(false);
      
      setDatosOriginales(datosEditables);
    } catch (error) {
      mostrarNotificacion("error", "Error al guardar cambios.");
    }finally{
      setGuardando(false);
    }
  };

  if (!usuario) return <CargandoBarra message="Cargando perfil..." />;

  return (
    <motion.div {...formAnimation} className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Perfil del Usuario</h2>
      <div className="flex flex-col items-center mb-6">
        <div className="relative">
          {fotoPerfil ? (
            // ✅ Si hay foto: mostrar la imagen normal
            <img
              src={fotoPerfil}
              alt="Foto de perfil"
              className="w-32 h-32 rounded-full object-cover border-4 border-blue-300 shadow-md"
            />
          ) : (
            // 🚫 Si no hay foto: mostrar círculo con lápiz
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
          className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
        >
          Cambiar foto
        </button>
      </div>


      <div className="grid grid-cols-1 gap-4">
        <Campo label="Nombre de Usuario:" valor={usuario.nombre_usuario} disabled />
        <Campo label="Nombre:" name="nombre" valor={datosEditables.nombre} onChange={handleChange} editable={modoEdicion} />
        <Campo label="Apellido Paterno:" name="apellido_paterno" valor={datosEditables.apellido_paterno} onChange={handleChange} editable={modoEdicion} />
        <Campo label="Apellido Materno:" name="apellido_materno" valor={datosEditables.apellido_materno} onChange={handleChange} editable={modoEdicion} />
        <Campo label="Correo:" name="correo" valor={datosEditables.correo} onChange={handleChange} editable={modoEdicion} />
        <Campo label="Teléfono:" name="telefono" valor={datosEditables.telefono} onChange={handleChange} editable={modoEdicion} />
        <Campo label="Rol:" valor={usuario.rol} disabled />
      </div>

      <div className="flex justify-end mt-6">
        <button
          onClick={() => setMostrarRecuperacion(true)}
          className="text-black underline hover:text-gray-600 transition text-sm"
        >
          Cambiar contraseña
        </button>
      </div>

      <div className="flex justify-end mt-4 space-x-4">
        {!modoEdicion ? (
          <button
            onClick={() => setModoEdicion(true)}
            className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition"
          >
            Editar perfil
          </button>
        ) : (
          <>
            <button
              onClick={guardarCambios}
              disabled={!seHizoCambio()}
              className={`px-4 py-2 rounded-lg text-white transition ${
                seHizoCambio()
                  ? 'bg-black hover:bg-gray-600'
                  : 'bg-gray-400 cursor-not-allowed'
              }`}
            >
              Guardar cambios
            </button>
            <button
              onClick={() => {
                setModoEdicion(false);
                setDatosEditables({ ...datosOriginales });
              }}
              className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </>
        )}
      </div>

      {/* Modales de cambio de contraseña */}
      {mostrarRecuperacion && (
        <RecuperarPassword
          correo={usuario.correo}
          onClose={() => setMostrarRecuperacion(false)}
          onCodigoEnviado={() => {
            setMostrarRecuperacion(false);
            setMostrarVerificarCodigo(true);
          }}
        />
      )}
      {mostrarVerificarCodigo && (
        <VerificarCodigo
          correo={usuario.correo}
          onClose={() => setMostrarVerificarCodigo(false)}
          onCodigoCorrecto={() => {
            setMostrarVerificarCodigo(false);
            setMostrarRestablecer(true);
          }}
        />
      )}
      {/* Modal para actualizar la foto */}
      {mostrarModalFoto && (
        <ActualizarFotoPerfil
          onClose={() => setMostrarModalFoto(false)}
          onFotoActualizada={(url) => setFotoPerfil(url)}
        />
      )}
      <CargandoModal mensaje="Guardando cambios..." visible={Guardando} />

      {mostrarRestablecer && (
        <RestablecerPassword onClose={() => setMostrarRestablecer(false)} />
      )}
    </motion.div>
  );
};

const Campo = ({ label, name, valor, onChange, editable, disabled = false }) => (
  <div className="flex items-center">
    <label className="w-1/3 text-sm font-medium text-gray-600">{label}</label>
    <input
      type="text"
      name={name}
      value={valor}
      disabled={disabled || !editable}
      onChange={onChange}
      className={`w-full px-4 py-2 border rounded-md focus:outline-none ${
        disabled || !editable ? 'bg-gray-100 text-gray-600' : 'focus:ring-2 focus:ring-black'
      }`}
    />
  </div>
);

export default Perfil;
