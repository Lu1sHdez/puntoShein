import React from "react";
import { Link, useLocation } from "react-router-dom";
import nombresRutas from "../../utils/nombresRutas";
import rutasExcluir from "../../utils/rutasExcluir"; // Importa las rutas a excluir


const Breadcrumbs = ({ producto }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const excluirRutas = (segment) => rutasExcluir.includes(segment);

  return (
    <nav className="mt-9 px-6 py-2 flex items-center justify-start space-x-2 max-w-screen-sm text-black" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-2">
        {/* Home */}
        <li className="inline-flex items-center">
          <Link to="/" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-white-600 dark:text-gray-600 dark:hover:text-black">
            <svg className="w-3 h-3 me-2.5" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z"/>
            </svg>
            Home
          </Link>
        </li>

        {/* Si hay producto, mostrar categoría y subcategoría */}
        {producto && producto.subcategoria && producto.subcategoria.categoria && (
          <>
            <li className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-600" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <Link to={`/categoria/${producto.subcategoria.categoria.id}`} className="text-sm font-normal text-gray-600 dark:hover:text-black">
                {producto.subcategoria.categoria.nombre}
              </Link>
            </li>

            <li className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-600" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <Link to={`/subcategoria/${producto.subcategoria.id}`} className="text-sm font-normal text-gray-600 dark:hover:text-black">
                {producto.subcategoria.nombre}
              </Link>
            </li>

            <li className="flex items-center">
              <svg className="w-3 h-3 mx-1 text-gray-600" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
              </svg>
              <span className="text-sm font-normal text-gray-600">{producto.nombre}</span>
            </li>
          </>
        )}

        {/* Segmentos dinámicos si no hay producto */}
        {!producto && pathnames.map((segment, index) => {

          // Omite la parte "admin", "empleado", etc. en los breadcrumbs
          if (excluirRutas(segment)) return null;

          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;
          const nombreVisible = nombresRutas[segment] || segment.charAt(0).toUpperCase() + segment.slice(1);

          return (
            <li key={index} aria-current={isLast ? "page" : undefined}>
              <div className="flex items-center">
                <svg className="w-3 h-3 mx-1 text-gray-600" aria-hidden="true" fill="none" viewBox="0 0 6 10">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                </svg>

                {isLast ? (
                  <span className="text-sm font-normal text-gray-600">{nombreVisible}</span>
                ) : (
                  <Link to={to} className="text-sm font-medium text-gray-700 dark:hover:text-black capitalize">
                    {nombreVisible}
                  </Link>
                )}
              </div>
            </li>
          );
        })}
      </ol>
    </nav>
          
  );
};

export default Breadcrumbs;
