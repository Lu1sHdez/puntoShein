import React, { useState } from "react";
import CargandoModal from "../../../../Animations/CargandoModal";

const PasoDatosBasicos = ({ producto, setProducto, onSiguiente }) => {
  const [guardando, setGuardando] = useState(false);
  const [errores, setErrores] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  const validarCampos = () => {
    let errores = {};
    if (!producto.nombre) errores.nombre = "El nombre es obligatorio";
    if (!producto.descripcion) errores.descripcion = "La descripción es obligatoria";
    if (!producto.color) errores.color = "El color es obligatorio";
    if (!producto.precio || producto.precio <= 0)
      errores.precio = "El precio debe ser mayor a cero";
    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  const handleSiguiente = () => {
    if (!validarCampos()) return;

    setGuardando(true);
    setTimeout(() => {
      setGuardando(false);
      onSiguiente();
    }, 1500);
  };

  return (
    <>
      <CargandoModal mensaje="Cargando datos..." visible={guardando} />

      <div className="p-6 sm:p-8 bg-white rounded-2xl shadow-lg border border-gray-100 max-w-5xl mx-auto animate-fade-in-up">
        {/* Encabezado */}
        <div className="mb-8 text-center sm:text-left">
          <h3 className="text-2xl sm:text-3xl font-bold text-gray-800 tracking-tight">
            Datos Básicos del Producto
          </h3>
          <p className="text-gray-500 text-sm sm:text-base mt-1">
            Ingresa la información principal del producto antes de continuar.
          </p>
        </div>

        {/* Formulario */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* === Campo Nombre === */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              placeholder="Ej: Blusa floral"
              className={`w-full p-3 border ${
                errores.nombre ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition`}
            />
            {errores.nombre && (
              <p className="text-sm text-red-500 mt-1">{errores.nombre}</p>
            )}
          </div>

          {/* === Campo Descripción === */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Descripción
            </label>
            <input
              type="text"
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              placeholder="Ej: Blusa casual de verano"
              className={`w-full p-3 border ${
                errores.descripcion ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition`}
            />
            {errores.descripcion && (
              <p className="text-sm text-red-500 mt-1">
                {errores.descripcion}
              </p>
            )}
          </div>

          {/* === Campo Color === */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Color
            </label>
            <input
              type="text"
              name="color"
              value={producto.color}
              onChange={handleChange}
              placeholder="Ej: Rosa pastel"
              className={`w-full p-3 border ${
                errores.color ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition`}
            />
            {errores.color && (
              <p className="text-sm text-red-500 mt-1">{errores.color}</p>
            )}
          </div>

          {/* === Campo Precio === */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Precio
            </label>
            <input
              type="number"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              placeholder="Ej: 299.99"
              className={`w-full p-3 border ${
                errores.precio ? "border-red-500" : "border-gray-300"
              } rounded-lg shadow-sm focus:ring-2 focus:ring-blue-400 outline-none transition`}
            />
            {errores.precio && (
              <p className="text-sm text-red-500 mt-1">{errores.precio}</p>
            )}
          </div>
        </div>

        {/* Botón siguiente */}
        <div className="flex justify-end mt-8">
          <button
            onClick={handleSiguiente}
            disabled={guardando}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 active:bg-blue-800 transition-all duration-300 shadow-sm"
          >
            {guardando ? "Cargando..." : "Siguiente →"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PasoDatosBasicos;
