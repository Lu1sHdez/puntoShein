import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import CargandoModal from "../../../Animations/CargandoModal";
import FormularioDinamico from "../../../formulario/formulario";
import { camposOpiniones } from "../../../formulario/campos.js";
import { FaQuoteLeft } from "react-icons/fa";

const SeccionOpiniones = () => {
  const [opiniones, setOpiniones] = useState([]);
  const [valores, setValores] = useState({ correo: "", nombre: "", mensaje: "" });
  const [errores, setErrores] = useState({});
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  const [errorServidor, setErrorServidor] = useState("");
  const [enviando, setEnviando] = useState(false);

  useEffect(() => {
    const obtenerOpiniones = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/opinion/aprobadas`);
        setOpiniones(res.data.slice(0, 3)); // Mostrar solo las 3 más recientes
      } catch (error) {
        console.error("Error al obtener opiniones", error);
      }
    };
    obtenerOpiniones();
  }, []);

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const manejarEnvio = async (e) => {
    e.preventDefault();
    setErrores({});
    setMensajeRespuesta("");
    setErrorServidor("");
    setEnviando(true);

    try {
      const res = await axios.post(`${API_URL}/api/opinion/crear`, valores);
      setMensajeRespuesta(res.data.mensaje);
      setValores({ correo: "", nombre: "", mensaje: "" });
      setTimeout(() => setMensajeRespuesta(""), 5000);
    } catch (error) {
      const resData = error.response?.data;
      if (resData?.errores) {
        setErrores(resData.errores);
      } else {
        setErrorServidor(resData?.mensaje || "Error al enviar la opinión.");
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <section className="bg-white py-20">
      <h2 className="text-center text-3xl md:text-4xl font-extrabold text-gray-800 mb-10">
          Opiniones
        </h2>
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-12">
      
        {/* Opiniones mostradas */}
        <div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Lo que opinan nuestros clientes</h3>
          {opiniones.length === 0 ? (
            <p className="text-gray-500">Aún no hay opiniones disponibles.</p>
          ) : (
            <div className="space-y-6">
              {opiniones.map((op) => (
                <div
                  key={op.id}
                  className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md transition"
                >
                  <div className="flex items-start gap-3 mb-2">
                    <FaQuoteLeft className="text-blue-400 text-2xl" />
                    <p className="text-gray-700 italic leading-relaxed">"{op.mensaje}"</p>
                  </div>
                  <p className="text-sm text-right font-semibold text-gray-600">– {op.nombre}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Formulario */}
        <div>
          <CargandoModal visible={enviando} mensaje="Enviando tu opinión..." />
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">Déjanos tu opinión</h3>

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
        </div>
      </div>
    </section>
  );
};

export default SeccionOpiniones;
