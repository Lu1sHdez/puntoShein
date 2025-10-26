import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../../ApiConexion";
import { mostrarNotificacion } from "../../../../Animations/NotificacionSwal";
import CargandoModal from "../../../../Animations/CargandoModal";

const PasoImagen = ({ producto, setProducto, onAnterior, onSiguiente }) => {
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(producto.imagen || "");
  const [resolucion, setResolucion] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const inputRef = useRef(null);

  // Liberar memoria del blob cuando cambie la imagen
  useEffect(() => {
    return () => {
      if (vistaPrevia?.startsWith("blob:")) URL.revokeObjectURL(vistaPrevia);
    };
  }, [vistaPrevia]);

  const procesarArchivo = (file) => {
    if (!file.type.startsWith("image/")) {
      mostrarNotificacion("warning", "Solo se permiten archivos de imagen.");
      return;
    }
    if (file.size > 2 * 1024 * 1024) {
      mostrarNotificacion("warning", "La imagen debe ser menor a 2MB.");
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
    if (!archivo) {
      mostrarNotificacion("warning", "Selecciona una imagen antes de continuar.");
      return;
    }

    try {
      setSubiendo(true);
      const formData = new FormData();
      formData.append("imagen", archivo);

      const response = await axios.post(
        `${API_URL}/api/productos/producto/imagen`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      const { imagenUrl } = response.data;
      setProducto((prev) => ({ ...prev, imagen: imagenUrl }));
      mostrarNotificacion("success", "Imagen subida correctamente");
      onSiguiente();
    } catch (error) {
      console.error("Error al subir imagen:", error);
      mostrarNotificacion("error", "Hubo un error al subir la imagen.");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-4xl mx-auto animate-fade-in-up">
      {/* Título */}
      <div className="text-center mb-8">
        <h3 className="text-2xl sm:text-3xl font-bold text-gray-800">
          Imagen del Producto
        </h3>
        <p className="text-gray-500 text-sm sm:text-base mt-1">
          Sube una imagen clara y representativa del producto.
        </p>
      </div>

      {/* Input de archivo oculto */}
      <input
        type="file"
        accept="image/*"
        onChange={handleInputChange}
        ref={inputRef}
        className="hidden"
      />

      {/* Zona de carga */}
      <div
        onDrop={(e) => {
          e.preventDefault();
          const file = e.dataTransfer.files[0];
          if (file) procesarArchivo(file);
        }}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => inputRef.current?.click()}
        className="border-2 border-dashed border-blue-300 p-8 rounded-xl text-center cursor-pointer bg-blue-50 hover:bg-blue-100 transition-all duration-200"
      >
        {vistaPrevia ? (
          <div className="flex flex-col items-center">
            <img
              src={vistaPrevia}
              alt="Vista previa"
              className="w-48 h-48 object-contain rounded-lg shadow-md border border-gray-200 mb-3"
            />
            <p className="text-sm text-gray-500">{resolucion}</p>
            <p className="text-blue-600 text-sm font-medium mt-2 hover:underline">
              Cambiar imagen
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-blue-700 font-semibold text-base">
              Arrastra una imagen o haz clic para seleccionar
            </p>
            <p className="text-sm text-gray-500">
              (Formatos permitidos: JPG, PNG, máximo 2MB)
            </p>
          </div>
        )}
      </div>

      {/* Botones */}
      <div className="flex justify-between mt-8">
        <button
          onClick={onAnterior}
          className="px-6 py-2 rounded-lg bg-gray-400 text-white font-semibold hover:bg-gray-500 active:bg-gray-600 transition"
        >
          ← Anterior
        </button>
        <button
          onClick={handleSubirImagen}
          disabled={subiendo || !archivo}
          className={`px-6 py-2 rounded-lg font-semibold text-white transition-all duration-300 shadow-sm ${
            subiendo || !archivo
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700 active:bg-blue-800"
          }`}
        >
          {subiendo ? "Subiendo..." : "Siguiente →"}
        </button>
      </div>

      {/* Modal de carga */}
      <CargandoModal mensaje="Subiendo imagen..." visible={subiendo} />
    </div>
  );
};

export default PasoImagen;
