import { Link } from "react-router-dom";

export const ProductosGrid = ({ productos }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-6">
      {productos.map((producto, index) => (
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
  );

export default ProductosGrid;