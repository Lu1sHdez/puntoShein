import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import useAuth from "../hooks/useAuth";
import { API_URL } from "../ApiConexion";
import ModalMensaje from "./Modal";
import CargandoModal from "../Animations/CargandoModal";
const CerrarSesionModal = ({ visible, onClose }) => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [cargando, setCargando] = useState(false);

  const confirmarCerrarSesion = async () => {
    setCargando(true);
    try {
      await axios.post(`${API_URL}/api/autenticacion/logout`, {}, { withCredentials: true });

      logout();
      setTimeout(() => {
        setCargando(false);
        navigate("/");
        window.location.reload();
      }, 2000);
    } catch (error) {
      setCargando(false);
      Swal.fire({
        icon: "error",
        title: "Error al cerrar sesión",
        text: error.response?.data?.mensaje || "Ocurrió un error.",
      });
    }
  };

  return (
    <>
      <ModalMensaje
        visible={visible}
        tipo="advertencia"
        titulo="Cerrar sesión"
        mensaje="¿Estás seguro que deseas cerrar sesión?"
        mostrarCancelar={true}
        onCancelar={onClose}
        onConfirmar={confirmarCerrarSesion}
        textoConfirmar="Sí, salir"
        textoCancelar="Cancelar"
      />
      <CargandoModal visible={cargando} mensaje="Cerrando sesión..." />
    </>
  );
};

export default CerrarSesionModal;
