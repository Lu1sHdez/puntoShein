// src/routes/UsuarioRoutes.js
import React, { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import ProteccionRutas from "../utils/ProteccionRutas";
import Skeleton from "../components/Skeleton";

// Componentes con Lazy Loading
const DashboardUsuario = lazy(() => import("../usuario/dashboard/Dashboard.js"));
const PerfilUsuario = lazy(() => import("../usuario/perfil/Perfil.js"));
const ActualizarPerfilUsuario = lazy(() => import("../usuario/perfil/ActualizarPerfil.js"));
const Pago = lazy(() => import("../components/store/compra/pago.js"));
const ProductosA = lazy(() => import("../components/cart/Agregar.js"));
const Carrito = lazy(() => import("../components/cart/Carrito.js"));

const UsuarioRoutes = () => {
  return (
    <Suspense fallback={<Skeleton />}>
      <Routes>
        <Route
          path="/usuario/dashboard"
          element={<ProteccionRutas element={DashboardUsuario} allowedRoles={["usuario"]} />}
        />
        <Route
          path="/usuario/perfil"
          element={<ProteccionRutas element={PerfilUsuario} allowedRoles={["usuario"]} />}
        />
        <Route
          path="/usuario/actualizarPerfil"
          element={<ProteccionRutas element={ActualizarPerfilUsuario} allowedRoles={["usuario"]} />}
        />
        <Route
          path="/checkout/pago"
          element={<ProteccionRutas element={Pago} allowedRoles={["usuario"]} />}
        />
        <Route
          path="/productos/agregar"
          element={<ProteccionRutas element={ProductosA} allowedRoles={["usuario"]} />}
        />
        <Route
          path="/productos/carrito"
          element={<ProteccionRutas element={Carrito} allowedRoles={["usuario"]} />}
        />
      </Routes>
    </Suspense>
  );
};

export default UsuarioRoutes;