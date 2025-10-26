import React, { useState } from "react";
import UsuariosTabla from "./componentes/UsuariosTabla";
import AdministradoresTabla from "./componentes/AdministradoresTabla";
import { motion } from "framer-motion";

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
    <section className="min-h-screen bg-gradient-to-b from-blue-50 to-white px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl max-w-6xl mx-auto animate-fade-in-up"
      >
        <h1 className="text-3xl font-bold mb-8 text-gray-800 text-center">
          Gestión de Usuarios
        </h1>

        {/* === Navegación estilo pestañas === */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="flex flex-wrap justify-center gap-6">
            {[
              { id: "todos", label: "Todos" },
              { id: "usuarios", label: "Usuarios" },
              { id: "administradores", label: "Administradores" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setVista(tab.id)}
                className={`relative pb-2 text-lg font-medium transition duration-200 ease-in-out ${
                  vista === tab.id
                    ? "text-blue-600 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 after:rounded"
                    : "text-gray-500 hover:text-blue-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* === Contenido dinámico === */}
        <div className="mt-6 overflow-x-auto">
          <motion.div
            key={vista}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="transition-all duration-300"
          >
            {renderContenido()}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default GestionUsuarios;
