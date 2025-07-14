import React, { useState } from 'react';

const PasoDatosBasicos = ({ datos, setDatos, onNext, onBack }) => {
  const [errores, setErrores] = useState({});

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

  const handleNext = () => {
    if (validarCampos()) {
      onNext();
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold text-gray-800 text-center">Paso 2: Datos Básicos</h3>

      <div>
        <input
          type="text"
          value={datos.nombre}
          onChange={(e) => setDatos({ ...datos, nombre: e.target.value })}
          placeholder="Escribe el nombre del producto"
          className="w-full border rounded p-2"
        />
        {errores.nombre && <p className="text-red-500 text-sm">{errores.nombre}</p>}
      </div>

      <div>
        <textarea
          value={datos.descripcion}
          onChange={(e) => setDatos({ ...datos, descripcion: e.target.value })}
          placeholder="Añade una descripción"
          className="w-full border rounded p-2"
        />
        {errores.descripcion && <p className="text-red-500 text-sm">{errores.descripcion}</p>}
      </div>

      <div>
        <input
          type="number"
          value={datos.precio}
          onChange={(e) => setDatos({ ...datos, precio: e.target.value })}
          placeholder="Precio"
          className="w-full border rounded p-2"
        />
        {errores.precio && <p className="text-red-500 text-sm">{errores.precio}</p>}
      </div>

      <div>
        <input
          type="text"
          value={datos.color}
          onChange={(e) => setDatos({ ...datos, color: e.target.value })}
          placeholder="Color"
          className="w-full border rounded p-2"
        />
        {errores.color && <p className="text-red-500 text-sm">{errores.color}</p>}
      </div>

      <div>
        <input
          type="number"
          value={datos.stock}
          onChange={(e) => setDatos({ ...datos, stock: e.target.value })}
          placeholder="Stock"
          className="w-full border rounded p-2"
        />
        {errores.stock && <p className="text-red-500 text-sm">{errores.stock}</p>}
      </div>

      <div className="flex justify-between">
        <button onClick={onBack} className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
          Volver
        </button>
        <button onClick={handleNext} className="px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700">
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default PasoDatosBasicos;
