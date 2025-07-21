export const camposOpiniones = [
  {
    name: "correo",
    label: "Correo electrónico",
    type: "text",
    placeholder: "ejemplo@correo.com",
  },
  {
    name: "nombre",
    label: "Tu nombre",
    type: "text",
    placeholder: "Tu nombre y apellido",
  },
  {
    name: "mensaje",
    label: "Mensaje",
    type: "textarea",
    placeholder: "Escribe tu opinión aquí...",
  },
  
];

export const camposEmpleadoRegistro = [
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
    placeholder: "Tu nombre",
  },
  {
    name: "apellido_paterno",
    label: "Apellido paterno",
    type: "text",
    placeholder: "Tu apellido paterno",
  },
  {
    name: "apellido_materno",
    label: "Apellido materno",
    type: "text",
    placeholder: "Tu apellido materno",
  },
  {
    name: "password",
    label: "Contraseña",
    type: "text",
    placeholder: "Crea una contraseña segura",
  },
  {
    name: "telefono",
    label: "Teléfono",
    type: "text",
    placeholder: "10 dígitos numéricos",
  },
  {
    name: "ubicacion",
    label: "Ubicación",
    type: "text",
    placeholder: "Ciudad o estado",
  },
  {
    name: "genero",
    label: "Género",
    type: "radio", // lo trataremos como especial en el componente
    opciones: [
      { label: "Hombre", value: "H" },
      { label: "Mujer", value: "M" },
    ],
  }
  
];

// campos.js
export const camposInvitacionEmpleado = [
  {
    name: "correo",
    label: "Correo electrónico",
    type: "text",
    placeholder: "ejemplo@correo.com",
  },
];

export const camposDatosPersonales = [
  {
    name: "nombre",
    label: "Nombre",
    type: "text",
    placeholder: "Tu nombre",
  },
  {
    name: "apellido_paterno",
    label: "Apellido paterno",
    type: "text",
    placeholder: "Tu apellido paterno",
  },
  {
    name: "apellido_materno",
    label: "Apellido materno",
    type: "text",
    placeholder: "Tu apellido materno",
  },
  {
    name: "correo",
    label: "Correo electrónico",
    type: "text",
    placeholder: "ejemplo@correo.com",
  },
  {
    name: "telefono",
    label: "Teléfono",
    type: "text",
    placeholder: "10 dígitos numéricos",
  },
];

export const camposPassword = [
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Crea una contraseña segura",
  },
  {
    name: "confirmPassword",
    label: "Confirmar contraseña",
    type: "password",
    placeholder: "Repite la contraseña",
  },
];
