// src/admin/setting/Configuracion.js
import React, { useState } from 'react';
import RegresarButton from '../../components/Regresar.js';  // Importamos el botón

const Configuracion = () => {
  const [formData, setFormData] = useState({
    siteName: '',
    email: '',
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la lógica para enviar los datos al servidor
    console.log('Configuración guardada:', formData);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-center text-gray-700 mb-6">Configuración del Sistema</h1>

      <form onSubmit={handleSubmit}>
        {/* Nombre del sitio */}
        <div className="mb-4">
          <label htmlFor="siteName" className="block text-sm font-medium text-gray-600 mb-2">
            Nombre del Sitio
          </label>
          <input
            type="text"
            id="siteName"
            name="siteName"
            value={formData.siteName}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nombre del sitio"
          />
        </div>

        {/* Correo electrónico */}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-600 mb-2">
            Correo Electrónico
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Correo electrónico"
          />
        </div>

        {/* Contraseña */}
        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium text-gray-600 mb-2">
            Nueva Contraseña
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Nueva contraseña"
          />
        </div>

        {/* Botón de enviar */}
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-200"
        >
          Guardar Cambios
        </button>
        
        <RegresarButton/>
      </form>
    </div>
  );
};

export default Configuracion;
