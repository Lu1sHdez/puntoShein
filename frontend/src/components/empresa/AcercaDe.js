import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AcercaDe = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Función para obtener los datos de la empresa desde la API
  const fetchEmpresa = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/empresa/empresa', {
        withCredentials: true,  // Si usas autenticación basada en cookies
      });
      setEmpresa(response.data);  // Guardamos los datos de la empresa en el estado
    } catch (error) {
      setError('Error al obtener los datos de la empresa');
      console.error('Error al obtener los datos de la empresa:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpresa();  // Llamamos a la función para obtener los datos de la empresa
  }, []);  // Solo se ejecuta una vez al montar el componente

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="p-4 max-w-3xl mx-auto text-justify">
      <h2 className="text-2xl font-bold text-center mb-4">Acerca de nosotros</h2>

      <h3 className="text-xl font-semibold mb-2">Nuestra Misión</h3>
      <p className="mb-4">{empresa.mision}</p>

      <h3 className="text-xl font-semibold mb-2">Nuestra Visión</h3>
      <p className="mb-4">{empresa.vision}</p>

      <h3 className="text-xl font-semibold mb-2">Nuestros Valores</h3>
      <ul className="list-disc list-inside mb-4">
        {empresa.valores && empresa.valores.length > 0 ? (
          empresa.valores.map((valor, index) => (
            <li key={index}>
              <strong>{valor.nombre}:</strong> {valor.descripcion}
            </li>
          ))
        ) : (
          <p>No hay valores definidos.</p>
        )}
      </ul>

      <h3 className="text-xl font-semibold mb-2">Nuestra Historia</h3>
      <p className="mb-4">{empresa.historia}</p>

      <h3 className="text-xl font-semibold mb-2">Nuestro Equipo</h3>
      <p className="mb-4">{empresa.equipo}</p>

      <h3 className="text-xl font-semibold mb-2">Información de Contacto</h3>
      <div className="mb-4">
        <strong className="text-gray-700">Correo Electrónico:</strong>
        <p className="text-gray-600">{empresa.correo}</p>
      </div>
      <div className="mb-4">
        <strong className="text-gray-700">Teléfono:</strong>
        <p className="text-gray-600">{empresa.telefono}</p>
      </div>
    </div>
  );
};

export default AcercaDe;
