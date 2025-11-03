import { Link } from "react-router-dom";

const AccionesProducto = ({ handleAgregarCarrito }) => (
  <div className="mt-6 flex flex-col gap-3 animate-fade-in-up">
    <button
      onClick={handleAgregarCarrito}
      className="btn-principal w-full py-3 text-base shadow hover:shadow-lg transition-transform hover:scale-[1.02]"
    >
      Agregar al carrito
    </button>

    <button
      className="btn-secundario w-full py-3 text-base opacity-70 cursor-not-allowed"
      disabled
    >
      Continuar con la compra
    </button>

    <Link
      to="/cuerpo"
      className="text-sm text-blue-600 hover:underline text-center mt-3 transition-colors"
    >
      Volver a productos
    </Link>
  </div>
);

export default AccionesProducto;
