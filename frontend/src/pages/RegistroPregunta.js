import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormularioInput from '../components/form/FormularioInput';
import Boton from '../elements/Boton';

const RegistroPregunta = () => {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token'); // Obtener el token desde localStorage

    if (!token) {
      setError('No se encontró el token de autenticación.');
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:4000/api/Usuario/registroPregunta',
        { pregunta, respuesta },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Incluir el token en el encabezado
          },
          withCredentials: true,
        }
      );

      if (response.status === 201) {
        setSuccess(true);
        setError(null);
        navigate('/'); 
      }
    } catch (err) {
      setError('Error al registrar la pregunta secreta');
      console.error(err);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-5 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700 mb-6">Registrar Pregunta Secreta</h1>
        {error && <div className="text-red-500 text-center mb-4">{error}</div>}
        {success && <div className="text-green-500 text-center mb-4">Pregunta registrada exitosamente!</div>}
        <form onSubmit={handleSubmit}>
          <FormularioInput
            label="Pregunta"
            type="text"
            name="pregunta"
            placeholder="Ingresa tu pregunta secreta"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
          />

          <FormularioInput
            label="Respuesta"
            type="text"
            name="respuesta"
            placeholder="Ingresa la respuesta"
            value={respuesta}
            onChange={(e) => setRespuesta(e.target.value)}
          />

          <Boton
            texto="Registrar"
            onClick={handleSubmit}
            estiloPersonalizado="w-full bg-pink-600 text-white py-2 rounded-lg hover:bg-pink-700 transition"
          />
        </form>
      </div>
    </div>
  );
};

export default RegistroPregunta;