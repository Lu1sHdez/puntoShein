import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import { mostrarNotificacion } from "../../../Animations/NotificacionSwal";
import CargandoModal from "../../../Animations/CargandoModal"; // ← Importado
import LogoDetalle from "./LogoDetalle";
import LogoArrastra from "./LogoArrastra";

const ModalEditarLogo = ({ empresa, onClose, onActualizar }) => {
  const [archivo, setArchivo] = useState(null);
  const [vistaPrevia, setVistaPrevia] = useState(empresa?.logo || "");
  const [guardando, setGuardando] = useState(false);
  const [resolucion, setResolucion] = useState(null);
  const dropRef = useRef(null);

  useEffect(() => {
    return () => {
      if (vistaPrevia?.startsWith("blob:")) {
        URL.revokeObjectURL(vistaPrevia);
      }
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
    const img = new Image();
    img.onload = () => {
      setResolucion(`${img.width}x${img.height}px`);
    };
    img.src = url;

    setArchivo(file);
    setVistaPrevia(url);
  };

  const handleArchivoChange = (e) => {
    const file = e.target.files[0];
    if (file) procesarArchivo(file);
  };

  const handleSubirLogo = async () => {
    if (!archivo) {
      mostrarNotificacion("warning", "Selecciona una imagen antes de subir.");
      return;
    }

    setGuardando(true);
    try {
      const formData = new FormData();
      formData.append("imagen", archivo);

      const { data } = await axios.post(
        `${API_URL}/api/empresa/empresa/logo`,
        formData,
        {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onActualizar(data.logo);
      onClose();
    } catch (error) {
      console.error("Error al subir el logo:", error);
      mostrarNotificacion("error", "Error al subir el logo.");
    } finally {
      setGuardando(false);
    }
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[90%] max-w-md relative">
        <h2 className="text-xl font-bold mb-4 text-center">Editar Logotipo</h2>

        <input
          type="file"
          accept="image/*"
          onChange={handleArchivoChange}
          className="hidden"
          ref={dropRef}
          id="logo-upload"
        />
        <label
          htmlFor="logo-upload"
          className="cursor-pointer block text-sm text-blue-600 hover:underline mb-2 text-center"
        >
          O haz clic aquí para seleccionar una imagen
        </label>

        <LogoArrastra onArchivoSeleccionado={procesarArchivo} />

        <LogoDetalle
          vistaPrevia={vistaPrevia}
          archivo={archivo}
          resolucion={resolucion}
          onEliminar={() => {
            setArchivo(null);
            setVistaPrevia(empresa?.logo || "");
            setResolucion(null);
          }}
        />

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleSubirLogo}
            disabled={guardando}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-600 transition"
          >
            {guardando ? "Subiendo..." : "Guardar"}
          </button>
        </div>

        {guardando && (
          <CargandoModal visible={guardando} mensaje="Subiendo logo..." />
        )}
      </div>
    </div>,
    document.body
  );
};

export default ModalEditarLogo;
