// src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Skeleton from "./components/Skeleton";

// Layouts
import Layout from "./components/home/Layout";         // Layout general
import LayoutVacio from "./components/home/LayoutVacio";
import LayoutGeneral from "./components/home/LayoutGeneral";

// Rutas protegidas
import ProteccionRutas from "./utils/ProteccionRutas";
import AdminRoutes from "./routes/AdminRoutes";
import UsuarioRoutes from "./routes/UsuarioRoutes";
import EmpleadoRoutes from "./routes/EmpleadoRoutes";
import ErrorRoutes from "./routes/ErrorRoutes";

// Lazy loaded pages
const WelcomePage = lazy(() => import("./welcome/WelcomePage"));
const Login = lazy(() => import("./pages/Login"));
const Registro = lazy(() => import("./pages/Registro"));
const CerrarSesion = lazy(() => import("./pages/CerrarSesion"));
const RecuperarPassword = lazy(() => import("./pages/RecuperarPassword"));
const SolicitarPasswordTelefono = lazy(() => import("./pages/RecuperarPasswordTelefono"));
const VerificarTelefono = lazy(() => import("./pages/VerificarCodigoTelefono"));
const RestablecerTelefono = lazy(() => import("./pages/RestablecerPasswordTelefono"));
const OpcionRecuperarPassword = lazy(() => import("./pages/OpcionRecuperarPassword"));
const RestablecerPassword = lazy(() => import("./pages/RestablecerPassword"));

const AllProductos = lazy(() => import("./components/productos/AllProductos"));
const DetalleProducto = lazy(() => import("./components/productos/DetalleProducto"));
const BuscarProductos = lazy(() => import("./components/productos/BuscarProductos"));
const ProductosFiltrados = lazy(() => import("./components/productos/ProductosFiltrados"));
const AgregarProducto = lazy(() => import("./components/cart/Agregar"));
const Carrito = lazy(() => import("./components/cart/Carrito"));
const AutenticacionRequerida = lazy(() => import("./components/cart/Autenticacion"));

const AcercaDe = lazy(() => import("./components/empresa/AcercaDe"));
const PoliticaPrivacidad = lazy(() => import("./components/empresa/PoliticaPrivacidad"));
const Terminos = lazy(() => import("./components/empresa/Terminos"));
const DeslindeLegal = lazy(() => import("./components/empresa/DeslindeLegal"));
const Contacto = lazy(() => import("./components/empresa/Contacto"));
const Ayuda = lazy(() => import("./components/empresa/Ayuda"));
const MapaSitio = lazy(() => import("./components/empresa/MapaSitio"));
const PreguntasFrecuentesAll = lazy(() => import("./components/empresa/PreguntasFrecuentes"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<Skeleton />}>
        <Routes>

          {/* Layout vacío para página de bienvenida */}
          <Route element={<LayoutVacio />}>
            <Route path="/" element={<WelcomePage />} />
          </Route>

            {/* Layout vacío para autenticación (sin encabezado/pie general) */}
          <Route element={<LayoutVacio />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/cerrar-sesion" element={<CerrarSesion />} />
            <Route path="/recuperarPassword" element={<RecuperarPassword />} />
            <Route path="/solicitarPasswordTelefono" element={<SolicitarPasswordTelefono />} />
            <Route path="/verificarTelefono" element={<VerificarTelefono />} />
            <Route path="/restablecerPasswordTelefono" element={<RestablecerTelefono />} />
            <Route path="/opcionRestablecimiento" element={<OpcionRecuperarPassword />} />
            <Route path="/restablecerPassword" element={<RestablecerPassword />} />
          </Route>

          <Route element={<LayoutGeneral />}>
             {/* Empresa */}
             <Route path="/acercaDe" element={<AcercaDe />} />
            <Route path="/privacidad" element={<PoliticaPrivacidad />} />
            <Route path="/terminos" element={<Terminos />} />
            <Route path="/deslindeLegal" element={<DeslindeLegal />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/ayuda" element={<Ayuda />} />
            <Route path="/mapa-del-sitio" element={<MapaSitio />} />
            <Route path="/preguntasFrecuentes" element={<PreguntasFrecuentesAll />} />
          </Route>


          {/* Layout general para el resto del sitio */}
          <Route element={<Layout />}>

            {/* Productos */}
            <Route path="/productos" element={<AllProductos />} />
            <Route path="/producto/:id" element={<DetalleProducto />} />
            <Route path="/buscar" element={<BuscarProductos />} />
            <Route path="/productos/filtrados" element={<ProductosFiltrados />} />
            <Route path="/productos/agregar" element={<ProteccionRutas element={AgregarProducto} allowedRoles={["usuario"]} />} />
            <Route path="/productos/Carrito" element={<ProteccionRutas element={Carrito} allowedRoles={["usuario"]} />} />
            <Route path="/autenticacion-requerida" element={<AutenticacionRequerida />} />

           

            {/* Rutas protegidas */}
            {AdminRoutes}
            {EmpleadoRoutes}
            {UsuarioRoutes}
          </Route>

          {/* Rutas de error (404, 500, etc) */}
          {ErrorRoutes}

        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
