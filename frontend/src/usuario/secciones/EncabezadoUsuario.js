import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
import { API_URL } from "../../ApiConexion";

const EncabezadoUsuario = () => {
  const [empresa, setEmpresa] = useState(null);
  const [usuario, setUsuario] = useState(null);

  const navigate = useNavigate();
  const { logout } = useAuth();

  const token = localStorage.getItem("token");
  const rolValido = token && jwtDecode(token).rol === "usuario";

  const obtenerIniciales = (nombreCompleto) => {
    if (!nombreCompleto) return "";
    const palabras = nombreCompleto.trim().split(" ");
    return palabras.length >= 2
      ? `${palabras[0][0]}${palabras[1][0]}`.toUpperCase()
      : `${palabras[0][0]}`.toUpperCase();
  };

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/autenticacion/logout`, {}, { withCredentials: true });
      logout();

      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has cerrado sesión correctamente.",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate("/inicio"), 2000);
    } catch (error) {
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
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Empresa */}
        <Link to="/inicio" className="flex items-center space-x-4 hover:opacity-80 transition">
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


        {/* Perfil + Logout */}
        <div className="flex items-center space-x-5">
          {usuario && (
            <Link to="/usuario/perfil" className="flex items-center space-x-2 group">
              {usuario.foto_perfil ? (
                <img
                  src={usuario.foto_perfil}
                  alt="Foto"
                  className="h-10 w-10 rounded-full object-cover border border-gray-400 shadow"
                />
              ) : (
                <div className="h-10 w-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-semibold shadow">
                  {obtenerIniciales(usuario.nombre)}
                </div>
              )}
              <span className="text-sm text-gray-700 group-hover:text-pink-600 font-medium">
                {usuario.nombre}
              </span>
            </Link>
          )}

          {rolValido && (
            <button
              onClick={handleLogout}
              className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition"
            >
              <FaSignOutAlt />
              Cerrar sesión
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default EncabezadoUsuario;
