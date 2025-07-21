import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import useSesionUsuario from "../context/useSesionUsuario";
import { API_URL } from "../ApiConexion";
import axios from "axios";
import CerrarSesionModal from "../modal/CerrarSesion"; // ✅ IMPORTAR MODAL

const EncabezadoBienvenida = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { usuarioAutenticado, datos } = useSesionUsuario();
  const [empresa, setEmpresa] = useState(null);
  const [mostrarModalCerrarSesion, setMostrarModalCerrarSesion] = useState(false); // ✅ Estado del modal

  // Iniciales
  const generarIniciales = (nombre) => {
    if (!nombre) return "";
    const palabras = nombre.trim().split(" ");
    return palabras.length >= 2
      ? `${palabras[0][0]}${palabras[1][0]}`.toUpperCase()
      : palabras[0][0].toUpperCase();
  };

  const iniciales = generarIniciales(datos?.nombre);
  const fotoPerfil = datos?.foto_perfil;
  const nombreUsuario = datos?.nombre;

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const empresaRes = await axios.get(`${API_URL}/api/empresa/empresa`, {
          withCredentials: true,
        });
        setEmpresa(empresaRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <header className="bg-gray-50 shadow-sm fixed top-0 left-0 w-full z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Empresa */}
        <Link to="/" className="flex items-center space-x-4">
          {empresa && (
            <>
              <img
                src={empresa.logo}
                alt="Logo de empresa"
                className="h-14 w-14 rounded-full object-cover shadow-md border border-gray-300"
              />
              <h1 className="text-3xl font-bold text-black-600 uppercase">
                {empresa.nombre}
              </h1>
            </>
          )}
        </Link>

        <Link to="/cuerpo" className="link-subrayado">
          Productos
        </Link>

        {/* Usuario autenticado */}
        {usuarioAutenticado && datos && (
          <div className="flex items-center space-x-4">
            {/* Perfil */}
            <div
              className="flex items-center space-x-2 group cursor-pointer"
              onClick={() => navigate("/usuario/perfil")}
            >
              {fotoPerfil ? (
                <img
                  src={fotoPerfil}
                  alt="Foto de perfil"
                  className="h-10 w-10 rounded-full object-cover border border-gray-300 shadow"
                />
              ) : (
                <div className="h-10 w-10 bg-black text-white rounded-full flex items-center justify-center font-semibold shadow">
                  {iniciales}
                </div>
              )}
              <span className="text-sm text-gray-700 group-hover:text-black font-medium">
                {nombreUsuario}
              </span>
            </div>

            {/* Botón Cerrar sesión */}
            <button
              onClick={() => setMostrarModalCerrarSesion(true)}
              className="link-subrayado"
            >
              Cerrar sesión
            </button>
          </div>
        )}

        {/* No autenticado */}
        {!usuarioAutenticado && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="link-subrayado"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/registro")}
              className="link-subrayado"
            >
              Regístrate
            </button>
          </div>
        )}
      </div>

      {/* Modal Cerrar Sesión */}
      <CerrarSesionModal
        visible={mostrarModalCerrarSesion}
        onClose={() => setMostrarModalCerrarSesion(false)}
      />
    </header>
  );
};

export default EncabezadoBienvenida;
