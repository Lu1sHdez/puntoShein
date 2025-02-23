// src/admin/empresa/Empresa.js
import RegresarButton from '../../components/Regresar.js';  // Importamos el botón
import React, { useState, useEffect } from 'react';

const Empresa = () => {
    const [empresa, setEmpresa] = useState({
        nombre: '',
        direccion: '',
        telefono: '',
        correo: '',
        descripcion: '',
    });

    useEffect(() => {
        // Aquí traerías los datos de la empresa desde tu API o base de datos
        setEmpresa({
            nombre: 'Punto Shein',
            direccion: 'Calle Ejemplo 123',
            telefono: '123-456-7890',
            correo: 'contacto@puntoshein.com',
            descripcion: 'Tienda de ropa online especializada en productos de Shein.',
        });
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEmpresa((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí se enviaría la actualización de los datos a la API o base de datos
        console.log('Datos de la empresa actualizados:', empresa);
    };

    return (
        <div className="p-6">
            <h1 className="text-3xl mb-6">Información de la Empresa</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block mb-2" htmlFor="nombre">Nombre:</label>
                    <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        value={empresa.nombre}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="direccion">Dirección:</label>
                    <input
                        id="direccion"
                        name="direccion"
                        type="text"
                        value={empresa.direccion}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="telefono">Teléfono:</label>
                    <input
                        id="telefono"
                        name="telefono"
                        type="text"
                        value={empresa.telefono}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="correo">Correo:</label>
                    <input
                        id="correo"
                        name="correo"
                        type="email"
                        value={empresa.correo}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <div>
                    <label className="block mb-2" htmlFor="descripcion">Descripción:</label>
                    <textarea
                        id="descripcion"
                        name="descripcion"
                        value={empresa.descripcion}
                        onChange={handleChange}
                        className="w-full p-2 border border-gray-300 rounded"
                    />
                </div>
                <button
                    type="submit"
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
                >
                    Guardar Cambios
                </button>
                <RegresarButton/>
            </form>
        </div>
    );
};

export default Empresa;
