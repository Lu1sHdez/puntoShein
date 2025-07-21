// VaciarCarrito.js

import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../ApiConexion";
import useSesionUsuario from "../../../context/useSesionUsuario";
import ModalMensaje from "../../../modal/Modal";

const VaciarCarrito = ({ actualizarCarrito }) => {
  const { id: usuarioId } = useSesionUsuario();
  const [mostrarModal, setMostrarModal] = useState(false);

  const handleConfirmar = async () => {
    try {
      const res = await axios.delete(
        `${API_URL}/api/carrito/vaciar`,
        {
          data: { usuario_id: usuarioId },
          withCredentials: true,
        }
      );

      if (res.status === 200) {
        actualizarCarrito();
      }
    } catch (error) {
      console.error("Error al vaciar el carrito:", error);
    } finally {
      setMostrarModal(false);
    }
  };

  return (
    <>
      <button
        onClick={() => setMostrarModal(true)}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
      >
        Vaciar Carrito
      </button>

      <ModalMensaje
        visible={mostrarModal}
        tipo="advertencia"
        titulo="Vaciar carrito"
        mensaje="¿Estás seguro de que deseas eliminar todos los productos de tu carrito?"
        onConfirmar={handleConfirmar}
        onCancelar={() => setMostrarModal(false)}
        mostrarCancelar={true}
        textoConfirmar="Sí, vaciar"
        textoCancelar="Cancelar"
      />
    </>
  );
};

export default VaciarCarrito;
