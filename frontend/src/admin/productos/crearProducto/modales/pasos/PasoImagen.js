import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { API_URL } from '../../../../../ApiConexion';
import { mostrarNotificacion } from '../../../../../Animations/NotificacionSwal';
import CargandoModal from '../../../../../Animations/CargandoModal.js';


const PasoImagen = ({ imagen, setImagen, onNext }) => {
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(imagen || '');
  const [resolucion, setResolucion] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const inputRef = useRef(null);

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
  
    try {
      setSubiendo(true);
      const formData = new FormData();
      formData.append('imagen', archivo);
    
      const response = await axios.post(`${API_URL}/api/productos/producto/imagen`, formData, {
        withCredentials: true, // 👈 necesario si backend usa cookie
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
  
      const { imagenUrl } = response.data;
      setImagen(imagenUrl);
      onNext(); // continuar al siguiente paso
    } catch (error) {
      console.error('Error al subir imagen:', error);
    } finally {
      setSubiendo(false);
    }
  };
  
  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 text-center">Paso 1: Seleccionar Imagen</h3>

      {/* Selector manual */}
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        className="hidden"
        ref={inputRef}
        id="producto-upload"
      />
      <label
        htmlFor="producto-upload"
        className="cursor-pointer text-blue-600 hover:underline block text-center"
      >
        Haz clic aquí para seleccionar una imagen
      </label>

      {/* Zona de arrastrar y soltar */}
      <div
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) procesarArchivo(file);
        }}
        onDragOver={(e) => e.preventDefault()}
        className="border-2 border-dashed border-gray-400 p-6 rounded-md text-center text-gray-600 hover:bg-gray-100 transition"
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
      <div className="flex justify-end gap-3">
        <button
          onClick={handleSubirImagen}
          disabled={subiendo || !archivo}
          className="bg-pink-600 text-white px-4 py-2 rounded hover:bg-pink-700 disabled:opacity-50"
        >
          {subiendo ? 'Subiendo...' : 'Continuar'}
        </button>
      </div>
      {/* Modal de carga */}
      <CargandoModal mensaje="Subiendo imagen..." visible={subiendo} />
    </div>
  );
};

export default PasoImagen;
