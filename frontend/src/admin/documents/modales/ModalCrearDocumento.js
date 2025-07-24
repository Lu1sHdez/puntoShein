import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../../ApiConexion';

const ModalCrearDocumento = ({ onClose, onCrearDocumento }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [contenido, setContenido] = useState([]);
  const [loading, setLoading] = useState(false);

  // Agregar nueva sección al contenido
  const agregarSeccion = () => {
    setContenido([
      ...contenido,
      {
        tituloSeccion: '',
        subtitulo: '',
        contenidoLista: [],
      },
    ]);
  };

  // Manejar los cambios en una sección
  const manejarCambioSeccion = (index, field, value) => {
    const nuevoContenido = [...contenido];
    nuevoContenido[index][field] = value;
    setContenido(nuevoContenido);
  };

  // Manejar cambio en el contenido de la lista de viñetas
  const manejarCambioLista = (index, lista) => {
    const nuevoContenido = [...contenido];
    nuevoContenido[index].contenidoLista = lista;
    setContenido(nuevoContenido);
  };

  // Crear el documento
  const handleCrearDocumento = async () => {
    setLoading(true);
    try {
      const response = await axios.post(`${API_URL}/api/documento/documentos`, {
        tipo: 'Aviso de Privacidad',  // Este tipo puede ser modificado
        titulo,
        descripcion,
        contenido,
      });
      console.log('Documento creado:', response.data);
      onCrearDocumento();  // Recargar los documentos después de crear el nuevo
      onClose();  // Cerrar el modal
    } catch (error) {
      console.error('Error al crear el documento:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="modal-container bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold mb-4">Crear Documento</h2>

        {/* Título del Documento */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Título</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Título del documento"
          />
        </div>

        {/* Descripción del Documento */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Descripción</label>
          <textarea
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            placeholder="Descripción del documento"
          />
        </div>

        {/* Contenido del Documento: Secciones */}
        <div className="mb-4">
          <h3 className="text-xl font-medium text-gray-700">Contenido</h3>
          {contenido.map((seccion, index) => (
            <div key={index} className="mb-4 border p-4 rounded-md">
              <label className="block text-sm font-medium text-gray-700">Título de la Sección</label>
              <input
                type="text"
                value={seccion.tituloSeccion}
                onChange={(e) => manejarCambioSeccion(index, 'tituloSeccion', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Título de la sección"
              />

              <label className="block text-sm font-medium text-gray-700 mt-2">Subtítulo</label>
              <input
                type="text"
                value={seccion.subtitulo}
                onChange={(e) => manejarCambioSeccion(index, 'subtitulo', e.target.value)}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Subtítulo de la sección"
              />

              <label className="block text-sm font-medium text-gray-700 mt-2">Contenido de la Lista (Viñetas)</label>
              <textarea
                value={seccion.contenidoLista.join('\n')}
                onChange={(e) => manejarCambioLista(index, e.target.value.split('\n'))}
                className="mt-1 block w-full p-2 border border-gray-300 rounded"
                placeholder="Escribe los elementos en formato de viñetas (una viñeta por línea)"
              />
            </div>
          ))}

          <button
            onClick={agregarSeccion}
            className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Agregar Sección
          </button>
        </div>

        {/* Botones */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
          >
            Cancelar
          </button>
          <button
            onClick={handleCrearDocumento}
            className={`px-4 py-2 bg-blue-600 text-white rounded-lg ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
            disabled={loading}
          >
            {loading ? 'Creando...' : 'Crear Documento'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalCrearDocumento;
