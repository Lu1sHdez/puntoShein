import { Link } from "react-router-dom";
import { useState } from "react";
import { slugify } from "../../utils/slugify";

export const ProductosGrid = ({ productos }) => {
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;

  const totalPaginas = Math.ceil(productos.length / productosPorPagina);
  const indiceInicio = (paginaActual - 1) * productosPorPagina;
  const productosPagina = productos.slice(indiceInicio, indiceInicio + productosPorPagina);

  return (
    <>
      {/* Grid de productos */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5 2xl:grid-cols-6 gap-6 animate-fade-in-up"
      >
        {productosPagina.map((producto, index) => (
          <Link
            key={producto.id}
            to={`/producto/${slugify(producto.nombre)}`}
            aria-label={`Ver detalles del producto ${producto.nombre}`}
            className="group bg-white rounded-2xl shadow-md hover:shadow-2xl 
            transition-all duration-300 transform hover:-translate-y-2 
            overflow-hidden relative animate-fade-scale"
            style={{
              animationDelay: `${index * 60}ms`,
              animationFillMode: "both",
            }}
          >
            {/* Imagen con efecto hover */}
            <div className="relative aspect-square w-full overflow-hidden bg-gray-100">
              <img
                src={producto.imagen}
                alt={`Imagen de ${producto.nombre}`}
                className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                loading="lazy"
              />

              {/* Overlay suave al pasar el cursor */}
              <div className="absolute inset-0 bg-blue-600/0 group-hover:bg-blue-600/10 transition-all duration-300"></div>
            </div>

            {/* Contenido */}
            <div className="p-4 flex flex-col justify-between flex-1">
              <h3 className="text-base font-semibold text-gray-800 group-hover:text-blue-700 truncate transition-colors duration-300">
                {producto.nombre}
              </h3>

              <p className="text-sm text-gray-500 line-clamp-2 mt-1">
                {producto.descripcion}
              </p>

              <div className="mt-3 text-sm space-y-1">
                <p className="text-gray-700 font-medium">
                  Precio:{" "}
                  <span className="text-green-600 font-bold">
                    ${producto.precio}
                  </span>
                </p>
                <p className="text-gray-600">
                  Color: <span className="capitalize">{producto.color}</span>
                </p>

                {producto?.subcategoria && (
                  <p className="text-gray-500 italic text-xs">
                    {producto.subcategoria.nombre}
                  </p>
                )}
              </div>

              {/* Botón "Ver detalle" */}
              <div className="mt-4">
                <button
                  className="w-full btn-principal py-2 text-sm font-semibold shadow-md
                  hover:shadow-lg transition-all duration-300"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Paginación */}
      {totalPaginas > 1 && (
        <div className="flex justify-center items-center mt-8 gap-2 animate-fade-in-up">
          <button
            onClick={() => setPaginaActual((prev) => Math.max(prev - 1, 1))}
            disabled={paginaActual === 1}
            className={`btn-small ${
              paginaActual === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            Anterior
          </button>

          {[...Array(totalPaginas)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPaginaActual(index + 1)}
              className={`btn-small ${
                paginaActual === index + 1
                  ? "bg-blue-600 text-white font-semibold"
                  : "hover:bg-gray-300"
              }`}
            >
              {index + 1}
            </button>
          ))}

          <button
            onClick={() =>
              setPaginaActual((prev) => Math.min(prev + 1, totalPaginas))
            }
            disabled={paginaActual === totalPaginas}
            className={`btn-small ${
              paginaActual === totalPaginas
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
          >
            Siguiente
          </button>
        </div>
      )}
    </>
  );
};

export default ProductosGrid;
