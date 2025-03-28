import axios from "axios";
import { API_URL } from '../../../ApiConexion.js';


// Obtener todas las preguntas
export const fetchPreguntas = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/preguntas/obtener`, {
      withCredentials: true, // si usas autenticación con cookies
    });
    return response.data;
  } catch (error) {
    console.error("Error al obtener las preguntas frecuentes:", error);
    throw error;
  }
};

// Crear nueva pregunta
export const crearPregunta = async (newPregunta, newRespuesta) => {
  try {
    const response = await axios.post(
      `${API_URL}/api/preguntas/crear`,
      { pregunta: newPregunta, respuesta: newRespuesta },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error al crear la pregunta frecuente:", error);
    throw error;
  }
};

// Editar una pregunta existente
export const editarPregunta = async (id, editedPregunta, editedRespuesta) => {
  try {
    const response = await axios.put(
      `${API_URL}/api/preguntas/editar/${id}`,
      { pregunta: editedPregunta, respuesta: editedRespuesta },
      { withCredentials: true }
    );
    return response.data;
  } catch (error) {
    console.error("Error al editar la pregunta frecuente:", error);
    throw error;
  }
};

// Eliminar una pregunta
export const eliminarPregunta = async (id) => {
  try {
    await axios.delete(`${API_URL}/api/preguntas/eliminar/${id}`, {
      withCredentials: true,
    });
  } catch (error) {
    console.error("Error al eliminar la pregunta frecuente:", error);
    throw error;
  }
};
