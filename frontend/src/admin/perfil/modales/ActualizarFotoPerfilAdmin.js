import React, { useState, useCallback } from "react";
import axios from "axios";
import Cropper from "react-easy-crop";
import { API_URL } from "../../../ApiConexion";
import { mostrarNotificacion } from "../../../Animations/NotificacionSwal";
import CargandoModal from "../../../Animations/CargandoModal";
import { Pencil } from "lucide-react";

const ActualizarFotoPerfilAdmin = ({ onClose, onFotoActualizada }) => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [subiendo, setSubiendo] = useState(false);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

  const onCropComplete = useCallback((_, areaPixels) => {
    setCroppedAreaPixels(areaPixels);
  }, []);

  const handleChange = (e) => {
    const selected = e.target.files[0];
    if (!selected) return;

    if (!selected.type.startsWith("image/")) {
      mostrarNotificacion("warning", "Solo se permiten archivos de imagen.");
      return;
    }
    if (selected.size > 2 * 1024 * 1024) {
      mostrarNotificacion("warning", "La imagen debe ser menor a 2 MB.");
      return;
    }

    setFile(selected);
    setPreview(URL.createObjectURL(selected));
  };

  const getCroppedImage = async () => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = preview;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const { x, y, width, height } = croppedAreaPixels;
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(image, x, y, width, height, 0, 0, width, height);
        canvas.toBlob(
          (blob) => {
            if (!blob) reject(new Error("Error al recortar imagen"));
            else resolve(blob);
          },
          "image/jpeg",
          0.9
        );
      };
      image.onerror = reject;
    });
  };

  const handleUpload = async () => {
    if (!file) {
      mostrarNotificacion("warning", "Selecciona una imagen primero.");
      return;
    }

    try {
      setSubiendo(true);
      const croppedBlob = await getCroppedImage();
      const formData = new FormData();
      formData.append("foto", croppedBlob, file.name);

      const res = await axios.post(`${API_URL}/api/admin/perfil/foto`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (onFotoActualizada) onFotoActualizada(res.data.foto_perfil);
      onClose();
    } catch (error) {
      console.error("Error al subir foto de perfil:", error);
      mostrarNotificacion("error", "Error al subir la foto.");
    } finally {
      setSubiendo(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-semibold text-center mb-5 text-gray-800">
            Actualizar Foto del Administrador
          </h2>

          {/* Área de recorte o placeholder */}
          <div className="relative w-full aspect-square bg-gray-100 rounded-xl overflow-hidden border border-gray-300">
            {preview ? (
              <Cropper
                image={preview}
                crop={crop}
                zoom={zoom}
                aspect={1}
                cropShape="round"
                showGrid={false}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            ) : (
              <div className="flex flex-col items-center justify-center h-full bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl text-gray-500">
                <div className="w-28 h-28 flex items-center justify-center rounded-full bg-gradient-to-br from-blue-200 to-blue-300 shadow-md border border-gray-300">
                  <Pencil size={28} className="text-gray-700 opacity-70" />
                </div>
                <p className="text-sm mt-3 text-gray-600 font-medium">
                  Agregar foto de perfil
                </p>
              </div>
            )}
          </div>

          {/* Control de zoom */}
          {preview && (
            <div className="mt-4 flex items-center justify-center space-x-3">
              <label className="text-sm text-gray-600">Zoom:</label>
              <input
                type="range"
                min={1}
                max={3}
                step={0.1}
                value={zoom}
                onChange={(e) => setZoom(parseFloat(e.target.value))}
                className="w-44 accent-blue-600"
              />
            </div>
          )}

          {/* Selección de archivo */}
          <div className="mt-6 text-center">
            <label
              htmlFor="file-input"
              className="inline-flex items-center gap-2 bg-blue-600 text-white px-5 py-2 rounded-md cursor-pointer hover:bg-blue-700 transition"
            >
              <Pencil size={18} />
              <span>Seleccionar imagen</span>
            </label>
            <input
              id="file-input"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleChange}
            />
          </div>

          {/* Botones */}
          <div className="flex justify-center mt-6 space-x-4 flex-wrap gap-3">
            <button
              onClick={handleUpload}
              disabled={!file || subiendo}
              className={`px-5 py-2 rounded-md text-white font-medium transition ${
                file
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-gray-400 cursor-not-allowed"
              }`}
            >
              {subiendo ? "Subiendo..." : "Guardar"}
            </button>
            <button
              onClick={onClose}
              className="px-5 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>

      <CargandoModal visible={subiendo} mensaje="Subiendo imagen..." />
    </div>
  );
};

export default ActualizarFotoPerfilAdmin;
