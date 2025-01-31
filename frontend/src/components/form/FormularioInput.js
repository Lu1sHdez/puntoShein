import React from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";

const FormularioInput = ({ label, type, name, value, onChange, required, showPassword, togglePassword,placeholder}) => {
  return (
    <div className="mb-4 relative">
      <label className="block text-gray-700 text-sm font-medium mb-1">{label}</label>
      <div className="relative">
        <input
          type={showPassword !== undefined ? (showPassword ? "text" : "password") : type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-400"
          required={required}
        />
        {togglePassword && (
          <button
          type="button"
          onClick={togglePassword}
          className="absolute right-3 top-2 text-gray-500 hover:text-gray-700"
          aria-label={showPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </button>
        
        )}
      </div>
    </div>
  );
};

export default FormularioInput;
