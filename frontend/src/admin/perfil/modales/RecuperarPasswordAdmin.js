//frontend\src\admin\perfil\modales\RecuperarPasswordAdmin.js
import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../../ApiConexion';

const RecuperarPasswordAdmin = ({ correo, onCodigoEnviado, onClose }) => {

  const [cargando, setCargando] = useState(false);

  const handleEnviarCodigo = async () => {
    setCargando(true);
    try {
      const res = await axios.post(`${API_URL}/api/admin/recuperar-password`, { correo });
      Swal.fire('¡Éxito!', res.data.mensaje, 'success');
      onCodigoEnviado(); // Avanza al siguiente modal
    } catch (err) {
      Swal.fire('Error', err.response?.data?.mensaje || 'No se pudo enviar el código', 'error');
    } finally {
      setCargando(false);
    }
  };
  
  

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Recuperar Contraseña</h2>
        <p className="mb-4 text-sm text-gray-600">
          Se enviará un código de verificación al correo <strong>{correo}</strong> para cambiar la contraseña.
        </p>

        <div className="flex justify-end mt-4 space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleEnviarCodigo}
            disabled={cargando}
            className={`px-4 py-1 rounded text-white ${cargando ? 'bg-gray-400' : 'bg-pink-600 hover:bg-pink-700'}`}
          >
            {cargando ? 'Enviando...' : 'Enviar Código'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecuperarPasswordAdmin;
