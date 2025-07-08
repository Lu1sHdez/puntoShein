// src/routes/EmpleadoRoutes.js
import React, { lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import ProteccionRutas from "../utils/ProteccionRutas";
import Skeleton from "../components/Skeleton";

// Rutas con lazy loading
const DashboardEmpleado = lazy(() => import("../empleado/dashboard/Dashboard.js"));
const ConfiguracionEmpleado = lazy(() => import("../empleado/setting/Configuracion.js"));
const PerfilEmpleado = lazy(() => import("../empleado/perfil/Perfil.js"));
const ActualizarPerfilEmpleado = lazy(() => import("../empleado/perfil/ActualizarPerfil.js"));

const EmpleadoRoutes = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <>
        <Route
          path="/empleado/dashboard"
          element={<ProteccionRutas element={DashboardEmpleado} allowedRoles={["empleado"]} />}
        />
        <Route
          path="/empleado/configuracion"
          element={<ProteccionRutas element={ConfiguracionEmpleado} allowedRoles={["empleado"]} />}
        />
        <Route
          path="/empleado/perfil"
          element={<ProteccionRutas element={PerfilEmpleado} allowedRoles={["empleado"]} />}
        />
        <Route
          path="/empleado/actualizarPerfil"
          element={<ProteccionRutas element={ActualizarPerfilEmpleado} allowedRoles={["empleado"]} />}
        />
      </>
    </Suspense>
  );
};

export default EmpleadoRoutes;
