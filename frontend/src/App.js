// src/App.js
import './index.css'  // <--- importante
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Skeleton from "./components/Skeleton";
import {verificarExpToken} from "./context/verificarExpToken";

// Layouts
import Layout from "./components/home/Layout";         // Layout general
import LayoutVacio from "./components/home/LayoutVacio";
import LayoutGeneral from "./components/home/LayoutGeneral";
import LayoutAdmin from "./admin/secciones/LayoutAdmin.js";
import LayoutUsuario from "./usuario/secciones/LayoutUsuario.js";
import LayoutPublico from "./public/layout/layout.js";

// Rutas protegidas
import ProteccionRutas from "./utils/ProteccionRutas";
import ErrorRoutes from "./routes/ErrorRoutes";

//publico
const CuerpoPrincipal = lazy(() => import("./public/cuerpo/cuerpo"));


// Lazy imports
const DashboardAdmin = lazy(() => import("./admin/dashboard/Dashboard"));
const SidebarAdmin = lazy(() => import("./admin/sidebar/Sidebar"));
const Empresa = lazy(() => import("./admin/empresa/Empresa"));
const Usuarios = lazy(() => import("./admin/usuarios/Usuarios"));
const Empleados = lazy(() => import("./admin/empleados/Empleados"));
const Productos = lazy(() => import("./admin/productos/Productos"));
const PerfilAdmin = lazy(() => import("./admin/perfil/Perfil"));
const ActualizarPerfilAdmin = lazy(() => import("./admin/perfil/ActualizarPerfil"));
const Configuracion = lazy(() => import("./admin/setting/Configuracion"));
const PinInicioRapido = lazy(() => import("./admin/pin/pinInicioRapido"));
const PreguntasFrecuentes = lazy(() => import("./admin/empresa/preguntasFrecuentes/PreguntasFrecuentes"));
const GestionProductos = lazy(() => import("./admin/productos/analisis/AnalisisVentas"));

// Componentes con Lazy Loading
const DashboardUsuario = lazy(() => import("./usuario/dashboard/Dashboard.js"));
const Pedidos = lazy(() => import("./usuario/pedidos/pedidos.js"));
const PerfilUsuario = lazy(() => import("./usuario/perfil/Perfil.js"));
const MiCarrito = lazy(() => import("./usuario/cart/carrito.js"));
const ActualizarPerfilUsuario = lazy(() => import("./usuario/perfil/ActualizarPerfil.js"));
const Pago = lazy(() => import("./components/store/compra/pago.js"));
const ProductosA = lazy(() => import("./components/cart/Agregar.js"));


// Lazy loaded pages
const WelcomePage = lazy(() => import("./welcome/WelcomePage"));
const WelcomeAnimacion = lazy(() => import("./welcome/WelcomeAnimacion"));

const Login = lazy(() => import("./pages/Login"));
const Registro = lazy(() => import("./pages/Registro"));
const CerrarSesion = lazy(() => import("./pages/CerrarSesion"));
const Logout = lazy(() => import("./pages/Logout"));
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
  verificarExpToken(); 
  return (
    <Router>
      <Suspense fallback={<Skeleton />}>
        <Routes>
          {/* Layout especial para productos públicos (catálogo sin autenticación) */}
          <Route element={<LayoutPublico />}>
            <Route path="/cuerpo" element={<CuerpoPrincipal />} />
          </Route>


          {/* Layout vacío para página de bienvenida con animacion*/}
          <Route element={<LayoutVacio />}>
            <Route path="/" element={<WelcomeAnimacion />} />
          </Route>

          {/* Layout vacío para página de bienvenida */}
          <Route element={<LayoutVacio />}>
            <Route path="/inicio" element={<WelcomePage />} />
          </Route>

            {/* Layout vacío para autenticación (sin encabezado/pie general) */}
          <Route element={<LayoutVacio />}>
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Registro />} />
            <Route path="/cerrar-sesion" element={<CerrarSesion />} />
            <Route path="/logout" element={<Logout />} />
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
            <Route path="/checkout/pago" element={<ProteccionRutas element={Pago} allowedRoles={["usuario"]} />}/>
            <Route path="/productos/agregar"element={<ProteccionRutas element={ProductosA} allowedRoles={["usuario"]} />}/>
            <Route path="/productos/carrito"element={<ProteccionRutas element={Carrito} allowedRoles={["usuario"]} />}/>

          </Route>
          <Route element = {<LayoutAdmin/>}>

            <Route path="/admin/dashboard" element={<ProteccionRutas element={DashboardAdmin} allowedRoles={["administrador"]} />} />
            <Route path="/admin/sidebar" element={<ProteccionRutas element={SidebarAdmin} allowedRoles={["administrador"]} />} />
            <Route path="/admin/empresa" element={<ProteccionRutas element={Empresa} allowedRoles={["administrador"]} />} />
            <Route path="/admin/perfil" element={<ProteccionRutas element={PerfilAdmin} allowedRoles={["administrador"]} />} />
            <Route path="/admin/actualizarPerfil" element={<ProteccionRutas element={ActualizarPerfilAdmin} allowedRoles={["administrador"]} />} />
            <Route path="/admin/configuracion" element={<ProteccionRutas element={Configuracion} allowedRoles={["administrador"]} />} />
            <Route path="/admin/usuarios" element={<ProteccionRutas element={Usuarios} allowedRoles={["administrador"]} />} />
            <Route path="/admin/empleados" element={<ProteccionRutas element={Empleados} allowedRoles={["administrador"]} />} />
            <Route path="/admin/productos" element={<ProteccionRutas element={Productos} allowedRoles={["administrador"]} />} />
            <Route path="/admin/gestionProductos" element={<ProteccionRutas element={GestionProductos} allowedRoles={["administrador"]} />} />
            <Route path="/admin/inicio-rapido" element={<ProteccionRutas element={PinInicioRapido} allowedRoles={["administrador"]} />} />
            <Route path="/admin/preguntasFrecuentes" element={<ProteccionRutas element={PreguntasFrecuentes} allowedRoles={["administrador"]} />} />
          </Route>

          <Route element = {<LayoutUsuario/>}>
            <Route path="/usuario/carrito" element={<ProteccionRutas element={MiCarrito} allowedRoles={["usuario"]} />} />
            <Route path="/usuario/dashboard" element={<ProteccionRutas element={DashboardUsuario} allowedRoles={["usuario"]} />}/>
            <Route path="/usuario/perfil" element={<ProteccionRutas element={PerfilUsuario} allowedRoles={["usuario"]} />}/>
            <Route path="/usuario/pedidos" element={<ProteccionRutas element={Pedidos} allowedRoles={["usuario"]} />}/>            
            <Route path="/usuario/actualizarPerfil" element={<ProteccionRutas element={ActualizarPerfilUsuario} allowedRoles={["usuario"]} />}/>
            <Route path="/checkout/pago"element={<ProteccionRutas element={Pago} allowedRoles={["usuario"]} />}/>
            <Route path="/productos/agregar" element={<ProteccionRutas element={ProductosA} allowedRoles={["usuario"]} />} />

          </Route>  
          {ErrorRoutes}

        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
