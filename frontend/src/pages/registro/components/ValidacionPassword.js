import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

const ValidacionPassword = ({ password }) => {
  const reglas = [
    {
      label: 'Al menos 8 caracteres',
      cumple: password.length >= 8,
    },
    {
      label: 'Una letra mayúscula (A-Z)',
      cumple: /[A-Z]/.test(password),
    },
    {
      label: 'Una letra minúscula (a-z)',
      cumple: /[a-z]/.test(password),
    },
    {
      label: 'Un número (0-9)',
      cumple: /\d/.test(password),
    },
    {
      label: 'Un carácter especial (!@#$%^&*)',
      cumple: /[\W_]/.test(password),
    },
  ];

  return (
    <div className="border rounded-md p-4 bg-gray-50">
      <h4 className="text-sm font-semibold mb-2 text-gray-700">Requisitos de la contraseña:</h4>
      <ul className="space-y-1">
        {reglas.map((regla, index) => (
          <li key={index} className="flex items-center gap-2 text-sm">
            {regla.cumple ? (
              <FaCheckCircle className="text-green-500" />
            ) : (
              <FaTimesCircle className="text-red-500" />
            )}
            <span className={regla.cumple ? 'text-green-700' : 'text-red-600'}>
              {regla.label}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ValidacionPassword;
