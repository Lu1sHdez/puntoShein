import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../ApiConexion";
import useSesionUsuario from "../../context/useSesionUsuario";
import useAuth from "../../hooks/useAuth";
import CargandoModal from "../../Animations/CargandoModal";
import { FaSignOutAlt } from "react-icons/fa";

const EncabezadoPublico = () => {
  const [empresa, setEmpresa] = useState(null);
  const { usuarioAutenticado, datos } = useSesionUsuario();
  const { logout } = useAuth();
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();

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
        navigate("/cuerpo");
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
    const obtenerEmpresa = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/empresa/empresa`, {
          withCredentials: true,
        });
        setEmpresa(res.data);
      } catch (error) {
        console.error("Error al obtener datos de empresa:", error);
      }
    };
    obtenerEmpresa();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo y nombre de la empresa */}
        <Link to="/inicio" className="flex items-center space-x-4">
          {empresa && (
            <>
              <img
                src={empresa.logo}
                alt="Logo"
                className="h-14 w-14 rounded-full object-cover border border-gray-300 shadow"
              />
              <h1 className="text-xl font-bold text-pink-600">{empresa.nombre}</h1>
            </>
          )}
        </Link>

        {/* Usuario autenticado */}
        {usuarioAutenticado && datos ? (
          <div className="flex items-center gap-4">
            <div
              className="flex items-center gap-2 cursor-pointer"
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
              <span className="text-sm font-medium text-gray-700 hover:text-pink-600">
                {nombreUsuario}
              </span>
            </div>

            <button
              onClick={cerrarSesion}
              className="btn-cerrar"
            >
              <FaSignOutAlt />
              Cerrar sesión
            </button>
          </div>
        ) : (
          <div className="flex gap-3">
            <button
              onClick={() => navigate("/login")}
              className="btn-login"
            >
              Iniciar sesión
            </button>
            <button
              onClick={() => navigate("/registro")}
              className="btn-registro"
            >
              Regístrate
            </button>
          </div>
        )}
      </div>

      {/* Modal de carga al cerrar sesión */}
      <CargandoModal mensaje="Cerrando sesión..." visible={cargando} />
    </header>
  );
};

export default EncabezadoPublico;
