import React, { useState } from "react";
import SeccionDatos from "./components/SeccionDatos";
import SeccionPassword from "./components/SeccionPassword";
import axios from "axios";
import { API_URL } from "../../ApiConexion";
import CargandoModal from "../../Animations/CargandoModal";
import { useNavigate } from "react-router-dom";
import ModalExito from "./components/ModalExito";
import { motion } from "framer-motion";

const Registro = () => {
  const [paso, setPaso] = useState(1);
  const [errores, setErrores] = useState({});
  const [cargando, setCargando] = useState(false);
  const [exito, setExito] = useState(false);
  const navigate = useNavigate();

  const [valores, setValores] = useState({
    nombre: "",
    apellido_paterno: "",
    apellido_materno: "",
    correo: "",
    telefono: "",
    password: "",
    confirmPassword: "",
    ocultarBoton: true,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValores((prev) => ({ ...prev, [name]: value }));
    setErrores((prev) => ({ ...prev, [name]: "" }));
  };

  const handleNext = async () => {
    setCargando(true);
    try {
      const payload = {
        nombre: valores.nombre,
        apellido_paterno: valores.apellido_paterno,
        apellido_materno: valores.apellido_materno,
        correo: valores.correo,
        telefono: valores.telefono,
      };

      await axios.post(`${API_URL}/api/autenticacion/validar-datos-previos`, payload, {
        withCredentials: true,
      });

      setPaso(2);
      setErrores({});
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.errores) {
        setErrores(error.response.data.errores);
      } else {
        console.error("Error inesperado:", error);
      }
    } finally {
      setCargando(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);

    if (valores.password !== valores.confirmPassword) {
      setErrores({ confirmPassword: "Las contraseñas no coinciden." });
      setCargando(false);
      return;
    }

    try {
      await axios.post(`${API_URL}/api/autenticacion/registro`, valores, {
        withCredentials: true,
      });
      setExito(true);
    } catch (error) {
      if (error.response?.status === 400 && error.response.data.errores) {
        setErrores(error.response.data.errores);
      } else {
        console.error("Error inesperado:", error);
      }
    } finally {
      setCargando(false);
    }
  };

  return (
    <>
      <CargandoModal visible={cargando} mensaje="Procesando registro..." />

      <section className="min-h-screen flex flex-col justify-start sm:justify-center bg-gradient-to-b from-blue-50 to-white px-4 py-6">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-3xl mx-auto mt-4 sm:mt-0"
      >

          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Registro de Usuario
          </h2>

          {/* Wizard visual */}
          <div className="flex justify-center mb-10">
            <div className="flex items-center gap-10">
              {[1, 2].map((num) => (
                <div
                  key={num}
                  onClick={() => (num < paso || (num === 1 && paso === 2)) && setPaso(num)}
                  className={`flex items-center gap-3 cursor-pointer transition-all duration-300 ${
                    paso === num ? "text-blue-600 font-semibold" : "text-gray-400"
                  }`}
                >
                  <div
                    className={`w-9 h-9 rounded-full flex items-center justify-center text-base border-2 ${
                      paso === num ? "bg-blue-100 border-blue-600" : "bg-gray-100 border-gray-300"
                    }`}
                  >
                    {num}
                  </div>
                  <span className="text-base">
                    {num === 1 ? "Datos personales" : "Contraseña"}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Contenido del formulario */}
          <form onSubmit={handleSubmit}>
            {paso === 1 && (
              <SeccionDatos valores={valores} errores={errores} handleChange={handleChange} />
            )}
            {paso === 2 && (
              <SeccionPassword valores={valores} errores={errores} handleChange={handleChange} />
            )}

            {/* Botones de navegación */}
            <div
              className={`mt-8 ${
                paso === 1 ? "flex justify-center" : "flex justify-between items-center"
              }`}
            >
              {paso > 1 && (
                <button type="button" onClick={() => setPaso(paso - 1)} className="btn-secundario">
                  ← Volver
                </button>
              )}

              {paso < 2 && (
                <button type="button" onClick={handleNext} className="btn-principal">
                  Continuar →
                </button>
              )}

              {paso === 2 && (
                <button type="submit" className="btn-principal">
                  Registrarse
                </button>
              )}
            </div>
            <button
            type="button"
            onClick={() => navigate("/login")}
            className="block w-full text-sm text-blue-600 hover:underline text-center mt-3"
          >
            ¿Ya tiene cuenta? Inicia Sesión
          </button>
          </form>
        </motion.div>
        
      </section>

      <ModalExito visible={exito} onClose={() => navigate("/login")} />
    </>
  );
};

export default Registro;
