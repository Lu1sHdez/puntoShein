import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import Swal from "sweetalert2";
import useSesionUsuario from "../../context/useSesionUsuario";
import { API_URL } from "../../ApiConexion";
import CargandoModal from "../../Animations/CargandoModal";

const EncabezadoBienvenida = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { usuarioAutenticado, datos } = useSesionUsuario();
  const [cargando, setCargando] = useState(false);
  const [empresa, setEmpresa] = useState(null);


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

  const cerrarSesion = async () => {
    setCargando(true);
    try {
      await axios.post(`${API_URL}/api/autenticacion/logout`, {}, { withCredentials: true });
      logout();

      setTimeout(() => {
        setCargando(false);
        navigate("/inicio");
        window.location.reload(); 
      }, 2000);
    } catch (error) {
      setCargando(false);
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: error.response?.data?.mensaje || "Ocurrió un error inesperado.",
      });
    }
  };
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
    <header className="bg-white shadow-sm fixed top-0 left-0 w-full z-50 border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Empresa */}
        <Link to = "/inicio"
          className="flex items-center space-x-4">
          {empresa && (
            <>
              <img
                src={empresa.logo}
                alt="Logo de empresa"
                className="h-14 w-14 rounded-full object-cover shadow-md border border-gray-300"
              />
              <h1 className="text-xl font-bold text-pink-600">{empresa.nombre}</h1>
            </>
          )}
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
                <div className="h-10 w-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-semibold shadow">
                  {iniciales}
                </div>
              )}
              <span className="text-sm text-gray-700 group-hover:text-pink-600 font-medium">
                {nombreUsuario}
              </span>
            </div>

            {/* Cerrar sesión */}
            <button
              onClick={cerrarSesion}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition"
            >
              <FaSignOutAlt />
              Cerrar sesión
            </button>
          </div>
        )}

        {/* No autenticado */}
        {!usuarioAutenticado && (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="text-sm px-4 py-2 text-gray-700 border border-gray-300 rounded hover:bg-gray-100 transition"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/registro")}
              className="text-sm px-4 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 transition"
            >
              Regístrate
            </button>
          </div>
        )}
      </div>
       {/* Modal de carga */}
       <CargandoModal mensaje="Cerrando sesión..." visible={cargando} />
    </header>
  );
};

export default EncabezadoBienvenida;
