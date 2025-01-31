import React from "react";

const PreguntasFrecuentes = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">Preguntas Frecuentes (FAQ)</h2>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">1. ¿Cómo puedo realizar un pedido?</h3>
        <p>
          Para hacer un pedido, navega por nuestro catálogo, selecciona los productos
          que deseas y agrégalos al carrito. Luego, procede con el pago en el checkout.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">2. ¿Cuáles son las opciones de pago?</h3>
        <p>
          Aceptamos tarjetas de crédito, débito, PayPal y depósitos bancarios. 
          Verifica los métodos disponibles durante el proceso de compra.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">3. ¿Cuánto tarda el envío?</h3>
        <p>
          El tiempo de entrega varía según la ubicación. Generalmente, oscila entre 
          3 y 7 días hábiles. Ofrecemos también envíos exprés con un costo adicional.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">4. ¿Puedo devolver o cambiar un producto?</h3>
        <p>
          Contamos con una política de devoluciones dentro de los primeros 15 días 
          posteriores a la entrega. Para más detalles, consulta nuestros{" "}
          <strong>Términos y Condiciones</strong>.
        </p>
      </div>

      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">5. ¿Cómo contacto al servicio de atención al cliente?</h3>
        <p>
          Puedes enviarnos un correo a <em>soporte@puntoshein.com</em> o llamar 
          al 01-800-PUNTO (78686) de lunes a viernes, de 9:00 a 18:00 hrs.
        </p>
      </div>
    </div>
  );
};

export default PreguntasFrecuentes;
