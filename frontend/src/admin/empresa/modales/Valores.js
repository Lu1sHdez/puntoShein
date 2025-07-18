import React, { useState } from "react";
import { createPortal } from "react-dom";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import { mostrarNotificacion } from "../../../Animations/NotificacionSwal";
import { mostrarConfirmacion } from "../../../Animations/ConfirmacionSwal";
import CargandoModal from "../../../Animations/CargandoModal";
import ModalAgregarValor from "./ModalAgregarValor"; // ← nuevo modal
import ModalEditarValor from "./ModalEditarValor";
import { FaPlusCircle } from "react-icons/fa";


const ModalEditarValores = ({ empresa, onClose, onActualizar }) => {
  const [valores, setValores] = useState(empresa?.valores || []);
  const [guardando, setGuardando] = useState(false);
  const [eliminando, setEliminando] = useState(false);
  const [expandido, setExpandido] = useState(null); // índice expandido
  const [modalAgregarVisible, setModalAgregarVisible] = useState(false);
  const [modalEditarVisible, setModalEditarVisible] = useState(false);
  const [valorEditandoIndex, setValorEditandoIndex] = useState(null);

  const handleEliminar = async (index) => {
    const confirmado = await mostrarConfirmacion({
      titulo: "¿Eliminar este valor?",
      texto: "Esta acción no se puede deshacer.",
      confirmText: "Sí, eliminar",
    });

    if (!confirmado) return;

    setEliminando(true);
    setTimeout(() => {
      setValores(valores.filter((_, i) => i !== index));
      setEliminando(false);
    }, 800);
  };


  const guardarValorEditado = (valorActualizado) => {
    const nuevos = [...valores];
    nuevos[valorEditandoIndex] = valorActualizado;
    setValores(nuevos);
  };

  

  const handleGuardar = async () => {
    setGuardando(true);
    try {
      await axios.put(`${API_URL}/api/empresa/empresa`, {
        ...empresa,
        valores,
      }, { withCredentials: true });
      onActualizar();
      onClose();
    } catch (error) {
      mostrarNotificacion("error", "Error al actualizar valores");
    } finally {
      setGuardando(false);
    }
  };

  const actualizarValor = (index, campo, valor) => {
    const nuevos = [...valores];
    nuevos[index][campo] = valor;
    setValores(nuevos);
  };

  const agregarNuevoValor = (nuevo) => {
    setValores([...valores, nuevo]);
  };

  return createPortal(
    <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-[95%] max-w-3xl h-[90vh] overflow-y-auto relative">
        <h2 className="text-2xl font-bold mb-4 text-center">Editar Valores Institucionales</h2>

       {valores.map((valor, index) => (
        <div key={index} className="mb-4 border p-3 rounded-md bg-gray-50">
          <p className="font-semibold text-black">{valor.nombre}</p>
          <p className="text-gray-600 text-sm mt-1">{valor.descripcion}</p>

          <div className="flex gap-3 mt-2">
            <button
              onClick={() => {
                setValorEditandoIndex(index);
                setModalEditarVisible(true);
              }}
              className="text-blue-600 text-sm"
            >
              Editar
            </button>
            <button
              onClick={() => handleEliminar(index)}
              className="text-red-500 text-sm"
            >
              Eliminar
            </button>
          </div>
        </div>
      ))}

      <button
        title="Agregar nuevo valor"
        aria-label="Agregar Valor"
        className="flex items-center gap-2 bg-gray-200 text-black px-4 py-2 rounded-full shadow-sm hover:bg-gray-300 transition-colors duration-200 z-10 text-sm font-medium border border-gray-300"
        onClick={() => setModalAgregarVisible(true)}
      >
        <FaPlusCircle size={16} />
        <span>Agregar otro valor</span>
      </button>


        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Cancelar
          </button>
          <button
            onClick={handleGuardar}
            disabled={guardando}
            className="px-4 py-2 bg-black text-white rounded hover:bg-gray-700"
          >
            {guardando ? "Guardando..." : "Guardar"}
          </button>
        </div>

        {guardando && <CargandoModal visible={guardando} mensaje="Guardando valores..." />}
        {eliminando && <CargandoModal visible={eliminando} mensaje="Eliminando valor..." />}
        {modalAgregarVisible && (
          <ModalAgregarValor
            visible={modalAgregarVisible}
            onClose={() => setModalAgregarVisible(false)}
            onAgregar={agregarNuevoValor}
          />
        )}
        {modalEditarVisible && (
        <ModalEditarValor
          visible={modalEditarVisible}
          valorInicial={valores[valorEditandoIndex]}
          onClose={() => setModalEditarVisible(false)}
          onGuardar={guardarValorEditado}
        />
      )}

      </div>
    </div>,
    document.body
  );
};

export default ModalEditarValores;
