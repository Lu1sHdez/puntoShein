// src/components/Breadcrumbs.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
// Opcional: Para ícono de flecha
import { FaChevronRight } from "react-icons/fa";

const Breadcrumbs = () => {
  const location = useLocation();
  // Segmentos de la URL, ignorando la barra inicial
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <nav
      aria-label="breadcrumb"
      className="bg-white shadow-sm py-3 mb-4"
    >
      <div className="container mx-auto px-4">
        <ol className="flex flex-wrap items-center justify-center text-rem text-gray-700 space-x-2">
          {/* Link a la página de inicio */}
          <li className="flex items-center">
            <Link
              to="/"
              className="px-2 py-1 rounded hover:bg-blue-50 text-blue-600 transition"
            >
              Inicio
            </Link>
          </li>

          {pathnames.map((segment, index) => {
            const to = `/${pathnames.slice(0, index + 1).join("/")}`;
            const isLast = index === pathnames.length - 1;

            return (
              <React.Fragment key={index}>
                {/* Separador con ícono de flecha */}
                <li className="text-gray-400">
                  <FaChevronRight size={12} />
                </li>

                {/* Segmento actual o link clicable */}
                <li className="flex items-center">
                  {isLast ? (
                    <span className="px-2 py-1 rounded bg-blue-50 text-blue-700 capitalize">
                      {segment}
                    </span>
                  ) : (
                    <Link
                      to={to}
                      className="px-2 py-1 rounded hover:bg-blue-50 text-blue-600 transition capitalize"
                    >
                      {segment}
                    </Link>
                  )}
                </li>
              </React.Fragment>
            );
          })}
        </ol>
      </div>
    </nav>
  );
};

export default Breadcrumbs;
