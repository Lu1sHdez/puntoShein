// src/routes/AdminRoutes.js
import React, { lazy } from "react";
import { Route } from "react-router-dom";
import ProteccionRutas from "../utils/ProteccionRutas";

// Lazy imports
const DashboardAdmin = lazy(() => import("../admin/dashboard/Dashboard"));
const SidebarAdmin = lazy(() => import("../admin/sidebar/Sidebar"));
const Empresa = lazy(() => import("../admin/empresa/Empresa"));
const Usuarios = lazy(() => import("../admin/usuarios/Usuarios"));
const UsuarioDetalles = lazy(() => import("../admin/usuarios/UsuarioDetalles"));
const Empleados = lazy(() => import("../admin/empleados/Empleados"));
const Productos = lazy(() => import("../admin/productos/Productos"));
const DetalleProductos = lazy(() => import("../admin/productos/DetalleProducto"));
const ActualizarEmpresa = lazy(() => import("../admin/empresa/ActualizarEmpresa"));
const PerfilAdmin = lazy(() => import("../admin/perfil/Perfil"));
const ActualizarPerfilAdmin = lazy(() => import("../admin/perfil/ActualizarPerfil"));
const Configuracion = lazy(() => import("../admin/setting/Configuracion"));
const CrearProducto = lazy(() => import("../admin/productos/crearProducto/CrearProducto"));
const EditarProducto = lazy(() => import("../admin/productos/editarProducto/EditarProducto"));
const PinInicioRapido = lazy(() => import("../admin/pin/pinInicioRapido"));
const PreguntasFrecuentes = lazy(() => import("../admin/empresa/preguntasFrecuentes/PreguntasFrecuentes"));
const GestionProductos = lazy(() => import("../admin/productos/analisis/AnalisisVentas"));

const AdminRoutes = () => (
  <>
    <Route path="/admin/dashboard" element={<ProteccionRutas element={DashboardAdmin} allowedRoles={["administrador"]} />} />
    <Route path="/admin/sidebar" element={<ProteccionRutas element={SidebarAdmin} allowedRoles={["administrador"]} />} />
    <Route path="/admin/empresa" element={<ProteccionRutas element={Empresa} allowedRoles={["administrador"]} />} />
    <Route path="/admin/perfil" element={<ProteccionRutas element={PerfilAdmin} allowedRoles={["administrador"]} />} />
    <Route path="/admin/actualizarPerfil" element={<ProteccionRutas element={ActualizarPerfilAdmin} allowedRoles={["administrador"]} />} />
    <Route path="/admin/configuracion" element={<ProteccionRutas element={Configuracion} allowedRoles={["administrador"]} />} />
    <Route path="/admin/usuarios" element={<ProteccionRutas element={Usuarios} allowedRoles={["administrador"]} />} />
    <Route path="/admin/usuarios/:id" element={<ProteccionRutas element={UsuarioDetalles} allowedRoles={["administrador"]} />} />
    <Route path="/admin/empleados" element={<ProteccionRutas element={Empleados} allowedRoles={["administrador"]} />} />
    <Route path="/admin/productos" element={<ProteccionRutas element={Productos} allowedRoles={["administrador"]} />} />
    <Route path="/admin/gestionProductos" element={<ProteccionRutas element={GestionProductos} allowedRoles={["administrador"]} />} />
    <Route path="/admin/productos/detalle/:id" element={<ProteccionRutas element={DetalleProductos} allowedRoles={["administrador"]} />} />
    <Route path="/admin/empresa/actualizar" element={<ProteccionRutas element={ActualizarEmpresa} allowedRoles={["administrador"]} />} />
    <Route path="/admin/productos/crear" element={<ProteccionRutas element={CrearProducto} allowedRoles={["administrador"]} />} />
    <Route path="/admin/productos/editar/:id" element={<ProteccionRutas element={EditarProducto} allowedRoles={["administrador"]} />} />
    <Route path="/admin/inicio-rapido" element={<ProteccionRutas element={PinInicioRapido} allowedRoles={["administrador"]} />} />
    <Route path="/admin/preguntasFrecuentes" element={<ProteccionRutas element={PreguntasFrecuentes} allowedRoles={["administrador"]} />} />
  </>
);

export default AdminRoutes;
