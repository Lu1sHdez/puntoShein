//frontend\src\admin\perfil\Perfil.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { formAnimation } from '../../components/Funciones';
import { API_URL } from '../../ApiConexion';
import { mostrarNotificacion } from '../../Animations/NotificacionSwal';
import CargandoBarra from '../../Animations/CargandoBarra';
import RecuperarPasswordAdmin from '../perfil/modales/RecuperarPasswordAdmin'
import RestablecerPasswordAdmin from '../perfil/modales/RestablecerPasswordAdmin'
import VerificarCodigoAdmin from '../perfil/modales/VerificarCodigoAdmin'
import CargandoModal from '../../Animations/CargandoModal';

const Perfil = () => {
  const [usuario, setUsuario] = useState(null);
  const [datosOriginales, setDatosOriginales] = useState({});
  const [datosEditables, setDatosEditables] = useState({});
  const [modoEdicion, setModoEdicion] = useState(false);
  const [mostrarRecuperacion, setMostrarRecuperacion] = useState(false);
  const [mostrarRestablecer, setMostrarRestablecer] = useState(false);
  const [mostrarVerificarCodigo, setMostrarVerificarCodigo] = useState(false);
  const [Guardando, setGuardando] = useState(false); // Para mostrar el modal de carga



  const navigate = useNavigate();

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/perfil`, { withCredentials: true });
        setUsuario(response.data);
        setDatosOriginales(response.data);
        setDatosEditables({
          nombre: response.data.nombre,
          apellido_paterno: response.data.apellido_paterno,
          apellido_materno: response.data.apellido_materno,
          telefono: response.data.telefono,
          correo: response.data.correo
        });
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
      await axios.put(`${API_URL}/api/admin/perfil`, datosEditables, { withCredentials: true });
      setModoEdicion(false);
      setDatosOriginales(datosEditables); // Actualizar los originales
    } catch (error) {
      mostrarNotificacion("error", "Error al guardar cambios.");
    }finally{
      setGuardando(false)
    }
  };

  if (!usuario) return <CargandoBarra message="Cargando perfil..." />;

  return (
    <motion.div {...formAnimation} className="p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-center">Perfil del Administrador</h2>

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
        className="text-pink-600 underline hover:text-pink-800 transition text-sm"
      >
        Cambiar contraseña
      </button>
    </div>


      <div className="flex justify-end mt-4 space-x-4">
        {!modoEdicion ? (
          <button
            onClick={() => setModoEdicion(true)}
            className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition"
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
                  ? 'bg-pink-600 hover:bg-pink-700'
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
            setMostrarRestablecer(true); // Solo si el código es correcto
          }}
        />
      )}


      {mostrarRestablecer && (
        <RestablecerPasswordAdmin onClose={() => setMostrarRestablecer(false)} />
      )}
      <CargandoModal mensaje="Guardando cambios..." visible={Guardando} />

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
        disabled || !editable ? 'bg-gray-100 text-gray-600' : 'focus:ring-2 focus:ring-pink-400'
      }`}
    />
  </div>
);

export default Perfil;

