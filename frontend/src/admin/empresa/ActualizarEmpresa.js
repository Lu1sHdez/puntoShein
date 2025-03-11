import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate en lugar de useHistory
import RegresarButton from '../../components/Regresar.js';
import { dataLoadingAnimation} from '../../components/Funciones.js';
import { motion } from 'framer-motion';

const ActualizarEmpresa = () => {
  const [empresa, setEmpresa] = useState({
    nombre: '',
    mision: '',
    vision: '',
    valores: [],
    historia: '',
    equipo: '',
    logo: '',
    correo: '',
    telefono: '',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();  // Usar useNavigate para la redirección

  // Obtener los datos de la empresa
  const fetchEmpresa = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/admin/empresa', {
        withCredentials: true,
      });
      setEmpresa(response.data);
    } catch (error) {
      setError('Error al obtener los datos de la empresa');
      console.error('Error al obtener los datos de la empresa:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpresa();
  }, []);

  // Función para manejar los cambios en el formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmpresa({
      ...empresa,
      [name]: value,
    });
  };

  // Función para manejar los cambios en los valores
  const handleValorChange = (index, e) => {
    const { name, value } = e.target;
    const updatedValores = [...empresa.valores];
    updatedValores[index][name] = value;
    setEmpresa({ ...empresa, valores: updatedValores });
  };

  // Función para agregar un nuevo valor
  const addValor = () => {
    setEmpresa({
      ...empresa,
      valores: [...empresa.valores, { nombre: '', descripcion: '' }],
    });
  };

  // Función para eliminar un valor
  const removeValor = (index) => {
    const updatedValores = empresa.valores.filter((_, i) => i !== index);
    setEmpresa({ ...empresa, valores: updatedValores });
  };

  // Función para actualizar los datos de la empresa
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put('http://localhost:4000/api/admin/empresa', empresa, {
        withCredentials: true,
      });
      navigate('/admin/empresa');  // Usar navigate para redirigir a la página de la empresa después de actualizar
      window.location.reload()
    } catch (error) {
      setError('Error al actualizar los datos de la empresa');
      console.error('Error al actualizar los datos de la empresa:', error);
    }
  };

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  
  const cancelar =()=>
  {
    navigate('/admin/empresa')
  }
  return (
    <motion.div {...dataLoadingAnimation} className="p-6">
      <h1 className="text-3xl mb-6">Actualizar Datos de la Empresa</h1>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="nombre" className="block mb-2">Nombre de la Empresa:</label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={empresa.nombre}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="mision" className="block mb-2">Misión:</label>
          <textarea
            id="mision"
            name="mision"
            value={empresa.mision}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="vision" className="block mb-2">Visión:</label>
          <textarea
            id="vision"
            name="vision"
            value={empresa.vision}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="valores" className="block mb-2">Valores:</label>
          {empresa.valores.map((valor, index) => (
            <div key={index} className="mb-4">
              <input
                type="text"
                name="nombre"
                placeholder="Nombre del valor"
                value={valor.nombre}
                onChange={(e) => handleValorChange(index, e)}
                className="p-2 border border-gray-300 rounded-md w-full mb-2"
              />
              <textarea
                name="descripcion"
                placeholder="Descripción del valor"
                value={valor.descripcion}
                onChange={(e) => handleValorChange(index, e)}
                className="p-2 border border-gray-300 rounded-md w-full"
              />
              <button
                type="button"
                onClick={() => removeValor(index)}
                className="mt-2 text-red-500"
              >
                Eliminar valor
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addValor}
            className="px-4 py-2 bg-pink-600 hover:bg-pink-700 text-white rounded-md"
          >
            Agregar otro valor
          </button>
        </div>

        <div className="mb-4">
          <label htmlFor="historia" className="block mb-2">Historia:</label>
          <textarea
            id="historia"
            name="historia"
            value={empresa.historia}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="equipo" className="block mb-2">Equipo:</label>
          <textarea
            id="equipo"
            name="equipo"
            value={empresa.equipo}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="correo" className="block mb-2">Correo electrónico:</label>
          <textarea
            id="correo"
            name="correo"
            value={empresa.correo}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="telefono" className="block mb-2">Teléfono:</label>
          <textarea
            id="telefono"
            name="telefono"
            value={empresa.telefono}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="logo" className="block mb-2">Logo (URL):</label>
          <input
            type="text"
            id="logo"
            name="logo"
            value={empresa.logo}
            onChange={handleChange}
            className="p-2 border border-gray-300 rounded-md w-full"
          />
        </div>

        <div className='flex space-x-4'>
          <button type="submit" className="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition">
            Actualizar Empresa
          </button>
          <button
            type="button" onClick={cancelar} 
            className="w-full bg-gray-600 text-white py-2 rounded-lg hover:bg-gray-700 transition"> 
            Cancelar
          </button>
        </div>
       
      </form>

      <RegresarButton />
    </motion.div>
  );
};

export default ActualizarEmpresa;
