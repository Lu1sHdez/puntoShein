import React, { useState } from 'react';
import axios from 'axios';
import Formulario from '../../../formulario/formulario';
import { camposInvitacionEmpleado } from '../../../formulario/campos';
import { API_URL } from '../../../ApiConexion';
import CargandoModal from '../../../Animations/CargandoModal';

const FormularioInvitacionEmpleado = ({ onClose, actualizarLista }) => {
  const [valores, setValores] = useState({ correo: '' });
  const [errores, setErrores] = useState({});
  const [mensajeRespuesta, setMensajeRespuesta] = useState("");
  const [errorServidor, setErrorServidor] = useState("");
  const [enviando, setEnviando] = useState(false);

  const handleChange = (e) => {
    setValores({ ...valores, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrores({});
    setMensajeRespuesta("");
    setErrorServidor("");
    setEnviando(true);

    try {
      const res = await axios.post(`${API_URL}/api/admin/enviarInvitacionEmpleado`, valores, {
        withCredentials: true,
      });

      setMensajeRespuesta(res.data.mensaje);
      setValores({ correo: "" });

      if (actualizarLista) actualizarLista();
    } catch (error) {
      const resData = error.response?.data;

      if (resData?.errores) {
        setErrores(resData.errores);
      } else {
        setErrorServidor(resData?.mensaje || "Error al enviar la invitación.");
      }
    } finally {
      setEnviando(false);
    }
  };

  return (
    <>
      <CargandoModal visible={enviando} mensaje="Enviando invitación..." />

      <div className="bg-white p-2 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Invitar nuevo empleado</h2>

        <Formulario
          campos={camposInvitacionEmpleado}
          valores={valores}
          errores={errores}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          cargando={enviando}
          ocultarBoton={true} // ocultamos el botón interno
          botonesPersonalizados={
            <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="btn-secundario w-full sm:w-auto"
                >
                {mensajeRespuesta ? "Cerrar" : "Cancelar"}
              </button>
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn-principal w-full sm:w-auto"
                disabled={enviando}
              >
                {enviando ? "Enviando..." : "Enviar invitación"}
              </button>
            </div>
          }
        />
        {mensajeRespuesta && (
          <p className="text-center text-sm text-green-600 mt-4">{mensajeRespuesta}</p>
        )}
        {errorServidor && (
          <p className="text-center text-sm text-red-600 mt-2">{errorServidor}</p>
        )}
      </div>
    </>
  );
};

export default FormularioInvitacionEmpleado;
