import Swal from "sweetalert2";

/**
 * Muestra una notificación tipo toast en la pantalla sin bloquear la navegación.
 * 
 * @param {"success" | "error" | "info" | "warning" | "question"} icono - Tipo de ícono a mostrar.
 * @param {string} titulo - Texto del mensaje que aparecerá en la notificación.
 */
export const mostrarNotificacion = (icono = "success", titulo = "") => {
  if (!titulo || titulo.trim() === "") return;

  Swal.fire({
    toast: true,
    position: "center",
    icon: icono,
    title: titulo,
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });
};
