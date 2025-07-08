// src/routes/ErrorRoutes.js
import React, { lazy } from "react";
import { Route } from "react-router-dom";

// Lazy loading de los errores
const Error400 = lazy(() => import("../components/error/Error400"));
const Error404 = lazy(() => import("../components/error/Error404"));
const Error500 = lazy(() => import("../components/error/Error500"));

const ErrorRoutes = [
  // Estas rutas NO usan Layout, por eso no van dentro del Layout principal
  <Route key="error400" path="/error400" element={<Error400 />} />,
  <Route key="error500" path="/error500" element={<Error500 />} />,
  <Route key="error404" path="/error404" element={<Error404 />} />,
  <Route key="wildcard" path="*" element={<Error404 />} />,
];

export default ErrorRoutes;
