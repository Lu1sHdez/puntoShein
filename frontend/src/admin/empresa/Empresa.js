import React, { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { API_URL } from "../../ApiConexion.js";
import { FaEdit } from "react-icons/fa";
import { dataLoadingAnimation } from "../../components/Funciones.js";
import CargandoBarra from "../../Animations/CargandoBarra.js";
import ModalEditarLogo from "./modales/Logo.js";
import ModalDatosGenerales from "./modales/DatosGenerales.js";
import ModalContacto from "./modales/Contacto.js";
import ModalValores from "./modales/Valores.js";

const Empresa = () => {
  const [empresa, setEmpresa] = useState(null);
  const [loading, setLoading] = useState(true);
  const [mostrarModalLogo, setMostrarModalLogo] = useState(false);
  const [mostrarModalGenerales, setMostrarModalGenerales] = useState(false);
  const [mostrarModalContacto, setMostrarModalContacto] = useState(false);
  const [mostrarModalValores, setMostrarModalValores] = useState(false);

  const fetchEmpresa = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/empresa/empresa`, {
        withCredentials: true,
      });

      // Si no hay datos, crear estructura vacía
      if (!response.data || Object.keys(response.data).length === 0) {
        setEmpresa({
          nombre: "",
          mision: "",
          vision: "",
          historia: "",
          equipo: "",
          correo: "",
          telefono: "",
          valores: [],
          logo: "",
        });
      } else {
        setEmpresa(response.data);
      }
    } catch (error) {
      console.warn("No se encontró información de la empresa, creando estructura vacía...");
      setEmpresa({
        nombre: "",
        mision: "",
        vision: "",
        historia: "",
        equipo: "",
        correo: "",
        telefono: "",
        valores: [],
        logo: "",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmpresa();
  }, []);

  if (loading) return <CargandoBarra message="Cargando empresa..." />;

  return (
    <motion.div
      {...dataLoadingAnimation}
      className="p-6 sm:p-8 max-w-5xl mx-auto bg-white rounded-2xl shadow-lg border border-gray-100 animate-fade-in-up"
    >
      <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 text-center mb-8">
        Información de la Empresa
      </h1>

      {empresa && (
        <div className="space-y-8">
          {/* === DATOS GENERALES === */}
          <section className="p-5 border border-gray-200 rounded-xl shadow-sm bg-gradient-to-br from-gray-50 to-white">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-blue-700">
                Información General
              </h2>
              <button
                onClick={() => setMostrarModalGenerales(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                <FaEdit /> Editar
              </button>
            </div>
            <div className="space-y-1 text-gray-700 text-sm sm:text-base">
              <p><strong>Nombre:</strong> {empresa.nombre || "—"}</p>
              <p><strong>Misión:</strong> {empresa.mision || "—"}</p>
              <p><strong>Visión:</strong> {empresa.vision || "—"}</p>
              <p><strong>Historia:</strong> {empresa.historia || "—"}</p>
              <p><strong>Equipo:</strong> {empresa.equipo || "—"}</p>
            </div>
          </section>

          {/* === CONTACTO === */}
          <section className="p-5 border border-gray-200 rounded-xl shadow-sm bg-gradient-to-br from-gray-50 to-white">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-blue-700">
                Información de Contacto
              </h2>
              <button
                onClick={() => setMostrarModalContacto(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                <FaEdit /> Editar
              </button>
            </div>
            <div className="text-gray-700 text-sm sm:text-base space-y-1">
              <p><strong>Correo:</strong> {empresa.correo || "—"}</p>
              <p><strong>Teléfono:</strong> {empresa.telefono || "—"}</p>
            </div>
          </section>

          {/* === VALORES === */}
          <section className="p-5 border border-gray-200 rounded-xl shadow-sm bg-gradient-to-br from-gray-50 to-white">
            <div className="flex justify-between items-start mb-4">
              <h2 className="text-xl font-semibold text-blue-700">Valores</h2>
              <button
                onClick={() => setMostrarModalValores(true)}
                className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-all duration-200"
              >
                <FaEdit /> Editar
              </button>
            </div>
            {empresa.valores?.length ? (
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {empresa.valores.map((valor, idx) => (
                  <li key={idx}>
                    <strong>{valor.nombre}:</strong> {valor.descripcion}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No hay valores definidos.</p>
            )}
          </section>

          {/* === LOGO === */}
          <section className="p-5 border border-gray-200 rounded-xl shadow-sm bg-gradient-to-br from-gray-50 to-white text-center">
            <h2 className="text-xl font-semibold text-blue-700 mb-3">Logo</h2>
            {empresa.logo ? (
              <div className="relative w-fit mx-auto">
                <img
                  src={empresa.logo}
                  alt="Logo"
                  className="w-36 h-auto rounded-lg shadow-md border border-gray-200"
                />
                <button
                  onClick={() => setMostrarModalLogo(true)}
                  className="absolute top-2 right-2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 shadow transition-all"
                  title="Editar logo"
                >
                  <FaEdit size={16} />
                </button>
              </div>
            ) : (
              <div
                onClick={() => setMostrarModalLogo(true)}
                className="w-36 h-36 mx-auto rounded-lg bg-blue-50 border-2 border-dashed border-blue-300 flex flex-col items-center justify-center text-gray-500 hover:scale-105 transition-all cursor-pointer"
              >
                <FaEdit className="text-blue-600 text-xl mb-1" />
                <span className="text-sm font-medium">Agregar logo</span>
              </div>
            )}
          </section>

          {/* === MODALES === */}
          {mostrarModalGenerales && (
            <ModalDatosGenerales
              empresa={empresa}
              onClose={() => setMostrarModalGenerales(false)}
              onActualizar={fetchEmpresa}
            />
          )}
          {mostrarModalContacto && (
            <ModalContacto
              empresa={empresa}
              onClose={() => setMostrarModalContacto(false)}
              onActualizar={fetchEmpresa}
            />
          )}
          {mostrarModalValores && (
            <ModalValores
              empresa={empresa}
              onClose={() => setMostrarModalValores(false)}
              onActualizar={fetchEmpresa}
            />
          )}
          {mostrarModalLogo && (
            <ModalEditarLogo
              empresa={empresa}
              onClose={() => setMostrarModalLogo(false)}
              onActualizar={fetchEmpresa}
            />
          )}
        </div>
      )}
    </motion.div>
  );
};

export default Empresa;
