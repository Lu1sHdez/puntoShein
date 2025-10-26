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
        setOpiniones(res.data.slice(0, 3));
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
    <section className="relative isolate overflow-hidden bg-white py-20 sm:py-24">
      {/* Fondo difuminado superior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%-12rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 rotate-[30deg] 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-20 sm:left-[calc(50%-36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 animate-fade-in-up">
        <h2 className="text-center text-4xl sm:text-5xl font-bold tracking-tight text-gray-900 mb-14">
          Opiniones
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* === Opiniones mostradas === */}
          <div className="animate-fade-in-up">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Lo que opinan nuestros clientes
            </h3>

            {opiniones.length === 0 ? (
              <p className="text-gray-500">Aún no hay opiniones disponibles.</p>
            ) : (
              <div className="space-y-6">
                {opiniones.map((op) => (
                  <div
                    key={op.id}
                    className="bg-blue-50 border border-blue-200 rounded-xl p-6 shadow-sm hover:shadow-md hover:scale-[1.01] transition-all duration-300"
                  >
                    <div className="flex items-start gap-3 mb-2">
                      <FaQuoteLeft className="text-blue-600 text-2xl" />
                      <p className="text-gray-700 italic leading-relaxed">
                        "{op.mensaje}"
                      </p>
                    </div>
                    <p className="text-sm text-right font-semibold text-gray-600">
                      – {op.nombre}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* === Formulario === */}
          <div className="animate-fade-in-up [animation-delay:0.15s]">
            <CargandoModal visible={enviando} mensaje="Enviando tu opinión..." />
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
              Déjanos tu opinión
            </h3>

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
              <p className="text-center text-sm text-green-600 mt-4">
                {mensajeRespuesta}
              </p>
            )}
            {errorServidor && (
              <p className="text-center text-sm text-red-600 mt-2">
                {errorServidor}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Fondo difuminado inferior */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[calc(100%-15rem)] -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          className="relative left-[calc(50%+4rem)] aspect-[1155/678] w-[40rem] -translate-x-1/2 
                     bg-gradient-to-tr from-blue-400 to-blue-700 opacity-20 
                     sm:left-[calc(50%+36rem)] sm:w-[72rem]"
          style={{
            clipPath:
              "polygon(74.1% 44.1%,100% 61.6%,97.5% 26.9%,85.5% 0.1%,80.7% 2%,72.5% 32.5%,60.2% 62.4%,52.4% 68.1%,47.5% 58.3%,45.2% 34.5%,27.5% 76.7%,0.1% 64.9%,17.9% 100%,27.6% 76.8%,76.1% 97.7%,74.1% 44.1%)",
          }}
        />
      </div>
    </section>
  );
};

export default SeccionOpiniones;
