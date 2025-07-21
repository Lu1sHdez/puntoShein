// detalleEmpleado.js
import React from 'react';

const DetalleEmpleado = ({ empleado, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Detalle del Empleado</h2>
        <p><strong>Nombre:</strong> {empleado.nombre} {empleado.apellido_paterno} {empleado.apellido_materno}</p>
        <p><strong>Correo:</strong> {empleado.correo}</p>
        <p><strong>Teléfono:</strong> {empleado.telefono}</p>
        <p><strong>Ubicación:</strong> {empleado.ubicacion}</p>
        <p><strong>Género:</strong> {empleado.genero === 'H' ? 'Hombre' : 'Mujer'}</p>
        <button onClick={onClose} className="mt-4 btn-principal">Cerrar</button>
      </div>
    </div>
  );
};

export default DetalleEmpleado;
