// frontend/src/admin/perfil/modales/RestablecerPasswordAdmin.js
import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../ApiConexion';
import FormularioInput from '../../../components/form/FormularioInput';
import CargandoModal from '../../../Animations/CargandoModal';

const RestablecerPasswordAdmin = ({ onClose }) => {
  const [form, setForm] = useState({ nueva: '', confirmar: '' });
  const [showNueva, setShowNueva] = useState(false);
  const [showConfirmar, setShowConfirmar] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [exito, setExito] = useState(false);
  const [cargando, setCargando] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const datos = JSON.parse(localStorage.getItem('codigoVerificacionAdmin'));

    if (!datos) {
      setMensaje({ tipo: 'error', texto: 'Faltan datos del código de verificación.' });
      return;
    }

    if (!form.nueva || !form.confirmar) {
      setMensaje({ tipo: 'error', texto: 'Todos los campos son obligatorios.' });
      return;
    }

    if (form.nueva !== form.confirmar) {
      setMensaje({ tipo: 'error', texto: 'Las contraseñas no coinciden.' });
      return;
    }
    setCargando(true); // Mostrar modal de carga
    setMensaje(null);

    try {
      await axios.put(`${API_URL}/api/admin/restablecer-password`, {
        correo: datos.correo,
        codigo: datos.codigo,
        nuevaContrasena: form.nueva
      });

      localStorage.removeItem('codigoVerificacionAdmin');
      setMensaje({ tipo: 'success', texto: 'Contraseña actualizada correctamente.' });
      setExito(true);
      setTimeout(() => onClose(), 1500);
    } catch (err) {
      setMensaje({ tipo: 'error', texto: err.response?.data?.mensaje || 'Error al cambiar la contraseña.' });
    }finally{
      setCargando(false)
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4 text-center">Restablecer Contraseña</h2>
        {mensaje && (
          <div className={`text-sm mb-2 text-center ${mensaje.tipo === 'success' ? 'text-green-600' : 'text-red-600'}`}>
            {mensaje.texto}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-3">
          <FormularioInput
            label="Nueva contraseña"
            type="password"
            name="nueva"
            value={form.nueva}
            placeholder="Ingresa nueva contraseña"
            onChange={handleChange}
            showPassword={showNueva}
            togglePassword={() => setShowNueva(prev => !prev)}
            error={!form.nueva && mensaje?.tipo === 'error'}
          />
          <FormularioInput
            label="Confirmar contraseña"
            type="password"
            name="confirmar"
            value={form.confirmar}
            placeholder="Confirma nueva contraseña"
            onChange={handleChange}
            showPassword={showConfirmar}
            togglePassword={() => setShowConfirmar(prev => !prev)}
            error={!form.confirmar && mensaje?.tipo === 'error'}
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
              className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
            >
              Cambiar Contraseña
            </button>
            <CargandoModal mensaje="Cambiando contraseña..." visible={cargando} />

          </div>
        </form>
      </div>
    </div>
  );
};

export default RestablecerPasswordAdmin;
