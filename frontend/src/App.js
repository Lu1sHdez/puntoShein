// src/App.js
import './index.css'  // <--- importante
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Skeleton from "./components/Skeleton";
import {verificarExpToken} from "./context/verificarExpToken";

import LayoutVacio from "./layout/LayoutVacio";
import LayoutGeneral from "./layout/LayoutGeneral";
import LayoutSimple from "./layout/LayoutSimple";
import LayoutAdmin from "./layout/LayoutAdmin.js";
import LayoutUsuario from "./layout/LayoutUsuario.js";
import LayoutPublico from "./public/layout/layout.js";
import { CartProvider } from "./context/CartContext";
import InstalarPWA from './InstalarPWA.js';
// Rutas protegidas
import ProteccionRutas from "./utils/ProteccionRutas";
import ErrorRoutes from "./routes/ErrorRoutes";

const WelcomePage = lazy(() => import("./welcome/WelcomePage"));

//publico
const CuerpoPrincipal = lazy(() => import("./public/cuerpo/cuerpo"));
const ProductoDetalle = lazy(() => import("./public/producto/detalles/detalle.js"));

// Lazy imports
const DashboardAdmin = lazy(() => import("./admin/dashboard/Dashboard"));
const SidebarAdmin = lazy(() => import("./admin/sidebar/Sidebar"));
const Empresa = lazy(() => import("./admin/empresa/Empresa"));
const Usuarios = lazy(() => import("./admin/usuarios/Usuarios"));
const Empleados = lazy(() => import("./admin/empleados/principal"));
const Productos = lazy(() => import("./admin/productos/Productos"));
const Demanda = lazy(() => import("./admin/Modelo/Demanda"));
const PerfilAdmin = lazy(() => import("./admin/perfil/Perfil"));
const ActualizarPerfilAdmin = lazy(() => import("./admin/perfil/ActualizarPerfil"));
const Configuracion = lazy(() => import("./admin/setting/Configuracion"));
const PinInicioRapido = lazy(() => import("./admin/pin/pinInicioRapido"));
const PreguntasFrecuentes = lazy(() => import("./admin/empresa/preguntasFrecuentes/PreguntasFrecuentes"));
const GestionProductos = lazy(() => import("./admin/productos/analisis/AnalisisVentas"));
const OpinionesPublico = lazy(() => import("./admin/opiniones/opiniones"));

// Componentes con Lazy Loading
const DashboardUsuario = lazy(() => import("./usuario/dashboard/Dashboard.js"));
const Pedidos = lazy(() => import("./usuario/pedidos/pedidos.js"));
const PerfilUsuario = lazy(() => import("./usuario/perfil/Perfil.js"));
const ActualizarPerfilUsuario = lazy(() => import("./usuario/perfil/ActualizarPerfil.js"));
const ProductosA = lazy(() => import("./components/cart/Agregar.js"));

// Lazy loaded pages
const Login = lazy(() => import("./pages/Login"));
const Registro = lazy(() => import("./pages/registro/Registro"));
const RegistroEmpleado = lazy(() => import("./pages/registro/registroEmpleado.js"));

const CerrarSesion = lazy(() => import("./pages/CerrarSesion"));
const Logout = lazy(() => import("./pages/Logout"));
const RecuperarPassword = lazy(() => import("./pages/RecuperarPassword"));
const SolicitarPasswordTelefono = lazy(() => import("./pages/RecuperarPasswordTelefono"));
const VerificarTelefono = lazy(() => import("./pages/VerificarCodigoTelefono"));
const RestablecerTelefono = lazy(() => import("./pages/RestablecerPasswordTelefono"));
const OpcionRecuperarPassword = lazy(() => import("./pages/OpcionRecuperarPassword"));
const RestablecerPassword = lazy(() => import("./pages/RestablecerPassword"));
const Carrito = lazy(() => import("./public/carrito/PrincipalCarrito.js"));
const Pago = lazy(() => import("./public/pagos/pago.js"));


const Documentos = lazy(() => import("./admin/documents/documentos"));

const AcercaDe = lazy(() => import("./components/empresa/AcercaDe"));
const PoliticaPrivacidad = lazy(() => import("./components/empresa/PoliticaPrivacidad"));
const Terminos = lazy(() => import("./components/empresa/Terminos"));
const DeslindeLegal = lazy(() => import("./components/empresa/DeslindeLegal"));
const Contacto = lazy(() => import("./components/empresa/Contacto.js"));

const MapaSitio = lazy(() => import("./components/empresa/MapaSitio"));
const PreguntasFrecuentesAll = lazy(() => import("./components/empresa/PreguntasFrecuentes"));

