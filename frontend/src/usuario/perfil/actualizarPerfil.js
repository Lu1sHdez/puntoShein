import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegistroPregunta = () => {
  const [pregunta, setPregunta] = useState('');
  const [respuesta, setRespuesta] = useState('');
  const [error, setError] = useState('');
  const [mensajeExito, setMensajeExito] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Maneja el cambio de los campos del formulario
  const handlePreguntaChange = (e) => setPregunta(e.target.value);
  const handleRespuestaChange = (e) => setRespuesta(e.target.value);

  useEffect(() => {
    const registrarPregunta = async () => {
      if (!pregunta || !respuesta) {
        setError('La pregunta y la respuesta son obligatorios.');
        return;
      }

      try {
        setLoading(true);  // Establece loading a true cuando inicia la solicitud
        
        // Obtener el token JWT de las cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('token=')).split('=')[1];

        // Realizar la solicitud para registrar la pregunta secreta
        const response = await axios.post(
          `http://localhost:4000/api/Usuario/registroPregunta?token=${token}`,
          {
            pregunta,
            respuesta,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        // Si la respuesta es exitosa
        setMensajeExito(response.data.mensaje);
        setPregunta('');
        setRespuesta('');

        // Redirigir a la página de perfil o cualquier otra página después del registro
        navigate('/perfil');
      } catch (error) {
        // Manejar errores
        if (error.response) {
          setError(error.response.data.mensaje);  // Mostrar mensaje de error del backend
        } else {
          setError('Error interno del servidor.');
        }
      } finally {
        setLoading(false);  // Establece loading a false cuando la solicitud termina
      }
    };

    // Llama a la función solo cuando ambos campos están llenos
    if (pregunta && respuesta) {
      registrarPregunta();
    }
  }, [pregunta, respuesta, navigate]);  // Dependencias para ejecutar el useEffect

  return (
    <div className="container mt-5">
      <h2>Registrar Pregunta Secreta</h2>

      {/* Mostrar mensaje de éxito */}
      {mensajeExito && <div className="alert alert-success">{mensajeExito}</div>}

      {/* Mostrar mensaje de error */}
      {error && <div className="alert alert-danger">{error}</div>}

      {/* Formulario para registrar pregunta secreta */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Simplemente deja que el useEffect maneje la lógica del registro
        }}
      >
        <div className="form-group">
          <label htmlFor="pregunta">Pregunta Secreta</label>
          <input
            type="text"
            className="form-control"
            id="pregunta"
            value={pregunta}
            onChange={handlePreguntaChange}
            placeholder="Ingresa tu pregunta secreta"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="respuesta">Respuesta</label>
          <input
            type="text"
            className="form-control"
            id="respuesta"
            value={respuesta}
            onChange={handleRespuestaChange}
            placeholder="Ingresa la respuesta"
            required
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary mt-3"
          disabled={loading}  // Deshabilita el botón mientras se hace la solicitud
        >
          {loading ? 'Registrando...' : 'Registrar Pregunta'}
        </button>
      </form>
    </div>
  );
};

export default RegistroPregunta;
