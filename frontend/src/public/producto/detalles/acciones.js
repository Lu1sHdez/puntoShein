import { Link } from "react-router-dom";

const AccionesProducto = ({ handleAgregarCarrito }) => (
  <div className="mt-6 flex flex-col gap-3">
    <button className="btn-principal" onClick={handleAgregarCarrito}>
      Agregar al carrito
    </button>
    <button className="btn-secundario" disabled>
      Continuar con la compra
    </button>
    <Link
      to="/cuerpo"
      className="text-sm text-blue-600 hover:underline text-center mt-2"
    >
      ← Volver a productos
    </Link>
  </div>
);

export default AccionesProducto;
