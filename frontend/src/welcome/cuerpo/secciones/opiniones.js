import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import CargandoModal from "../../../Animations/CargandoModal";
import FormularioDinamico from "../../../formulario/formulario";
import { camposOpiniones } from "../../../formulario/campos.js";

const FormularioOpinion = () => {
  const [valores, setValores] = useState({ correo: "", nombre: "", mensaje: "" });
  const [errores, setErrores] = useState({});
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  const [errorServidor, setErrorServidor] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setErrores({});
    setMensajeRespuesta("");
    setErrorServidor("");
    setEnviando(true); // Mostrar modal desde el inicio

    try {
      const res = await axios.post(`${API_URL}/api/opinion/crear`, valores);
      setMensajeRespuesta(res.data.mensaje);
      setValores({ correo: "",nombre: "",  mensaje: "" });

      setTimeout(() => {
        setMensajeRespuesta("");
      }, 5000);
    } catch (error) {
      const resData = error.response?.data;

      if (resData?.errores) {
        setErrores(resData.errores); // Errores de validación del backend
      } else {
        setErrorServidor(resData?.mensaje || "Error al enviar la opinión.");
      }
    } finally {
      setEnviando(false); // Ocultar modal sin importar el resultado
    }
  };

  return (
    <>
      {/* Modal visible mientras se envía la opinión */}
      <CargandoModal visible={enviando} mensaje="Enviando tu opinión..." />

      {/* Título del formulario */}
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-left">Déjanos tu opinion</h2>

      <FormularioDinamico
        campos={camposOpiniones}
        valores={valores}
        errores={errores}
        handleChange={handleChange}
        handleSubmit={manejarEnvio}
        titulo="Enviar mi opinión"
        cargando={enviando}
      />

      {mensajeRespuesta && (
        <p className="text-center text-sm text-green-600 mt-4">{mensajeRespuesta}</p>
      )}
      {errorServidor && (
        <p className="text-center text-sm text-red-600 mt-2">{errorServidor}</p>
      )}
    </>
  );
};

export default FormularioOpinion;
