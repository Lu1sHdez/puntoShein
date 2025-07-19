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

export const campos = [
  {
    name: "nombre",
    label: "Nombre completo",
    type: "text",
    placeholder: "Escribe tu nombre",
  },
  {
    name: "correo",
    label: "Correo electrónico",
    type: "email",
    placeholder: "ejemplo@correo.com",
  },
  {
    name: "password",
    label: "Contraseña",
    type: "password",
    placeholder: "Tu contraseña",
  },
  {
    name: "telefono",
    label: "Teléfono",
    type: "text",
    placeholder: "10 dígitos",
  },
  {
    name: "fecha_nacimiento",
    label: "Fecha de nacimiento",
    type: "date",
  },
  {
    name: "hora_contacto",
    label: "Hora preferida de contacto",
    type: "time",
  },
  {
    name: "edad",
    label: "Edad",
    type: "number",
    placeholder: "Tu edad",
  },
  {
    name: "genero",
    label: "Género",
    type: "select",
    opciones: [
      { value: "", label: "Selecciona una opción" },
      { value: "masculino", label: "Masculino" },
      { value: "femenino", label: "Femenino" },
      { value: "otro", label: "Otro" },
    ],
  },
  {
    name: "terminos",
    label: "Acepto los términos y condiciones",
    type: "checkbox",
  },
  {
    name: "metodo_pago",
    label: "Método de pago",
    type: "radio",
    opciones: [
      { value: "efectivo", label: "Efectivo" },
      { value: "tarjeta", label: "Tarjeta" },
      { value: "paypal", label: "PayPal" },
    ],
  },
  {
    name: "archivo",
    label: "Adjuntar archivo",
    type: "file",
  },
];
