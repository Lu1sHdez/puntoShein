import React, { useState } from "react";

const Contacto = () => {
  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí iría la lógica para enviar el mensaje, por ejemplo, a tu backend o un servicio de correo.
    console.log("Enviando mensaje de contacto:", { nombre, correo, mensaje });
    // Limpiar formulario (opcional)
    setNombre("");
    setCorreo("");
    setMensaje("");
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-4 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">Contáctanos</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="Tu nombre"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Correo Electrónico
          </label>
          <input
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none"
            placeholder="Tu correo"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold mb-1">
            Mensaje
          </label>
          <textarea
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            className="w-full p-2 border rounded focus:outline-none h-32"
            placeholder="Escribe tu mensaje"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Enviar
        </button>
      </form>

      {/* Información de contacto adicional (opcional) */}
      <div className="mt-6 text-sm text-gray-700">
        <p>Teléfono: 01-800-PUNTO (78686)</p>
        <p>Correo: soporte@puntoshein.com</p>
        <p>Dirección: Av. Ejemplo 123, Col. Centro, Ciudad, País</p>
      </div>
    </div>
  );
};

export default Contacto;
