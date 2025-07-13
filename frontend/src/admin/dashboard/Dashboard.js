import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';  // Usamos Link para la navegación, y Routes y Route para las rutas
import { FaCog, FaUsers, FaBox, FaUserTie, FaQuestionCircle, FaChartLine} from 'react-icons/fa';  // Iconos para las tarjetas
import { BsPersonLinesFill } from 'react-icons/bs';  // Icono para el perfil

// Importar los componentes necesarios para las rutas
import Configuracion from '../setting/Configuracion';  // Componente para la configuración
import Empresa from '../empresa/Empresa';  // Componente para la empresa
import Usuarios from '../usuarios/Usuarios';  // Componente para los usuarios
import Empleados from '../empleados/Empleados';  // Componente para los empleados
import Productos from '../productos/Productos';  
import { dashboardAnimation } from '../../components/Funciones.js';
import { motion } from 'framer-motion';
import CargandoBarra from '../../Animations/CargandoBarra.js';

const Dashboard = () => {
    const[loading, setLoading] = useState(true);
    useEffect(() =>{
        const timer= setTimeout(()=>{
            setLoading(false);
        },1500);

        return ()=> clearTimeout(timer);
    })

    if (loading) {
        return <CargandoBarra message="Cargando..." />;
    }
  
    return (
        <motion.div {...dashboardAnimation} className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard - Administrador</h1>

            {/* Sección de tarjetas con opciones */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 justify-items-center">
                {/* Tarjeta de Configuración */}
                <Link
                    to="/admin/configuracion"
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 max-w-sm w-full mx-auto"
                >
                    <FaCog className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Configuración</h2>
                    <p className="text-gray-500 mt-2">Administra las configuraciones del sistema.</p>
                </Link>

                {/* Tarjeta de Usuarios */}
                <Link
                    to="/admin/usuarios"
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 max-w-sm w-full mx-auto"
                >
                    <FaUsers className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Usuarios</h2>
                    <p className="text-gray-500 mt-2">Gestiona los usuarios del sistema.</p>
                </Link>

                {/* Tarjeta de Productos */}
                <Link
                    to="/admin/productos"
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 max-w-sm w-full mx-auto"
                >
                    <FaBox className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Productos</h2>
                    <p className="text-gray-500 mt-2">Administra el inventario de productos.</p>
                </Link>

                {/* Tarjeta de Empleados */}
                <Link
                    to="/admin/empleados"
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 max-w-sm w-full mx-auto"
                >
                    <FaUserTie className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Empleados</h2>
                    <p className="text-gray-500 mt-2">Gestiona la información de los empleados.</p>
                </Link>

                {/* Tarjeta de Perfil */}
                <Link
                    to="/admin/perfil"
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 max-w-sm w-full mx-auto"
                >
                    <BsPersonLinesFill className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Perfil</h2>
                    <p className="text-gray-500 mt-2">Visualiza y edita tu perfil de administrador.</p>
                </Link>

                {/* Tarjeta de Empresa */}
                <Link
                    to="/admin/empresa"
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 max-w-sm w-full mx-auto"
                >
                    <FaBox className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Empresa</h2>
                    <p className="text-gray-500 mt-2">Administra la información de la empresa.</p>
                </Link>
                {/* Tarjeta de Preguntas */}
                <Link
                    to="/admin/preguntasFrecuentes"
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 max-w-sm w-full mx-auto"
                >
                    <FaQuestionCircle className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Preguntas Frecuentes</h2>
                    <p className="text-gray-500 mt-2">Administra las preguntas frecuentes de la empresa</p>
                </Link>
                <Link
                    to="/admin/gestionProductos"
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 max-w-sm w-full mx-auto"
                >
                    <FaChartLine className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Analisis de ventas</h2>
                    <p className="text-gray-500 mt-2">Modulo de prediccón de ventas para la toma de decisiones de productos</p>
                </Link>
                <Link
                    to="/admin/inicio-rapido"
                    className="bg-white p-4 sm:p-5 md:p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105 max-w-sm w-full mx-auto"
                >
                    <FaChartLine className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Inicio rápido (PIN)</h2>
                    <p className="text-gray-500 mt-2">Genera un PIN temporal para iniciar sesión desde el smartwatch.</p>
                </Link>

                
            </div>

            {/* Rutas para los componentes principales del administrador */}
            <Routes>
                <Route path="/admin/configuracion" element={<Configuracion />} />
                <Route path="/admin/empresa" element={<Empresa />} />
                <Route path="/admin/usuarios" element={<Usuarios />} />
                <Route path="/admin/empleados" element={<Empleados />} />
                <Route path="/admin/productos" element={<Productos />} />
                <Route path="/admin/perfil" element={<Productos />} />
            </Routes>
        </motion.div>
    );
};

export default Dashboard;
