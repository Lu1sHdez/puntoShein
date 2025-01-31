import React from "react";

const PoliticaPrivacidad = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto text-justify">
      <h2 className="text-2xl font-bold mb-4">Política de Privacidad</h2>
      <p className="mb-4">
        En <strong>Punto Shein</strong>, nos comprometemos a proteger la privacidad
        de nuestros usuarios y clientes. La presente política describe qué datos
        personales recopilamos, cómo los utilizamos y cuáles son los derechos de
        los usuarios sobre dicha información.
      </p>

      <h3 className="text-xl font-semibold mb-2">1. Datos que recopilamos</h3>
      <ul className="list-disc ml-8 mb-4">
        <li>Información de contacto (nombre, correo electrónico, dirección, etc.).</li>
        <li>Detalles de pago (de manera encriptada).</li>
        <li>Historial de compras y preferencias.</li>
      </ul>

      <h3 className="text-xl font-semibold mb-2">2. Uso de datos</h3>
      <p className="mb-4">
        Utilizamos la información para procesar pedidos, brindar soporte al cliente, 
        mejorar nuestro servicio y personalizar la experiencia de los usuarios. 
        No vendemos ni compartimos datos personales con terceros ajenos a la operación, 
        salvo requerimiento legal.
      </p>

      <h3 className="text-xl font-semibold mb-2">3. Derechos del usuario</h3>
      <p className="mb-4">
        Los usuarios tienen derecho a acceder, corregir y/o eliminar sus datos. 
        Pueden contactarnos en <em>privacidad@puntoshein.com</em> para ejercer estos derechos.
      </p>

      <p className="mt-6">
        Para más información acerca de nuestra política de privacidad, contáctanos. 
        Nos reservamos el derecho de actualizar esta política en cualquier momento.
      </p>
    </div>
  );
};

export default PoliticaPrivacidad;
