import { Link } from "react-router-dom";
import { useState } from "react";


export const ProductosGrid = ({ productos }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosPagina = productos.slice(indiceInicio, indiceInicio + productosPorPagina);
  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
        {productosPagina.map((producto, index) => (
          <Link
            to={`/producto/${producto.id}`}
            aria-label={`Ver detalles del producto ${producto.nombre}`}
            key={producto.id}
            className="bg-white hover:bg-blue-100 rounded-lg shadow-md hover:shadow-2xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out overflow-hidden flex flex-col animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms`, animationFillMode: "both" }}
          >
            <div className="aspect-[4/5] w-full overflow-hidden">
              <img
                src={producto.imagen}
                alt={`Imagen de ${producto.nombre}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out hover:scale-105"
              />
            </div>
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-base font-semibold text-gray-800 truncate">{producto.nombre}</h3>
              <p className="text-sm text-gray-500 line-clamp-2">{producto.descripcion}</p>
              <div className="mt-auto text-sm space-y-1">
                <p className="text-gray-700 font-medium">
                  A solo: <span className="text-green-600 font-bold">${producto.precio}</span>
                </p>
                <p className="text-gray-600">Color: <span className="capitalize">{producto.color}</span></p>
                <p className="text-gray-500 italic">{producto?.subcategoria?.nombre}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
          disabled={paginaActual === 1}
          className="btn-small"
        >
          Anterior
        </button>

        {[...Array(totalPaginas)].map((_, index) => (
          <button
            key={index}
            onClick={() => setPaginaActual(index + 1)}
            className={`btn-small ${paginaActual === index + 1 ? "bg-blue-600 text-white" : ""}`}
          >
            {index + 1}
          </button>
        ))}

        <button
          onClick={() => setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))}
          disabled={paginaActual === totalPaginas}
          className="btn-small"
        >
          Siguiente
        </button>
      </div>
    </>
  );
};

export default ProductosGrid;

