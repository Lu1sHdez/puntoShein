import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../ApiConexion";
import useSesionUsuario from "../../context/useSesionUsuario";
import useAuth from "../../hooks/useAuth";
import CargandoModal from "../../Animations/CargandoModal";
import { FaShoppingCart, FaSearch,FaCog  } from "react-icons/fa";
import ModalAutenticacion from "../autenticacion/Autenticacion";


const EncabezadoPublico = () => {
  const [empresa, setEmpresa] = useState(null);
  const { usuarioAutenticado, datos } = useSesionUsuario();
  const { logout } = useAuth();
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const [termino, setTermino] = useState("");
  const location = useLocation();

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
  const [mostrarModal, setMostrarModal] = useState(false);


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
  < div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap md:flex-nowrap items-center justify-between gap-y-4">
        {/* Logo y nombre de la empresa */}
        <Link to="/" className="flex items-center space-x-4">
          {empresa && (
            <>
              <img
                src={empresa.logo}
                alt="Logo"
                className="h-14 w-14 rounded-full object-cover border border-gray-300 shadow"
              />
              <h1 className="text-3xl font-bold text-black uppercase">{empresa.nombre}</h1>
            </>
          )}
        </Link>
        {location.pathname === "/cuerpo" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (termino.trim()) {
              navigate(`/cuerpo?buscar=${encodeURIComponent(termino.trim())}`);
              setTermino(""); 
            }
          }}
          className="hidden md:flex items-center bg-white border border-gray-300 rounded-xl shadow-sm max-w-md w-full px-2 py-1 mx-6"
        >
          <FaSearch className="text-gray-400 ml-2 mr-3" />
          <input
            type="text"
            placeholder="Buscar productos..."
            value={termino}
            onChange={(e) => setTermino(e.target.value)}
            className="flex-grow outline-none border-none bg-transparent rounded-l-xl px-1"
          />
          <button
            type="submit"
            className="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 border-none"
          >
            Buscar
          </button>
        </form>
      )}

        <Link
          to = "/cuerpo"
          className="link-subrayado"
          >
          Productos
        </Link>
        <button
          onClick={() => {
            if (usuarioAutenticado) {
              navigate("/productos/carrito");
            } else {
              setMostrarModal(true);
            }
          }}
          className="link-subrayado flex items-center gap-2 text-black hover:text-black-700 transition font-medium"
        >
          <FaShoppingCart className="text-2xl link-subrayado" />
          <span className="text-sm">Carrito</span>
        </button>

        <div className="flex items-center gap-4">

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
                  <div className="h-10 w-10 bg-black text-white rounded-full flex items-center justify-center font-semibold shadow">
                    {iniciales}
                  </div>
                )}
                <span className="text-sm font-medium text-gray-700 hover:text-black">
                  {nombreUsuario}
                </span>
              </div>
              <Link
                to="/usuario/dashboard"
                className="text-gray-600 hover:text-gray-600 transition text-xl"
                title="Configuración"
              >
                <FaCog />
              </Link>
            </div>
          ) : (
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
        

      </div>
      {mostrarModal && (
        <ModalAutenticacion onClose={() => setMostrarModal(false)} />
      )}

      {/* Modal de carga al cerrar sesión */}
      <CargandoModal mensaje="Cerrando sesión..." visible={cargando} />
    </header>
  );
};

export default EncabezadoPublico;
