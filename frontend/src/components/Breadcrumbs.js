// src/components/Breadcrumbs.js
import React from "react";
import { Link, useLocation } from "react-router-dom";

const Breadcrumbs = () => {
  const location = useLocation();
  // Separa la URL en segmentos
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav
      // max-w-lg: ancho máximo para que no se extienda demasiado
      // mx-auto: centra horizontalmente
      // mt-4: margen superior para ubicarlo a la altura deseada
      // py-2: reduce el espacio vertical interno
      className="max-w-lg mx-auto mt-9 px-4 py-2 
                 flex items-center justify-start 
                 text-gray-700 border border-gray-200 
                 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
        {/* Segmento HOME */}
        <li className="inline-flex items-center">
          <Link
            to="/"
            className="inline-flex items-center text-sm font-medium text-gray-700 
                       hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
          >
            {/* Ícono Home */}
            <svg
              className="w-3 h-3 me-2.5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
            </svg>
            Home
          </Link>
        </li>

        {/* Segmentos dinámicos */}
        {pathnames.map((segment, index) => {
          const to = `/${pathnames.slice(0, index + 1).join("/")}`;
          const isLast = index === pathnames.length - 1;

          return (
            <li key={index} aria-current={isLast ? "page" : undefined}>
              <div className="flex items-center">
                {/* Flecha separadora */}
                <svg
                  className="rtl:rotate-180 w-3 h-3 mx-1 text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>

                {isLast ? (
                  // Último segmento
                  <span className="ms-1 text-sm font-medium text-gray-500 md:ms-2 dark:text-gray-400 capitalize">
                    {segment}
                  </span>
                ) : (
                  // Enlace intermedio
                  <Link
                    to={to}
                    className="ms-1 text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 
                               dark:text-gray-400 dark:hover:text-white capitalize"
                  >
                    {segment}
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
