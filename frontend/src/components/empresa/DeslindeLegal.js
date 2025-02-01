import React from "react";

const DeslindeLegal = () => {
  return (
    <div className="p-4 max-w-3xl mx-auto text-justify">
      <h2 className="text-2xl font-bold text-center mb-4">Deslinde Legal (Disclaimer)</h2>

      <p className="mb-4">
        Este texto de ejemplo establece un deslinde legal que explica las
        responsabilidades, garantías y limitaciones del servicio prestado por
        <strong> Punto Shein</strong>. Se informa al usuario que el uso de la
        plataforma implica la aceptación de los términos descritos.
      </p>

      <h3 className="text-xl font-semibold mb-2">Responsabilidades del Usuario</h3>
      <p className="mb-4">
        El usuario es responsable de la veracidad de la información que proporcione,
        así como de la seguridad de sus credenciales de acceso. El uso indebido
        de la plataforma puede derivar en la suspensión de la cuenta.
      </p>

      <h3 className="text-xl font-semibold mb-2">Limitaciones de Responsabilidad</h3>
      <p className="mb-4">
        <strong>Punto Shein</strong> no se hace responsable por interrupciones
        temporales del servicio, pérdidas de datos o daños causados por 
        terceros. Nos reservamos el derecho de suspender o discontinuar el servicio
        en cualquier momento sin previo aviso.
      </p>

      <h3 className="text-xl font-semibold mb-2">Propiedad Intelectual</h3>
      <p className="mb-4">
        Todo el contenido (imágenes, textos, logotipos) está protegido por derechos
        de autor u otras leyes de propiedad intelectual. El uso no autorizado
        puede derivar en acciones legales.
      </p>

      <p className="mt-6">
        Para más información o aclaraciones sobre este deslinde legal, 
        contáctanos en: <em>legal@puntoshein.com</em>.
      </p>
    </div>
  );
};

export default DeslindeLegal;
