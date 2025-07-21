import React, { useState } from 'react';
import FormularioInvitacionEmpleado from './FormularioInvitacionEmpleado';
import InvitacionesEnviadas from './InvitacionesEnviadas';


const Empleados = () => {
  const [mostrarModal, setMostrarModal] = useState(false);

  const abrirModal = () => setMostrarModal(true);
  const cerrarModal = () => setMostrarModal(false);

  return (
    <div className="p-6">
      <button
        onClick={abrirModal}
        className="btn-principal"
      >
        Invitar nuevo empleado
      </button>

      {/* Lista de invitaciones */}
      <InvitacionesEnviadas />

      {mostrarModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <FormularioInvitacionEmpleado onClose={cerrarModal} />
        </div>
      )}
    </div>
  );
};

export default Empleados;
