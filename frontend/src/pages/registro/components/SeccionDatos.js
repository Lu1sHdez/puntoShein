import React from 'react';
import Formulario from '../../../formulario/formulario';
import { camposDatosPersonales } from '../../../formulario/campos';

const SeccionDatos = ({ valores, errores = {}, handleChange }) => {
  const handleInputFilter = (e, name) => {
    if (["nombre", "apellido_paterno", "apellido_materno"].includes(name)) {
      e.target.value = e.target.value.replace(/[^a-zA-ZáéíóúÁÉÍÓÚñÑ\s]/g, '');
    }
    if (name === "telefono") {
      e.target.value = e.target.value.replace(/\D/g, '').slice(0, 10);
    }
  };

  return (
    <div>
      <Formulario
        campos={camposDatosPersonales}
        valores={valores}
        errores={errores}
        handleChange={handleChange}
        onInput={handleInputFilter} // <-- Aquí pasamos el filtro
        ocultarBoton={true}
      />
    </div>
  );
};

export default SeccionDatos;