const App = () => {
  verificarExpToken(); 
  return (
    <CartProvider>
    <Router>
      <Suspense fallback={<Skeleton />}>
        
        <Routes>

          <Route element={<LayoutSimple/>}>
            <Route path="/" element={<WelcomePage />} />
          </Route>
          {/* Layout especial para productos públicos (catálogo sin autenticación) */}
          <Route element={<LayoutPublico />}>
            <Route path="/cuerpo" element={<CuerpoPrincipal />} />
            <Route path="/usuario/carrito" element={<ProteccionRutas element={Carrito} allowedRoles={["usuario"]} />} />
            <Route path="/productos/carrito"element={<ProteccionRutas element={Carrito} allowedRoles={["usuario"]} />}/>
            <Route path="/producto/:nombreSlug" element={<ProductoDetalle />} />
          </Route>

            {/* Layout vacío para autenticación (sin encabezado/pie general) */}
          <Route element={<LayoutVacio />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/registro/e" element={<RegistroEmpleado />} />
            <Route path="/cerrar-sesion" element={<CerrarSesion />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/recuperarPassword" element={<RecuperarPassword />} />
            <Route path="/solicitarPasswordTelefono" element={<SolicitarPasswordTelefono />} />
            <Route path="/verificarTelefono" element={<VerificarTelefono />} />
            <Route path="/restablecerPasswordTelefono" element={<RestablecerTelefono />} />
            <Route path="/opcionRestablecimiento" element={<OpcionRecuperarPassword />} />
            <Route path="/restablecerPassword" element={<RestablecerPassword />} />
          </Route>

          <Route element={<LayoutVacio />}>
            <Route path="/usuario/pagos" element={<ProteccionRutas element={Pago} allowedRoles={["usuario"]} />}/>
          </Route>

          <Route element={<LayoutGeneral />}>
             {/* Empresa */}
              <Route path="/acercaDe" element={<AcercaDe />} /> 
              <Route path="/privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/deslindeLegal" element={<DeslindeLegal />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/mapa-del-sitio" element={<MapaSitio />} />
              <Route path="/preguntasFrecuentes" element={<PreguntasFrecuentesAll />} />
          </Route>

          <Route element = {<LayoutAdmin/>}>
            <Route path="/admin/opiniones" element={<ProteccionRutas element={OpinionesPublico} allowedRoles={["administrador"]} />} />
            <Route path="/admin/dashboard" element={<ProteccionRutas element={DashboardAdmin} allowedRoles={["administrador"]} />} />
            <Route path="/admin/sidebar" element={<ProteccionRutas element={SidebarAdmin} allowedRoles={["administrador"]} />} />
            <Route path="/admin/empresa" element={<ProteccionRutas element={Empresa} allowedRoles={["administrador"]} />} />
            <Route path="/admin/perfil" element={<ProteccionRutas element={PerfilAdmin} allowedRoles={["administrador"]} />} />
            <Route path="/admin/actualizarPerfil" element={<ProteccionRutas element={ActualizarPerfilAdmin} allowedRoles={["administrador"]} />} />
            <Route path="/admin/prediccion" element={<ProteccionRutas element={Demanda} allowedRoles={["administrador"]} />} />
            <Route path="/admin/documentos" element={<ProteccionRutas element={Documentos} allowedRoles={["administrador"]} />} />
            <Route path="/admin/configuracion" element={<ProteccionRutas element={Configuracion} allowedRoles={["administrador"]} />} />
            <Route path="/admin/usuarios" element={<ProteccionRutas element={Usuarios} allowedRoles={["administrador"]} />} />
            <Route path="/admin/empleados" element={<ProteccionRutas element={Empleados} allowedRoles={["administrador"]} />} />
            <Route path="/admin/productos" element={<ProteccionRutas element={Productos} allowedRoles={["administrador"]} />} />
            <Route path="/admin/gestionProductos" element={<ProteccionRutas element={GestionProductos} allowedRoles={["administrador"]} />} />
            <Route path="/admin/inicio-rapido" element={<ProteccionRutas element={PinInicioRapido} allowedRoles={["administrador"]} />} />
            <Route path="/admin/preguntasFrecuentes" element={<ProteccionRutas element={PreguntasFrecuentes} allowedRoles={["administrador"]} />} />
          </Route>

          <Route element = {<LayoutUsuario/>}>
            <Route path="/usuario/dashboard" element={<ProteccionRutas element={DashboardUsuario} allowedRoles={["usuario"]} />}/>
            <Route path="/usuario/perfil" element={<ProteccionRutas element={PerfilUsuario} allowedRoles={["usuario"]} />}/>
            <Route path="/usuario/pedidos" element={<ProteccionRutas element={Pedidos} allowedRoles={["usuario"]} />}/>            
            <Route path="/usuario/actualizarPerfil" element={<ProteccionRutas element={ActualizarPerfilUsuario} allowedRoles={["usuario"]} />}/>
            <Route path="/productos/agregar" element={<ProteccionRutas element={ProductosA} allowedRoles={["usuario"]} />} />
          </Route>  
          {ErrorRoutes}

        </Routes>
      </Suspense>
    </Router>
    <InstalarPWA />
    </CartProvider>
  );
};

export default App;
