import { useEffect, useState } from "react";
import { Navbar, Typography, IconButton } from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { BsBoxSeam, BsBoxArrowRight } from "react-icons/bs";
import { API_URL } from "../ApiConexion";
import useAuth from "../hooks/useAuth";
import CargandoModal from "../Animations/CargandoModal";

const EncabezadoAdmin = () => {
  const [empresa, setEmpresa] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mostrarNavbar, setMostrarNavbar] = useState(true);

  const { logout } = useAuth();
  const navigate = useNavigate();

  // === Cargar datos de empresa y perfil (con credenciales) ===
  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        const [empresaRes, perfilRes] = await Promise.all([
          axios.get(`${API_URL}/api/empresa/empresa`, { withCredentials: true }),
          axios.get(`${API_URL}/api/admin/perfil`, { withCredentials: true }),
        ]);

        setEmpresa(empresaRes.data);
        setAdmin(perfilRes.data);
      } catch (error) {
        console.error("Error al cargar datos:", error);
      }
    };

    obtenerDatos();
  }, []);

  // === Ocultar navbar al hacer scroll ===
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY && currentScrollY > 60) {
        setMostrarNavbar(false);
      } else {
        setMostrarNavbar(true);
      }
      lastScrollY = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // === Iniciales del admin ===
  const obtenerIniciales = (nombreCompleto) => {
    if (!nombreCompleto) return "";
    const partes = nombreCompleto.trim().split(" ");
    return partes.length >= 2
      ? `${partes[0][0]}${partes[1][0]}`.toUpperCase()
      : partes[0][0].toUpperCase();
  };

  // === Cerrar sesión con confirmación ===
  const handleLogout = async () => {
    const confirm = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Tu sesión de administrador se cerrará.",
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
      setTimeout(() => navigate("/"), 1200);
    } catch (error) {
      setCargando(false);
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: error.response?.data?.mensaje || "Ocurrió un error inesperado.",
      });
    }
  };

  return (
    <>
      <Navbar
        blurred={false}
        className={`sticky top-0 z-50 mx-auto max-w-full px-4 py-3 lg:px-8 shadow-md bg-white/95 backdrop-blur-md border-b border-gray-100 
        transform transition-transform duration-300 ease-in-out 
        ${mostrarNavbar ? "translate-y-0" : "-translate-y-full"}`}
      >
        <div className="flex items-center justify-between text-gray-900">
          {/* === Logo de empresa === */}
          <div
            className="flex items-center gap-3 cursor-pointer select-none"
            onClick={() => navigate("/admin/dashboard")}
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
            <Typography className="font-bold text-lg uppercase tracking-wide">
              {empresa?.nombre || "Panel Admin"}
            </Typography>
          </div>

          {/* === Perfil del admin + logout === */}
          <div className="flex items-center gap-4">
            <Link
              to="/admin/perfil"
              className="flex items-center gap-2 hover:opacity-90 transition"
            >
              {admin?.foto_perfil ? (
                <img
                  src={admin.foto_perfil}
                  alt="Perfil"
                  className="h-9 w-9 rounded-full object-cover ring-2 ring-blue-300 shadow-sm"
                />
              ) : (
                <div className="h-9 w-9 bg-blue-600 text-white rounded-full flex items-center justify-center font-semibold">
                  {obtenerIniciales(admin?.nombre)}
                </div>
              )}

              <span className="hidden sm:inline text-sm font-medium text-gray-800">
                {admin?.nombre || "Administrador"}
              </span>
            </Link>

            {/* Botón de cerrar sesión */}
            <IconButton
              variant="text"
              ripple={false}
              onClick={handleLogout}
              className="text-red-600 hover:bg-red-50 focus:bg-red-100 transition"
            >
              <BsBoxArrowRight className="text-xl" />
            </IconButton>
          </div>
        </div>
      </Navbar>

      {/* Modal de carga */}
      <CargandoModal mensaje="Cerrando sesión..." visible={cargando} />
    </>
  );
};

export default EncabezadoAdmin;
