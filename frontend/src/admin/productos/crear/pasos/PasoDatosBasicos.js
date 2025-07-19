import CargandoModal from '../../../../Animations/CargandoModal';
import React, { useState } from "react";

const PasoDatosBasicos = ({ producto, setProducto, onSiguiente }) => {
  const [guardando, setGuardando] = useState(false); // Para manejar el estado de carga
  const [errores, setErrores] = useState({}); // Para manejar los errores de validación

  // Función para manejar cambios en los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProducto((prev) => ({ ...prev, [name]: value }));
  };

  // Función para validar los campos
  const validarCampos = () => {
    let errores = {};
    if (!producto.nombre) errores.nombre = "El nombre es obligatorio";
    if (!producto.descripcion) errores.descripcion = "La descripción es obligatoria";
    if (!producto.color) errores.color = "El color es obligatorio";
    if (!producto.precio || producto.precio <= 0) errores.precio = "El precio debe ser mayor a cero";

    setErrores(errores);
    return Object.keys(errores).length === 0;
  };

  // Función para manejar el paso siguiente
  const handleSiguiente = () => {
    if (!validarCampos()) return; // Solo continuar si los campos son válidos

    setGuardando(true); // Mostrar el modal de carga
    setTimeout(() => {
      setGuardando(false); // Ocultar el modal después de 2 segundos (simulación)
      onSiguiente(); // Llamar la función onSiguiente después de la operación
    }, 2000); // Simulando un proceso de guardado o validación
  };

  return (
    <>
      {/* Modal de carga */}
      <CargandoModal mensaje="Cargando datos..." visible={guardando} />

      <div className="step-container p-6 bg-white rounded-lg shadow-lg max-w-4xl mx-auto">
        <h3 className="text-2xl font-semibold mb-6 text-gray-800">Datos Básicos del Producto</h3>

        {/* Formulario organizado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Campo Nombre */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="nombre"
              value={producto.nombre}
              onChange={handleChange}
              placeholder="Nombre del producto"
              className={`mt-1 p-3 w-full border ${errores.nombre ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500`}
            />
            {errores.nombre && <p className="text-sm text-red-500">{errores.nombre}</p>}
          </div>

          {/* Campo Descripción */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Descripción</label>
            <input
              type="text"
              name="descripcion"
              value={producto.descripcion}
              onChange={handleChange}
              placeholder="Descripción"
              className={`mt-1 p-3 w-full border ${errores.descripcion ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500`}
            />
            {errores.descripcion && <p className="text-sm text-red-500">{errores.descripcion}</p>}
          </div>

          {/* Campo Color */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Color</label>
            <input
              type="text"
              name="color"
              value={producto.color}
              onChange={handleChange}
              placeholder="Color"
              className={`mt-1 p-3 w-full border ${errores.color ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500`}
            />
            {errores.color && <p className="text-sm text-red-500">{errores.color}</p>}
          </div>

          {/* Campo Precio */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700">Precio</label>
            <input
              type="number"
              name="precio"
              value={producto.precio}
              onChange={handleChange}
              placeholder="Precio"
              className={`mt-1 p-3 w-full border ${errores.precio ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:ring-pink-500 focus:border-pink-500`}
            />
            {errores.precio && <p className="text-sm text-red-500">{errores.precio}</p>}
          </div>
        </div>

        {/* Botón siguiente */}
        <div className="flex justify-end mt-6">
          <button
            onClick={handleSiguiente}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-300"
            disabled={guardando}
          >
            {guardando ? "Cargando..." : "Siguiente"}
          </button>
        </div>
      </div>
    </>
  );
};

export default PasoDatosBasicos;
