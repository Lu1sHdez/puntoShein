import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsBoxSeam, BsCart3, BsBoxArrowRight } from "react-icons/bs";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../ApiConexion";
import CargandoModal from "../Animations/CargandoModal";

const EncabezadoUsuario = () => {
  const [empresa, setEmpresa] = useState(null);
  const [usuario, setUsuario] = useState(null);
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const token = localStorage.getItem("token");
  const rolValido = token && jwtDecode(token).rol === "usuario";

  // === Iniciales del usuario ===
  const obtenerIniciales = (nombreCompleto) => {
    if (!nombreCompleto) return "";
    const palabras = nombreCompleto.trim().split(" ");
    return palabras.length >= 2
      ? `${palabras[0][0]}${palabras[1][0]}`.toUpperCase()
      : `${palabras[0][0]}`.toUpperCase();
  };

  // === Cerrar sesión con confirmación ===
  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión se cerrará.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#2563EB",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sí, cerrar sesión",
      cancelButtonText: "Cancelar",
    });

    if (!confirm.isConfirmed) return;

    setCargando(true);
    try {
      await axios.post(`${API_URL}/api/autenticacion/logout`, {}, { withCredentials: true });
      logout();

      setTimeout(() => {
        setCargando(false);
        navigate("/");
      }, 1200);
    } catch (error) {
      setCargando(false);
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: error.response?.data?.mensaje || "Ocurrió un error inesperado.",
      });
    }
  };

  // === Obtener datos ===
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const empresaRes = await axios.get(`${API_URL}/api/empresa/empresa`, {
          withCredentials: true,
        });
        setEmpresa(empresaRes.data);

        if (token && rolValido) {
          const usuarioRes = await axios.get(`${API_URL}/api/usuario/perfil`, {
            withCredentials: true,
          });
          setUsuario(usuarioRes.data);
        }
      } catch (error) {
        console.error("Error al obtener datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-md z-50 h-16">
      <div className="h-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* === Logo y nombre de empresa === */}
        <div
          className="flex items-center gap-3 cursor-pointer select-none"
          onClick={() => navigate("/")}
        >
          {empresa?.logo ? (
            <img
              src={empresa.logo}
              alt="Logo"
              className="h-10 w-10 rounded-full object-cover ring-2 ring-blue-200"
            />
          ) : (
            <div className="h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center">
              <BsBoxSeam className="text-blue-600 text-xl" />
            </div>
          )}
          <h1 className="text-lg sm:text-xl font-bold text-gray-800 uppercase tracking-wide">
            {empresa?.nombre || "Punto Shein"}
          </h1>
        </div>

        {/* === Navegación === */}
        <nav className="flex items-center gap-6">
          <Link
            to="/cuerpo"
            className="text-gray-700 hover:text-blue-600 font-medium transition-all duration-200"
          >
            Productos
          </Link>

          <Link
            to="/productos/carrito"
            className="flex items-center gap-2 text-gray-700 hover:text-blue-600 font-medium transition-all duration-200"
          >
            <BsCart3 className="text-lg" />
            <span className="hidden sm:inline text-sm">Carrito</span>
          </Link>

          {/* === Perfil de usuario === */}
          {usuario && (
            <div className="flex items-center gap-4">
              <Link
                to="/usuario/perfil"
                className="flex items-center gap-2 hover:opacity-90 transition"
              >
                {usuario.foto_perfil ? (
                  <img
                    src={usuario.foto_perfil}
                    alt="Foto"
                    className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-300 shadow-sm"
                  />
                ) : (
                  <div className="h-9 w-9 bg-gradient-to-br from-blue-600 to-blue-800 text-white rounded-full flex items-center justify-center font-semibold shadow-md">
                    {obtenerIniciales(usuario.nombre)}
                  </div>
                )}

                <span className="hidden sm:inline text-sm font-medium text-gray-800">
                  {usuario.nombre || "Usuario"}
                </span>
              </Link>

              {/* Botón de logout */}
              <button
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 focus:bg-red-100 rounded-full p-2 transition"
                title="Cerrar sesión"
              >
                <BsBoxArrowRight className="text-lg" />
              </button>
            </div>
          )}
        </nav>
      </div>

      <CargandoModal mensaje="Cerrando sesión..." visible={cargando} />
    </header>
  );
};

export default EncabezadoUsuario;
