import React, { useState } from 'react';
import axios from 'axios';
import CargandoModal from '../../../Animations/CargandoModal';
import { API_URL } from '../../../ApiConexion';

const RecuperarPasswordAdmin = ({ correo, onCodigoEnviado, onClose }) => {
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);

  const handleEnviarCodigo = async () => {
    setCargando(true);
    setMensaje(null);
    try {
      const res = await axios.post(`${API_URL}/api/admin/recuperar-password`, { correo });
      setMensaje({ tipo: 'success', texto: res.data.mensaje });
      onCodigoEnviado();
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.response?.data?.mensaje || 'Error al enviar código.' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Recuperar Contraseña</h2>
        <p className="mb-2 text-sm text-gray-600">
          Se enviará un código de verificación al correo <strong>{correo}</strong>.
        </p>
        {mensaje && (
          <div className={`text-sm mb-2 text-center ${mensaje.tipo === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {mensaje.texto}
          </div>
        )}
        <div className="flex justify-end mt-4 space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">
            Cancelar
          </button>
          <button
            onClick={handleEnviarCodigo}
            disabled={cargando}
            className={`px-4 py-1 rounded text-white ${cargando ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Enviar Código
          </button>

          <CargandoModal mensaje = "Enviando código..." visible={cargando}/>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPasswordAdmin;
