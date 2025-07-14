import React, { useState } from 'react';
import ModalColor from './ModalColor';
import { Palette } from "lucide-react";
import CargandoModal from '../../../../../Animations/CargandoModal';

const PasoDatosBasicos = ({ datos, setDatos, onNext, onBack }) => {
  const [errores, setErrores] = useState({});
  const [mostrarModalColor, setMostrarModalColor] = useState(false);
  const[validando, setValidando]  = useState(false);

  const validarCampos = () => {
    const nuevosErrores = {};
    if (!datos.nombre.trim()) nuevosErrores.nombre = "El nombre es obligatorio.";
    if (!datos.descripcion.trim()) nuevosErrores.descripcion = "La descripción es obligatoria.";
    if (!datos.precio) nuevosErrores.precio = "El precio es obligatorio.";
    if (!datos.color.trim()) nuevosErrores.color = "El color es obligatorio.";
    if (!datos.stock) nuevosErrores.stock = "El stock es obligatorio.";

    setErrores(nuevosErrores);
    return Object.keys(nuevosErrores).length === 0;
  };

    const handleNext = async () => {
        setValidando(true); // mostrar modal de carga
        setTimeout(() => {
        const valido = validarCampos();
        setValidando(false); // ocultar modal
        if (valido) onNext();
        }, 800); // pequeño retraso para animación
    };

  return (
    <div className="space-y-5">
      <h3 className="text-xl font-semibold text-gray-800 text-center">Paso 2: Datos Básicos</h3>

      {/* Nombre */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Nombre del producto</label>
        <input
          type="text"
          value={datos.nombre}
          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
          placeholder="Ej. Camiseta de algodón"
          className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
        />
        {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
      </div>

      {/* Descripción */}
      <div className="space-y-1">
        <label className="block text-sm font-medium text-gray-700">Descripción del producto</label>
        <textarea
          value={datos.descripcion}
          onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
          placeholder="Describe el producto, sus materiales, usos, etc."
          rows={4}
          className="w-full border border-gray-300 rounded-lg p-3 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition resize-none"
        />
        {errores.descripcion && <p className="text-red-500 text-sm">{errores.descripcion}</p>}
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-start">
        {/* Precio */}
        <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Precio</label>
            <div className="relative">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-500 text-sm">$</span>
            <input
                type="number"
                value={datos.precio}
                onChange={(e) => setDatos({ ...datos, precio: e.target.value })}
                placeholder="Ej. 299.99"
                className="w-full border border-gray-300 rounded-lg pl-8 pr-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
                step="0.01"
                min="0"
            />
            </div>
            {errores.precio && <p className="text-red-500 text-sm mt-1">{errores.precio}</p>}
        </div>

        {/* Stock */}
        <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
            type="number"
            value={datos.stock}
            onChange={(e) => setDatos({ ...datos, stock: e.target.value })}
            placeholder="Cantidad en stock"
            className="w-full border border-gray-300 rounded-lg p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition"
            min="0"
            />
            {errores.stock && <p className="text-red-500 text-sm mt-1">{errores.stock}</p>}
        </div>

        {/* Color */}
        <div className="w-full md:w-1/3">
            <label className="block text-sm font-medium text-gray-700 mb-1">Color</label>
            <div className="flex items-center gap-2">
            <input
                type="text"
                value={datos.color}
                readOnly
                placeholder="Selecciona un color"
                className="w-full border rounded-lg p-2 bg-gray-100 cursor-not-allowed shadow-sm"
            />
            <button
                type="button"
                onClick={() => setMostrarModalColor(true)}
                className="p-2 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 shadow"
                title="Elegir color"
            >
                <Palette className="w-5 h-5" />
            </button>
            {datos.color && (
                <div
                className="w-8 h-8 rounded-full border shadow-inner"
                style={{ backgroundColor: datos.color }}
                title={datos.color}
                />
            )}
            </div>
            {errores.color && <p className="text-red-500 text-sm mt-1">{errores.color}</p>}
        </div>
        </div>


      {/* Botones */}
      <div className="flex justify-between pt-2">
        <button onClick={onBack} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
          Volver
        </button>
        <button onClick={handleNext} className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
          Siguiente
        </button>
      </div>

      {/* Modal de color */}
      <ModalColor
        visible={mostrarModalColor}
        onClose={() => setMostrarModalColor(false)}
        onSeleccionarColor={(color) => setDatos({ ...datos, color })}
      />

      {/* Modal de carga */}
      <CargandoModal visible={validando} mensaje="Validando datos..." />
    </div>
  );
};

export default PasoDatosBasicos;
