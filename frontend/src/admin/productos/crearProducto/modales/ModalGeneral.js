import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import PasoImagen from './pasos/PasoImagen';
import PasoDatosBasicos from './pasos/PasoDatos';
import PasoCategoria from './pasos/PasoCategoria';
import PasoResumen from './pasos/PasoResumen';
import PasoExito from './pasos/PasoExito';

const ModalGeneral = ({ visible, onClose, progreso = 1, setProgreso, imagen, setImagen }) => {
  const [datos, setDatos] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    color: '',
    stock: '',
    categoria_id: '',
    subcategoria_id: '',
  });

  if (!visible) return null; // ← este condicional ya está después del hook

  const totalPasos = 5;

  const renderPasoActual = () => {
    switch (progreso) {
      case 1:
        return <PasoImagen imagen={imagen} setImagen={setImagen} onNext={() => setProgreso(2)} />;
      case 2:
        return (
          <PasoDatosBasicos
            datos={datos}
            setDatos={setDatos}
            onNext={() => setProgreso(3)}
            onBack={() => setProgreso(1)}
          />
        );
      case 3:
        return (
          <PasoCategoria
            datos={datos}
            setDatos={setDatos}
            onNext={() => setProgreso(4)}
            onBack={() => setProgreso(2)}
          />
        );
      case 4:
        return (
          <PasoResumen
            datos={datos}
            imagen={imagen}
            onConfirm={() => setProgreso(5)}
            onBack={() => setProgreso(3)}
          />
        );
      case 5:
        return <PasoExito onClose={onClose} />;
      default:
        return null;
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-[95%] max-w-5xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Crear un nuevo producto
        </h2>

        {/* Barra de progreso de 5 pasos */}
        <div className="flex items-center justify-between mb-6">
          {[...Array(totalPasos)].map((_, index) => (
            <div
              key={index}
              className={`h-3 rounded-full flex-1 mx-1 transition-all duration-300 ${
                index < progreso ? 'bg-pink-600' : 'bg-gray-300'
              }`}
            ></div>
          ))}
        </div>

        {/* Contenido del paso actual */}
        <div className="mb-6">{renderPasoActual()}</div>

        {/* Botón para cerrar */}
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalGeneral;
