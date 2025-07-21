import React, { useState } from 'react';
import UsuariosTabla from './componentes/UsuariosTabla';
import AdministradoresTabla from './componentes/AdministradoresTabla';

const GestionUsuarios = () => {
  const [vista, setVista] = useState("todos");

  const renderContenido = () => {
    switch (vista) {
      case "usuarios":
        return <UsuariosTabla />;
      case "administradores":
        return <AdministradoresTabla />;
      default:
        return (
          <>
            <AdministradoresTabla />
            <UsuariosTabla />
          </>
        );
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">Gestión de Usuarios</h1>

      {/* Navegación estilo pestañas */}
      <div className="border-b border-gray-300 mb-6">
        <nav className="flex space-x-6">
          <button
            onClick={() => setVista("todos")}
            className={`pb-2 text-lg font-medium transition duration-200 ${
              vista === "todos"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Todos
          </button>
          <button
            onClick={() => setVista("usuarios")}
            className={`pb-2 text-lg font-medium transition duration-200 ${
              vista === "usuarios"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Usuarios
          </button>
          <button
            onClick={() => setVista("administradores")}
            className={`pb-2 text-lg font-medium transition duration-200 ${
              vista === "administradores"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-blue-500"
            }`}
          >
            Administradores
          </button>
        </nav>
      </div>

      {/* Contenido dinámico */}
      <div className="mt-4 overflow-x-auto">{renderContenido()}</div>
    </div>
  );
};

export default GestionUsuarios;
