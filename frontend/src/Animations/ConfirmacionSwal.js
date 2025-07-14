import Swal from "sweetalert2";

/**
 * Muestra un modal de confirmación personalizable y reutilizable.
 *
 * @param {Object} opciones - Objeto de opciones para personalizar el modal.
 * @param {string} [opciones.titulo="¿Estás seguro?"] - Título del modal.
 * @param {string} [opciones.texto="Esta acción no se puede deshacer."] - Texto descriptivo.
 * @param {string} [opciones.icono="warning"] - Tipo de icono (success, error, warning, info, question).
 * @param {string} [opciones.confirmText="Sí, continuar"] - Texto del botón de confirmación.
 * @param {string} [opciones.cancelText="Cancelar"] - Texto del botón de cancelar.
 * @param {string} [opciones.confirmColor="#d33"] - Color del botón de confirmación.
 * @param {string} [opciones.cancelColor="#3085d6"] - Color del botón de cancelar.
 * @returns {Promise<boolean>} true si el usuario confirmó, false si canceló.
 */
export const mostrarConfirmacion = async ({
  titulo = "¿Estás seguro?",
  texto = "Esta acción no se puede deshacer.",
  icono = "warning",
  confirmText = "Sí, continuar",
  cancelText = "Cancelar",
  confirmColor = "#d33",
  cancelColor = "#3085d6"
} = {}) => {
  const resultado = await Swal.fire({
    title: titulo,
    text: texto,
    icon: icono,
    showCancelButton: true,
    confirmButtonColor: confirmColor,
    cancelButtonColor: cancelColor,
    confirmButtonText: confirmText,
    cancelButtonText: cancelText
  });

  return resultado.isConfirmed;
};
