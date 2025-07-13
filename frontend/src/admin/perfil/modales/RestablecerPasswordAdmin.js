import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { API_URL } from '../../../ApiConexion';

const RestablecerPasswordAdmin = ({ onClose }) => {
  const [form, setForm] = useState({
    nuevaContrasena: '',
    confirmar: ''
  });

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const datosGuardados = JSON.parse(localStorage.getItem('codigoVerificacionAdmin'));
    if (!datosGuardados || !datosGuardados.correo || !datosGuardados.codigo) {
      return Swal.fire('Error', 'Faltan datos del código de verificación.', 'error');
    }

    if (!form.nuevaContrasena || !form.confirmar) {
      return Swal.fire('Campos vacíos', 'Todos los campos son obligatorios', 'warning');
    }

    if (form.nuevaContrasena !== form.confirmar) {
      return Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    }

    try {
      await axios.put(`${API_URL}/api/admin/restablecer-password`, {
        correo: datosGuardados.correo,
        codigo: datosGuardados.codigo,
        nuevaContrasena: form.nuevaContrasena
      });

      Swal.fire('Éxito', 'Contraseña actualizada correctamente', 'success');
      localStorage.removeItem('codigoVerificacionAdmin'); // Limpia después de éxito
      onClose();
    } catch (err) {
      Swal.fire('Error', err.response?.data?.mensaje || 'No se pudo cambiar la contraseña', 'error');
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Restablecer Contraseña</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input
            type="password"
            name="nuevaContrasena"
            placeholder="Nueva contraseña"
            value={form.nuevaContrasena}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <input
            type="password"
            name="confirmar"
            placeholder="Confirmar contraseña"
            value={form.confirmar}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <div className="flex justify-end space-x-2 mt-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-1 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-pink-600 text-white px-4 py-1 rounded hover:bg-pink-700"
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RestablecerPasswordAdmin;
