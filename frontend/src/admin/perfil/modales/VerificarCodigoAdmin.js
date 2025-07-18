import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../ApiConexion';
import CargandoModal from '../../../Animations/CargandoModal';

const VerificarCodigoAdmin = ({ correo, onCodigoCorrecto, onClose }) => {
  const [codigo, setCodigo] = useState('');
  const [mensaje, setMensaje] = useState(null);
  const [cargando, setCargando] = useState(false);


  const handleVerificar = async () => {
    if (!codigo.trim()) {
      setMensaje({ tipo: 'error', texto: 'Debes ingresar el código.' });
      return;
    }

    setCargando(true);
    setMensaje(null);
    try {
      await axios.post(`${API_URL}/api/admin/validar-codigo`, { correo, codigo });
      localStorage.setItem('codigoVerificacionAdmin', JSON.stringify({ correo, codigo }));
      onCodigoCorrecto();
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.response?.data?.mensaje || 'Código inválido o expirado.' });
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Verificar Código</h2>
        <p className="mb-2 text-sm text-gray-600">Código enviado al correo <strong>{correo}</strong>.</p>
        {mensaje && (
          <div className={`text-sm mb-2 text-center text-${mensaje.tipo === 'error' ? 'red' : 'green'}-600`}>
            {mensaje.texto}
          </div>
        )}
        <input
          type="text"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Código de 6 dígitos"
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600">
            Cancelar
          </button>
          <button
            onClick={handleVerificar}
            disabled={cargando}
            className={`px-4 py-1 rounded text-white ${cargando ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}`}
          >
            Verificar Código
          </button>
          <CargandoModal mensaje="Verificando código..." visible={cargando} />

        </div>
      </div>
    </div>
  );
};

export default VerificarCodigoAdmin;
