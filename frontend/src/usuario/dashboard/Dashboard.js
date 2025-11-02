import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate, Link, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import {
  BsPersonLinesFill,
  BsBoxSeam,
  BsCart3,
  BsClipboardCheck,
} from "react-icons/bs";
import { dashboardAnimation } from "../../components/Funciones.js";
import Perfil from "../perfil/Perfil.js";
import { Cargando } from "../../Animations/Cargando.js";

const DashboardUsuario = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUser(decoded);
      if (!decoded.rol || decoded.rol !== "usuario") navigate("/login");
    } catch (error) {
      navigate("/login");
    }
  }, [navigate]);

  if (!user) return <Cargando message="Cargando..." />;

  const tarjetas = [
    {
      titulo: "Mi Perfil",
      icono: <BsPersonLinesFill />,
      descripcion: "Gestiona tu información personal.",
      ruta: "/usuario/perfil",
    },
    {
      titulo: "Ver Productos",
      icono: <BsBoxSeam />,
      descripcion: "Explora el catálogo completo de productos.",
      ruta: "/usuario/productos",
    },
    {
      titulo: "Mi Carrito",
      icono: <BsCart3 />,
      descripcion: "Consulta los productos que has agregado.",
      ruta: "/productos/carrito",
    },
    {
      titulo: "Mis Pedidos",
      icono: <BsClipboardCheck />,
      descripcion: "Consulta el estado de tus pedidos realizados.",
      ruta: "/usuario/pedidos",
    },
  ];

  return (
    <motion.div
      {...dashboardAnimation}
      className="p-6 min-h-screen bg-gradient-to-b from-blue-50 to-white"
    >
      {/* Encabezado */}
      <div className="text-center mb-10">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
          Bienvenido, {user.nombre || "Usuario"}
        </h1>
        <p className="text-gray-500">
          Accede a tus secciones personales desde aquí.
        </p>
      </div>

      {/* Tarjetas principales */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
        {tarjetas.map((item, idx) => (
          <Link
            key={idx}
            to={item.ruta}
            className="group relative bg-white p-6 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:scale-[1.03] w-full max-w-sm overflow-hidden border border-gray-100"
          >
            <div className="flex flex-col items-center text-center">
              <div className="p-4 rounded-full bg-blue-100 text-blue-600 text-4xl mb-4 transition-all duration-300 group-hover:bg-blue-600 group-hover:text-white">
                {item.icono}
              </div>
              <h2 className="text-lg font-semibold text-gray-800 mb-1">
                {item.titulo}
              </h2>
              <p className="text-gray-500 text-sm">{item.descripcion}</p>
            </div>

            {/* Línea inferior animada */}
            <div className="absolute bottom-0 left-0 w-0 h-1 bg-blue-600 transition-all duration-300 group-hover:w-full"></div>
          </Link>
        ))}
      </div>

      {/* Rutas internas */}
      <Routes>
        <Route path="/usuario/perfil" element={<Perfil />} />
        {/* <Route path="/usuario/productos" element={<Productos />} /> */}
        {/* <Route path="/usuario/carrito" element={<Carrito />} /> */}
        {/* <Route path="/usuario/pedidos" element={<Pedidos />} /> */}
      </Routes>
    </motion.div>
  );
};

export default DashboardUsuario;
