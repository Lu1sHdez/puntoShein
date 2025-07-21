// src/pages/registro/components/SeccionPassword.js
import React, { useState } from 'react';
import Formulario from '../../../formulario/formulario';
import { camposPassword } from '../../../formulario/campos';
import ValidacionPassword from './ValidacionPassword'; // si usas reglas visuales

const SeccionPassword = ({ valores, errores = {}, handleChange }) => {
  const [mostrarReglas, setMostrarReglas] = useState(false);

  const handleFocusPassword = (e) => {
    setMostrarReglas(true);
  };

  const handleBlurPassword = (e) => {
    // Solo ocultamos si es un campo de contraseña
    setMostrarReglas(false);
  };

  return (
    <div className="space-y-6">
      <Formulario
        campos={camposPassword}
        valores={valores}
        errores={errores}
        handleChange={handleChange}
        onFocusPassword={handleFocusPassword}
        onBlurPassword={handleBlurPassword}
        ocultarBoton={true}
      />

      {mostrarReglas && (
        <div className="mt-4">
          <ValidacionPassword password={valores.password} />
        </div>
      )}
    </div>
  );
};

export default SeccionPassword;
