import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../ApiConexion';
import { mostrarNotificacion } from '../../../../Animations/NotificacionSwal';
import CargandoModal from '../../../../Animations/CargandoModal';

const PasoImagen = ({ producto, setProducto, onAnterior, onSiguiente }) => {
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(producto.imagen || '');
  const [resolucion, setResolucion] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const inputRef = useRef(null);

  // Liberar URL previa si era blob
  useEffect(() => {
    return () => {
      if (vistaPrevia?.startsWith('blob:')) {
        URL.revokeObjectURL(vistaPrevia);
      }
    };
  }, [vistaPrevia]);

  const procesarArchivo = (file) => {
    if (!file.type.startsWith('image/')) {
      mostrarNotificacion('warning', 'Solo se permiten archivos de imagen.');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      mostrarNotificacion('warning', 'La imagen debe ser menor a 2MB.');
      return;
    }

    const url = URL.createObjectURL(file);
    setVistaPrevia(url);
    setArchivo(file);

    const img = new Image();
    img.onload = () => {
      setResolucion(`${img.width}x${img.height}px`);
    };
    img.src = url;
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) procesarArchivo(file);
  };

  const handleSubirImagen = async () => {
    if (!archivo) return;

    try {
      setSubiendo(true);
      const formData = new FormData();
      formData.append('imagen', archivo);

      const response = await axios.post(`${API_URL}/api/productos/producto/imagen`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { imagenUrl } = response.data;
      setProducto(prev => ({ ...prev, imagen: imagenUrl }));
      onSiguiente(); // Avanzar al siguiente paso
    } catch (error) {
      console.error('Error al subir imagen:', error);
      mostrarNotificacion('error', 'Hubo un error al subir la imagen.');
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="space-y-4 bg-white p-6 rounded-2xl shadow-lg max-w-3xl mx-auto">
      <h3 className="text-xl font-semibold text-gray-800 text-center">Paso 1: Subir Imagen del Producto</h3>

      {/* Input oculto */}
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        ref={inputRef}
        id="input-imagen"
      />
      <label
        htmlFor="input-imagen"
        className="cursor-pointer text-pink-600 hover:underline block text-center"
      >
        Haz clic aquí para seleccionar una imagen
      </label>

      {/* Drag & Drop */}
      <div
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) procesarArchivo(file);
        }}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-300 p-6 rounded-md text-center text-gray-600 hover:bg-gray-100 transition cursor-pointer"
      >
        Arrastra una imagen aquí
      </div>

      {/* Vista previa */}
      {vistaPrevia && (
        <div className="flex justify-center">
          <img
            src={vistaPrevia}
            alt="Vista previa"
            className="h-48 object-contain rounded-md shadow-md"
          />
        </div>
      )}

      {/* Resolución */}
      {resolucion && (
        <p className="text-sm text-gray-500 text-center">Resolución: {resolucion}</p>
      )}

      {/* Botones */}
      <div className="flex justify-between mt-6">
        <button
          onClick={onAnterior}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
        >
          Anterior
        </button>
        <button
          onClick={handleSubirImagen}
          disabled={subiendo || !archivo}
          className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 disabled:opacity-50"
        >
          {subiendo ? 'Subiendo...' : 'Siguiente'}
        </button>
      </div>

      {/* Modal */}
      <CargandoModal mensaje="Subiendo imagen..." visible={subiendo} />
    </div>
  );
};

export default PasoImagen;
