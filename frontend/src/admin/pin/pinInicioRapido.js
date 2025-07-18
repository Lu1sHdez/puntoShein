import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { formAnimation, userDetailsLoadingAnimation } from '../../components/Funciones.js';
import CargandoBarra from '../../Animations/CargandoBarra.js';
import RegresarButton from '../../components/Regresar.js';
import { API_URL } from '../../ApiConexion.js';

const PinInicioRapido = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pin, setPin] = useState(null);
  const [expira, setExpira] = useState(null);
  const [error, setError] = useState(null);
  const [loginStatus, setLoginStatus] = useState(null); // null: no intentado, true: éxito, false: fallido
  const navigate = useNavigate();

  // Cargar el perfil del usuario
  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/admin/perfil`, { withCredentials: true });
        setUsuario(response.data);
      } catch (err) {
        setError("Error al obtener los datos del administrador.");
        if (err.response?.status === 401) {
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    obtenerPerfil();
  }, [navigate]);

  const generarPin = async () => {
    try {
      setLoginStatus(null); // Resetear estado de login
      const res = await axios.post(`${API_URL}/api/pin/generar`, {
        usuario_id: usuario.id
      });
      setPin(res.data.pin);
      const expiracion = new Date(Date.now() + 5 * 60000); // 5 minutos
      setExpira(expiracion.toLocaleTimeString());
      
      // Iniciar verificación periódica del estado de login
      const intervalId = setInterval(async () => {
        try {
          const loginCheck = await axios.get(`${API_URL}/api/pin/check-login`, {
            params: { pin: res.data.pin },
            withCredentials: true
          });
          
          if (loginCheck.data.loggedIn) {
            setLoginStatus(true);
            clearInterval(intervalId);
          }
        } catch (err) {
          console.error("Error verificando login:", err);
        }
      }, 3000); // Verificar cada 3 segundos

      // Limpiar intervalo después de 5 minutos (tiempo de expiración del PIN)
      setTimeout(() => {
        clearInterval(intervalId);
        if (loginStatus === null) {
          setLoginStatus(false);
        }
      }, 5 * 60000);

    } catch (err) {
      setError("Error al generar el PIN. Intenta nuevamente.");
    }
  };

  if (loading) {
    return <CargandoBarra message="Cargando información..." />;
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <motion.div {...formAnimation} className="flex items-center justify-center mt-0 py-8 px-4">
      <motion.div {...userDetailsLoadingAnimation} className="bg-white p-5 rounded-lg shadow-lg w-full max-w-2xl">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Generar PIN para Smartwatch</h1>

        {loginStatus === true && (
          <div className="text-green-500 text-center mb-4">
            <p className="text-xl font-semibold">¡Has iniciado sesión correctamente!</p>
          </div>
        )}

        {loginStatus === false && (
          <div className="text-red-500 text-center mb-4">
            <p className="text-xl font-semibold">El PIN ha expirado sin iniciar sesión</p>
          </div>
        )}

        <div className="space-y-4 text-center">
          <p className="text-gray-700 mb-2">Este PIN te permitirá iniciar sesión desde tu smartwatch.</p>
          <button
            onClick={generarPin}
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition"
          >
            Generar PIN Temporal
          </button>

          {pin && (
            <div className="mt-6">
              <p className="text-lg font-semibold text-gray-800">PIN generado:</p>
              <p className="text-4xl font-mono text-blue-600 mt-2">{pin}</p>
              <p className="text-sm text-gray-500 mt-1">Expira a las: {expira}</p>
              
            </div>
          )}
        </div>

        <div className="mt-6">
          <RegresarButton />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default PinInicioRapido;