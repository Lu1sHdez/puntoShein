import React, { useState } from 'react';
import DetalleEmpleado from './modales/detalleEmpleado';

const Empleados = ({ empleados, cargando }) => {
  const [modalAbierto, setModalAbierto] = useState(false);
  const [empleadoSeleccionado, setEmpleadoSeleccionado] = useState(null);

  const abrirModal = (empleado) => {
    setEmpleadoSeleccionado(empleado);
    setModalAbierto(true);
  };

  const cerrarModal = () => {
    setModalAbierto(false);
    setEmpleadoSeleccionado(null);
  };

  if (cargando) return <p>Cargando empleados...</p>;

  if (empleados.length === 0) return <p>No hay empleados registrados.</p>;

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Empleados Registrados</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white rounded shadow text-sm">
          <thead>
            <tr className="bg-gray-100 text-left">
              <th className="py-2 px-4">Nombre</th>
              <th className="py-2 px-4">Correo</th>
              <th className="py-2 px-4">Teléfono</th>
              <th className="py-2 px-4">Ubicación</th>
              <th className="py-2 px-4">Género</th>
              <th className="py-2 px-4">Rol</th>
              <th className="py-2 px-4">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {empleados.map((emp) => (
              <tr key={emp.id} className="border-t">
                <td className="py-2 px-4">{`${emp.nombre} ${emp.apellido_paterno} ${emp.apellido_materno}`}</td>
                <td className="py-2 px-4">{emp.correo}</td>
                <td className="py-2 px-4">{emp.telefono}</td>
                <td className="py-2 px-4">{emp.ubicacion}</td>
                <td className="py-2 px-4">{emp.genero === 'H' ? 'Hombre' : 'Mujer'}</td>
                <td className="py-2 px-4">{emp.rol}</td>
                <td className="py-2 px-4">
                  <button
                    onClick={() => abrirModal(emp)}
                    className="text-blue-600 hover:underline font-medium"
                  >
                    Ver detalles
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal de Detalles */}
      {modalAbierto && empleadoSeleccionado && (
        <DetalleEmpleado
          empleado={empleadoSeleccionado}
          onClose={cerrarModal}
        />
      )}
    </div>
  );
};

export default Empleados;
