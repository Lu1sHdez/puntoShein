import React, { useState } from 'react';
import Swal from 'sweetalert2';

const VerificarCodigoAdmin = ({ correo, onCodigoCorrecto, onClose }) => {
  const [codigo, setCodigo] = useState('');

  const handleVerificar = async () => {
    if (!codigo.trim()) {
      return Swal.fire('Código requerido', 'Debes ingresar el código recibido por correo.', 'warning');
    }

    try {
      // Puedes guardar temporalmente el código en localStorage o pasarlo como prop
      localStorage.setItem('codigoVerificacionAdmin', JSON.stringify({ correo, codigo }));
      onCodigoCorrecto(); // Avanza al modal de restablecer contraseña
    } catch (error) {
      Swal.fire('Error', 'Error al verificar el código', 'error');
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
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400 mb-4"
        />
        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleVerificar}
            className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
          >
            Verificar Código
          </button>
        </div>
      </div>
    </div>
  );
};

export default VerificarCodigoAdmin;
