import { Link, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { API_URL } from "../../ApiConexion";
import useAuth from "../../hooks/useAuth"; // Asegúrate de ajustar la ruta si es necesario

const EncabezadoAdmin = () => {
  const [empresa, setEmpresa] = useState(null);
  const [admin, setAdmin] = useState(null);
  const { logout } = useAuth(); // usa el hook global de auth

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(`${API_URL}/api/autenticacion/logout`, {}, { withCredentials: true });

      logout(); // borra auth en contexto

      Swal.fire({
        icon: "success",
        title: "Sesión cerrada",
        text: "Has cerrado sesión correctamente.",
        showConfirmButton: false,
        timer: 2000,
      });

      setTimeout(() => navigate("/"), 2000); // volver al inicio
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: error.response?.data?.mensaje || "Ocurrió un error.",
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

        const perfilRes = await axios.get(`${API_URL}/api/admin/perfil`, {
          withCredentials: true,
        });

        setAdmin(perfilRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  const obtenerIniciales = (nombreCompleto) => {
    if (!nombreCompleto) return "";
    const palabras = nombreCompleto.trim().split(" ");
    return palabras.length >= 2
      ? `${palabras[0][0]}${palabras[1][0]}`.toUpperCase()
      : `${palabras[0][0]}`.toUpperCase();
  };

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Empresa */}
        <div className="flex items-center space-x-4">
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
        </div>

        {/* Perfil + logout */}
        <div className="flex items-center space-x-4">
          <Link to="/admin/perfil" className="flex items-center space-x-2 group">
            {admin?.foto_perfil ? (
              <img
                src={admin.foto_perfil}
                alt="Foto de perfil"
                className="h-10 w-10 rounded-full object-cover border border-gray-400 shadow"
              />
            ) : (
              <div className="h-10 w-10 bg-pink-600 text-white rounded-full flex items-center justify-center font-semibold shadow">
                {obtenerIniciales(admin?.nombre)}
              </div>
            )}
            <span className="text-sm text-gray-700 group-hover:text-pink-600 font-medium">
              {admin?.nombre}
            </span>
          </Link>

          {/* Botón cerrar sesión unificado */}
          <button
            onClick={handleLogout}
            className="bg-pink-600 hover:bg-pink-700 text-white px-4 py-2 rounded-md flex items-center gap-2 text-sm font-medium transition"
          >
            <FaSignOutAlt />
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default EncabezadoAdmin;
