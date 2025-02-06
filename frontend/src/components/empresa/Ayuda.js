import React from "react";
import { Link } from "react-router-dom";

const Ayuda = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Centro de Ayuda</h1>
      <p className="text-gray-600 mb-6">
        Encuentra respuestas a las preguntas más frecuentes y obtén asistencia para tu compra en Punto Shein.
      </p>

      {/* Preguntas Frecuentes */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Preguntas Frecuentes (FAQ)</h2>
        <ul className="space-y-2">
          <li>
            <strong>¿Cómo realizo un pedido?</strong>
            <p>Puedes hacer un pedido seleccionando el producto y siguiendo los pasos en el carrito de compras.</p>
          </li>
          <li>
            <strong>¿Cuáles son los métodos de pago disponibles?</strong>
            <p>Aceptamos pagos con tarjeta de crédito, débito, transferencia bancaria y OXXO Pay.</p>
          </li>
          <li>
            <strong>¿Cuánto tarda en llegar mi pedido?</strong>
            <p>El tiempo de entrega depende del producto. Los productos en stock tardan de 2 a 5 días hábiles, mientras que los pedidos de Shein pueden tardar de 10 a 20 días.</p>
          </li>
          <li>
            <strong>¿Puedo cancelar o modificar mi pedido?</strong>
            <p>Sí, puedes cancelar o modificar tu pedido si aún no ha sido procesado. Contáctanos lo antes posible.</p>
          </li>
          <li>
            <strong>¿Cómo puedo contactar con soporte?</strong>
            <p>Puedes enviarnos un mensaje en la <Link to="/contacto" className="text-blue-500 hover:underline">página de contacto</Link> o usar el chat en vivo.</p>
          </li>
        </ul>
      </section>

      {/* Información de Contacto */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Contacto</h2>
        <p>Si necesitas ayuda adicional, puedes comunicarte con nosotros:</p>
        <ul className="mt-2">
          <li><strong>Email:</strong> soporte@puntoshein.com</li>
          <li><strong>Teléfono:</strong> +52 123 456 7890</li>
          <li><strong>WhatsApp:</strong> <a href="https://wa.me/521234567890" className="text-blue-500 hover:underline">Chatea con nosotros</a></li>
        </ul>
      </section>

      {/* Devoluciones y Garantías */}
      <section className="mb-8">
        <h2 className="text-lg font-semibold text-gray-700 mb-3">Devoluciones y Garantías</h2>
        <p>Si no estás satisfecho con tu compra, puedes devolver el producto en un plazo de 15 días. Consulta nuestra <Link to="/politica-devoluciones" className="text-blue-500 hover:underline">política de devoluciones</Link>.</p>
      </section>

      {/* Botón de regreso */}
      <div className="mt-6">
        <Link to="/" className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
          Volver a Inicio
        </Link>
      </div>
    </div>
  );
};

export default Ayuda;
