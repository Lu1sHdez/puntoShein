import React, { useState, useEffect } from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import { FaClipboardList, FaCog, FaFileAlt, FaChartBar } from 'react-icons/fa';
import { BsPersonLinesFill } from 'react-icons/bs';
import { motion } from 'framer-motion';
import { dashboardAnimation } from '../../components/Funciones.js';
import { Cargando } from '../../Animations/Cargando.js';

import Perfil from '../perfil/Perfil';

const DashboardEmpleado = () => {

    const[loading, setLoading] = useState(true);
    useEffect(() =>{
        const timer= setTimeout(()=>{
            setLoading(false);
        },1500);

        return ()=> clearTimeout(timer);
    })

    if (loading) {
        return <Cargando message="Cargando..." />;
    }

    return (
        <motion.div {...dashboardAnimation} className="p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard - Empleado</h1>

            {/* Sección de tarjetas con opciones */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Tarjeta de Pedidos */}
                <Link
                    to="/empleado/pedidos"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                    <FaClipboardList className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Pedidos</h2>
                    <p className="text-gray-500 mt-2">Gestiona y revisa los pedidos de los clientes.</p>
                </Link>
                <Link
                    to="/empleado/ventas"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                    <FaChartBar className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Reporte Ventas</h2>
                    <p className="text-gray-500 mt-2">Gestiona y revisa los pedidos de los clientes.</p>
                </Link>

                {/* Tarjeta de Productos */}
                <Link
                    to="/empleado/productos"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                    <FaFileAlt className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Productos</h2>
                    <p className="text-gray-500 mt-2">Administra los productos del catálogo.</p>
                </Link>
                {/* Tarjeta de Productos */}
                <Link
                    to="/empleado/productos"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                    <FaChartBar className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Reporte Productos</h2>
                    <p className="text-gray-500 mt-2">Administra los productos del catálogo.</p>
                </Link>
                {/* Tarjeta de Productos */}
                <Link
                    to="/empleado/condiguracion"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                    <FaCog className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Configuracion</h2>
                    <p className="text-gray-500 mt-2">Administra los productos del catálogo.</p>
                </Link>
                {/* Tarjeta de Productos */}


                {/* Tarjeta de Perfil */}
                <Link
                    to="/empleado/perfil"
                    className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition duration-300 transform hover:scale-105"
                >
                    <BsPersonLinesFill className="text-4xl text-gray-700 mb-4" />
                    <h2 className="text-xl font-semibold">Perfil</h2>
                    <p className="text-gray-500 mt-2">Visualiza y edita tu perfil de empleado.</p>
                </Link>
            </div>

            {/* Rutas para los componentes principales del empleado */}
            <Routes>
                <Route path="/empleado/perfil" element={<Perfil />} />
            </Routes>
        </motion.div>
    );
};

export default DashboardEmpleado;