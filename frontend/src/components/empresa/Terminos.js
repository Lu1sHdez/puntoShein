import React from "react";

const Terminos = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto text-justify">
      <h2 className="text-2xl font-bold mb-4">Términos y Condiciones</h2>

      <p className="mb-4">
        Los presentes términos y condiciones regulan el acceso y uso de la plataforma
        de <strong>Punto Shein</strong>. Al utilizar nuestros servicios, el usuario 
        acepta las disposiciones aquí establecidas.
      </p>

      <h3 className="text-xl font-semibold mb-2">1. Registro de Usuario</h3>
      <p className="mb-4">
        El usuario debe proporcionar información veraz y actualizada en el registro. 
        Es responsable de mantener la confidencialidad de sus credenciales de acceso.
      </p>

      <h3 className="text-xl font-semibold mb-2">2. Ventas y Pagos</h3>
      <p className="mb-4">
        Los precios y promociones están sujetos a cambios sin previo aviso. 
        Nos reservamos el derecho de cancelar pedidos en casos excepcionales, 
        notificando al cliente oportunamente.
      </p>

      <h3 className="text-xl font-semibold mb-2">3. Devoluciones y Cambios</h3>
      <p className="mb-4">
        Los usuarios pueden solicitar devoluciones o cambios dentro de los primeros
        15 días hábiles tras la entrega del producto. Las condiciones específicas
        se detallan en la sección de “Devoluciones” del sitio.
      </p>

      <h3 className="text-xl font-semibold mb-2">4. Responsabilidades</h3>
      <p className="mb-4">
        <strong>Punto Shein</strong> no se hace responsable por daños, pérdidas o 
        perjuicios derivados del uso inadecuado de la plataforma. Hacemos todo lo 
        posible por asegurar la disponibilidad y funcionalidad del servicio.
      </p>

      <h3 className="text-xl font-semibold mb-2">5. Modificaciones de los Términos</h3>
      <p className="mb-4">
        Nos reservamos el derecho de modificar estos términos en cualquier momento, 
        publicando la nueva versión en el sitio web. El uso continuo de la plataforma
        tras la modificación implica la aceptación de las modificaciones.
      </p>

      <p className="mt-6">
        Si tienes preguntas sobre estos términos, contáctanos en:{" "}
        <em>terminos@puntoshein.com</em>.
      </p>
    </div>
  );
};

export default Terminos;
