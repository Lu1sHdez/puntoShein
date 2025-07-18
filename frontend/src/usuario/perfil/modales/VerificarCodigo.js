import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../ApiConexion';
import CargandoModal from '../../../Animations/CargandoModal';


const VerificarCodigo = ({ correo, onCodigoCorrecto, onClose }) => {
  const [codigo, setCodigo] = useState('');
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState(null); 

  const handleVerificar = async () => {
    setMensaje(null); // Limpia el mensaje anterior

    if (!codigo.trim()) {
      setMensaje({ tipo: 'advertencia', texto: 'Debes ingresar el código recibido por correo.' });
      return;
    }

    setCargando(true);
    try {
      await axios.post(`${API_URL}/api/usuario/validar-codigo`, { correo, codigo });

      // Código válido: guardar y avanzar
      localStorage.setItem('codigoVerificacionUsuario', JSON.stringify({ correo, codigo }));
      onCodigoCorrecto();
    } catch (error) {
      setMensaje({
        tipo: 'error',
        texto: error.response?.data?.mensaje || 'Código inválido o expirado.'
      });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Verificar Código</h2>
        <p className="mb-2 text-sm text-gray-600">
          Ingresa el código enviado al correo <strong>{correo}</strong>.
        </p>

        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código de 6 dígitos"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 mb-2"
        />

        {/* 🆕 Mensaje de error o advertencia */}
        {mensaje && (
          <div
            className={`text-sm mb-2 ${
              mensaje.tipo === 'error' ? 'text-red-600' : 'text-yellow-600'
            }`}
          >
            {mensaje.texto}
          </div>
        )}

        <div className="flex justify-end space-x-2 mt-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleVerificar}
            disabled={cargando}
            className={`px-4 py-1 rounded text-white ${cargando ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-600'}`}
          >
            Verificar Código
          </button>
          <CargandoModal mensaje="Verificando código..." visible={cargando} />
        </div>
      </div>
    </div>
  );
};

export default VerificarCodigo;
