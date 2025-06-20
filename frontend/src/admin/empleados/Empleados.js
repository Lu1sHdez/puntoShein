import React, { useEffect, useState } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'; 
import RegresarButton from '../../components/Regresar.js';
import { dataLoadingAnimation} from '../../components/Funciones.js';
import { motion } from 'framer-motion';
import { API_URL } from '../../ApiConexion.js'; // Ajusta la ruta según tu estructura
import { Cargando } from '../../Animations/Cargando.js';



const Empleados = () => {
    const [empleados, setEmpleados] = useState([]);  // Estado para los empleados
    const [loading, setLoading] = useState(true);  // Estado para saber si estamos cargando

    useEffect(() => {
        // Hacer la solicitud con axios
        const fetchEmpleados = async () => {
            try {
                const response = await axios.get(`${API_URL}/api/admin/empleados`, {
                    withCredentials: true,
                });
                setEmpleados(response.data);  // Guardamos los empleados en el estado
            } catch (error) {
                console.error('Error al obtener los empleados:', error);
                // Aquí puedes mostrar un mensaje de error al usuario
            } finally {
                setLoading(false);
            }
        };

        fetchEmpleados();  // Llamamos a la función para obtener los empleados
    }, []);

    const handleEliminar = async (id) => {
        try {
            // Lógica para eliminar un empleado (esto también debe ir al backend)
            await axios.delete(`${API_URL}/api/admin/empleados/${id}`, {
                withCredentials: true, // Esto es necesario si estás usando cookies
            });
            // Si se elimina correctamente, actualizamos la lista de empleados
            setEmpleados(empleados.filter((empleado) => empleado.id !== id));
        } catch (error) {
            console.error('Error al eliminar el empleado:', error);
        }
    };

    const cambiarRol = async (empleadoId, newRole) => {
        try {
            // Hacemos la solicitud PUT para actualizar el rol
            await axios.put(
                `${API_URL}/api/admin/usuarios/${empleadoId}/rol`,
                { rol: newRole }, // Enviamos el nuevo rol
                { withCredentials: true }
            );
            // Si todo sale bien, actualizamos el rol del empleado en el estado
            setEmpleados(empleados.map(empleado =>
                empleado.id === empleadoId ? { ...empleado, rol: newRole } : empleado
            ));
            alert('Rol actualizado exitosamente');
        } catch (error) {
            console.error('Error al actualizar el rol:', error);
            alert('Hubo un problema al actualizar el rol');
        }
    };

    if (loading) {
        return <Cargando message='Cargando empleados...'/>;  // Mostrar mensaje mientras cargan los empleados
    }

    return (
        <motion.div {...dataLoadingAnimation} className="p-6">
            <h1 className="text-3xl mb-6">Gestión de Empleados</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Nombre</th>
                        <th className="py-2 px-4 border-b">Correo</th>
                        <th className="py-2 px-4 border-b">Rol</th>
                        <th className="py-2 px-4 border-b">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {empleados.map((empleado) => (
                        <tr key={empleado.id}>
                            <td className="py-2 px-4 border-b">{empleado.id}</td>
                            <td className="py-2 px-4 border-b">{empleado.nombre}</td>
                            <td className="py-2 px-4 border-b">{empleado.correo}</td>
                            <td className="py-2 px-4 border-b">
                                {/* Agregar select para cambiar el rol */}
                                <select
                                    value={empleado.rol}
                                    onChange={(e) => cambiarRol(empleado.id, e.target.value)} // Llamamos a la función para cambiar el rol
                                    className="p-2 border border-gray-300 rounded-md"
                                >
                                    <option value="usuario">Usuario</option>
                                    <option value="administrador">Administrador</option>
                                    <option value="empleado">Empleado</option>
                                </select>
                            </td>
                            <td className="py-2 px-4 border-b">
                                <button className="text-blue-500 hover:text-blue-700">Editar</button>
                                <button
                                    className="text-red-500 hover:text-red-700 ml-4"
                                    onClick={() => handleEliminar(empleado.id)}
                                >
                                    Eliminar
                                </button>
                                <Link to={`/admin/usuarios/${empleado.id}`} className="text-green-500 hover:text-green-700 ml-4">
                                    Ver más
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <RegresarButton />  {/* Botón de regresar */}
        </motion.div>
    );
};

export default Empleados;
