// src/components/home/encabezado/EncabezadoGeneral.js
import React, { useState, useEffect  } from "react";
import { Link, useNavigate} from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useSesionUsuario from "../../../context/useSesionUsuario";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../../ApiConexion";
import CargandoModal from "../../../Animations/CargandoModal";

const EncabezadoGeneral = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const { usuarioAutenticado, datos } = useSesionUsuario();
  const [cargando, setCargando] = useState(false);
  const [empresa, setEmpresa] = useState(null);

  const nombre = datos?.nombre || "Usuario";
  const fotoPerfil = datos?.foto_perfil || "";

  const generarIniciales = (nombre) => {
    if (!nombre) return "";
    const palabras = nombre.trim().split(" ");
    return palabras.length >= 2
      ? `${palabras[0][0]}${palabras[1][0]}`.toUpperCase()
      : palabras[0][0].toUpperCase();
  };

  const iniciales = generarIniciales(nombre);

  const cerrarSesion = async () => {
    setCargando(true);
    try {
      await axios.post(`${API_URL}/api/autenticacion/logout`, {}, { withCredentials: true });
      logout();

      setTimeout(() => {
        setCargando(false);
        navigate("/login");
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
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">

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

        {/* Autenticado */}
        {usuarioAutenticado && datos ? (
          <div className="flex items-center space-x-4">
            {/* Perfil */}
            <div
              className="flex items-center space-x-2 cursor-pointer"
              onClick={() => navigate("/usuario/perfil")}
            >
              {fotoPerfil ? (
                <img
                  src={fotoPerfil}
                  alt="Perfil"
                  className="h-9 w-9 rounded-full object-cover border border-gray-300 shadow"
                />
              ) : (
                <div className="h-9 w-9 bg-pink-600 text-white rounded-full flex items-center justify-center font-semibold shadow">
                  {iniciales}
                </div>
              )}
              <span className="text-sm text-gray-700 font-medium hover:text-pink-600">
                {nombre}
              </span>
            </div>

            {/* Cerrar sesión */}
            <button
              onClick={cerrarSesion}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-pink-700 hover:text-white transition"
            >
              Cerrar sesión
            </button>
          </div>
        ) : (
          // No autenticado
          <Link
            to="/login"
            className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 transition"
          >
            Iniciar sesión
          </Link>
        )}
      </div>

      {/* Modal de carga */}
      <CargandoModal mensaje="Cerrando sesión..." visible={cargando} />
    </header>
  );
};

export default EncabezadoGeneral;
