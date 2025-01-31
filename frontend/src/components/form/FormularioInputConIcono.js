import React from "react";
import {FaEye, FaEyeSlash} from "react-icons/fa"
const FormularioInputConIcono = ({ label, type, name, value, onChange, icon: Icon, showPassword, togglePassword }) => {
  return (
    <div className="relative">
      {/* Ícono a la izquierda */}
      {Icon && <Icon className="absolute left-3 top-3 text-gray-500" />}
      
      <input
        type={showPassword !== undefined ? (showPassword ? "text" : "password") : type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="pl-10 pr-4 py-2 w-full border rounded-lg focus:ring-2 focus:ring-blue-400"
        required
      />

      {/* Ícono de visibilidad para contraseñas */}
      {togglePassword && (
        <button type="button" onClick={togglePassword} className="absolute right-3 top-3 text-gray-500 hover:text-gray-700">
          {showPassword ? <FaEyeSlash /> : <FaEye />}
        </button>
      )}
    </div>
  );
};

export default FormularioInputConIcono;
