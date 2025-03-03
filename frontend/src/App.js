// src/App.js
import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container } from "@mui/material";
import Layout from "./components/home/Layout";
import ProteccionRutas from "./utils/ProteccionRutas.js"; // Importa ProteccionRutas
import Skeleton from "./components/Skeleton.js";

// Lazy Loading (Carga Diferida) para tus páginas principales
const DetalleProducto = lazy(() => import("./components/productos/DetalleProducto"));
const AllProductos = lazy(() => import("./components/productos/AllProductos"));
const BuscarProductos = lazy(() => import("./components/productos/BuscarProductos")); 
const ProductosFiltrados = lazy(() => import("./components/productos/ProductosFiltrados")); 

const Login = lazy(() => import("./pages/Login"));
const Registro = lazy(() => import("./pages/Registro"));
const RecuperarPassword = lazy(() => import("./pages/RecuperarPassword"));
const RestablecerPassword = lazy(() => import("./pages/RestablecerPassword"));
const CerrarSesion = lazy(() => import("./pages/CerrarSesion"));

//  Lazy Loading para páginas de tu carpeta "empresa"
const AcercaDe = lazy(() => import("./components/empresa/AcercaDe"));
const PreguntasFrecuentes = lazy(() =>
  import("./components/empresa/PreguntasFrecuentes")
);
const PoliticaPrivacidad = lazy(() =>
  import("./components/empresa/PoliticaPrivacidad")
);
//Documentos de la empresa
const Terminos = lazy(() => import("./components/empresa/Terminos"));
const DeslindeLegal = lazy(() => import("./components/empresa/DeslindeLegal"));
const Contacto = lazy(() => import("./components/empresa/Contacto"));
const Ayuda = lazy(() => import("./components/empresa/Ayuda"));
const MapaSitio = lazy(() => import("./components/empresa/MapaSitio"));


//Pagina Principal
const Cuerpo = lazy(() => import("./components/home/cuerpo/Cuerpo.js"));

// Páginas de error
const Error404 = lazy(() => import("./components/error/Error404"));
const Error500 = lazy(() => import("./components/error/Error500"));
const Error400 = lazy(() => import("./components/error/Error400"));

//perfil de usuario
const PerfilUsuario = lazy(() => import("./usuario/perfil/Perfil.js"));
const ActualizarPerfilUsuario = lazy(() => import("./usuario/perfil/ActualizarPerfil.js"));
const DashboardUsuario = lazy(() => import("./usuario/dashboard/Dashboard.js"));
const ProductosA = lazy(() => import("./usuario/cart/agregarCarrito.js"));
const Carrito= lazy(() =>  import ("./usuario/cart/Carrito.js"));


//Perfil admin
const DashboardAdmin = lazy(() => import("./admin/dashboard/Dashboard.js"));
const Empresa = lazy(() => import("./admin/empresa/Empresa.js"));
const Usuarios = lazy(() => import("./admin/usuarios/Usuarios.js"));
const UsuarioDetalles = lazy(() => import("./admin/usuarios/UsuarioDetalles.js"));  // Importa el nuevo componente
const Empleados = lazy(() => import("./admin/empleados/Empleados.js"));
const Productos = lazy(() => import("./admin/productos/Productos.js"));
const DetalleProductos = lazy(() => import("./admin/productos/DetalleProducto.js"));
const ActualizarEmpresa = lazy(() => import("./admin/empresa/ActualizarEmpresa.js"));
const PerfilAdmin = lazy(() => import("./admin/perfil/Perfil.js"));
const ActualizarPerfilAdmin = lazy(() => import("./admin/perfil/ActualizarPerfil.js"));
const Configuracion = lazy(() => import("./admin/setting/Configuracion.js"));
const CrearProducto = lazy(() => import("./admin/productos/crearProducto/CrearProducto.js"));
const EditarProducto = lazy(() => import ("./admin/productos/editarProducto/EditarProducto.js")); 



//Perfil Empleado
const DashboardEmpleado = lazy(() => import("./empleado/dashboard/Dashboard.js"));
const ConfiguracionEmpleado = lazy(() => import("./empleado/setting/Configuracion.js"));
const PerfilEmpleado = lazy(() => import("./empleado/perfil/Perfil.js"));
const ActualizarPerfilEmpleado = lazy(() => import("./empleado/perfil/ActualizarPerfil.js"));


const App = () => {
  return (
    <Router>
      <Layout>
        <Container>
          <Suspense fallback={<Skeleton/>}>
            <Routes>
              {/* Rutas existentes */}
              <Route path="/" element={<Cuerpo />} />
              <Route path="/productos" element={<AllProductos />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/recuperarPassword" element={<RecuperarPassword />} />
              <Route path="/restablecerPassword" element={<RestablecerPassword />} />
              <Route path="/cerrar-sesion" element={<CerrarSesion />} />

              {/* Nueva ruta para la búsqueda de productos */}
              <Route path="/buscar" element={<BuscarProductos />} />
              <Route path="/productos/filtrados" element={<ProductosFiltrados />} />
              <Route path="/producto/:id" element={<DetalleProducto />} />

              {/* Rutas de información de la empresa */}
              <Route path="/acercaDe" element={<AcercaDe />} />
              <Route path="/preguntasFrecuentes" element={<PreguntasFrecuentes />} />
              <Route path="/privacidad" element={<PoliticaPrivacidad />} />
              <Route path="/terminos" element={<Terminos />} />
              <Route path="/deslindeLegal" element={<DeslindeLegal />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/ayuda" element={<Ayuda />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/mapa-del-sitio" element={<MapaSitio />} />

              {/* Páginas de error */}
              <Route path="/error400" element={<Error400 />} />
              <Route path="/error500" element={<Error500 />} />
              <Route path="*" element={<Error404 />} />

             { /* Rutas protegidas para administradores */}
              <Route
                path="/empleado/dashboard"
                element={<ProteccionRutas element={DashboardEmpleado} allowedRoles={['empleado']} />}
              />
              <Route
                path="/empleado/configuracion"
                element={<ProteccionRutas element={ConfiguracionEmpleado} allowedRoles={['empleado']} />}
              />
              <Route
                path="/admin/dashboard"
                element={<ProteccionRutas element={DashboardAdmin} allowedRoles={['administrador']} />}
              />
              <Route
                path="/admin/configuracion"
                element={<ProteccionRutas element={Configuracion} allowedRoles={['administrador']} />}
              />
              <Route
                path="/admin/empresa"
                element={<ProteccionRutas element={Empresa} allowedRoles={['administrador']} />}
              />
               <Route
                path="/admin/perfil"
                element={<ProteccionRutas element={PerfilAdmin} allowedRoles={['administrador']} />}
              />
               <Route
                path="/admin/actualizarPerfil"
                element={<ProteccionRutas element={ActualizarPerfilAdmin} allowedRoles={['administrador']} />}
              />
              <Route
                path="/admin/productos"
                element={<ProteccionRutas element={Productos} allowedRoles={['administrador']} />}
              />
              <Route
                path="/admin/productos/detalle/:id"
                element={<ProteccionRutas element={DetalleProductos} allowedRoles={['administrador']} />}
              />
              <Route
                  path="/admin/usuarios/:id"
                  element={<ProteccionRutas element={UsuarioDetalles} allowedRoles={['administrador']} />}
                />
              <Route
                  path="/admin/empresa/actualizar"
                  element={<ProteccionRutas element={ActualizarEmpresa} allowedRoles={['administrador']} />}
                />
              <Route
                path="/admin/usuarios"
                element={<ProteccionRutas element={Usuarios} allowedRoles={['administrador']} />}
              />
              <Route
                path="/admin/empleados"
                element={<ProteccionRutas element={Empleados} allowedRoles={['administrador']} />}
              />
              <Route
                path="/admin/productos/crear"
                element={<ProteccionRutas element={CrearProducto} allowedRoles={['administrador']} />}
              />
              <Route
                path="/admin/productos/editar/:id"
                element={<ProteccionRutas element={EditarProducto} allowedRoles={['administrador']} />}
              />

              {/* Rutas de empleado */}
              <Route
                path="/empleado/perfil"
                element={<ProteccionRutas element={PerfilEmpleado} allowedRoles={['empleado']} />}
              />
              <Route
                path="/empleado/actualizarPerfil"
                element={<ProteccionRutas element={ActualizarPerfilEmpleado} allowedRoles={['empleado']} />}
              />

              {/* Ruta para el Dashboard de Usuario */}
              <Route
                path="/usuario/dashboard"
                element={<ProteccionRutas element={DashboardUsuario} allowedRoles={['usuario']} />}
              />
              <Route
                path="/usuario/perfil"
                element={<ProteccionRutas element={PerfilUsuario} allowedRoles={['usuario']} />}
              />
              <Route
                path="/productos/agregar"
                element={<ProteccionRutas element={ProductosA} allowedRoles={['usuario']} />}
              />
              <Route
                path="/productos/Carrito"
                element={<ProteccionRutas element={Carrito} allowedRoles={['usuario']} />}
              />
              <Route
                path="/usuario/actualizarPerfil"
                element={<ProteccionRutas element={ActualizarPerfilUsuario} allowedRoles={['usuario']} />}
              />
            
            </Routes>
          </Suspense>
        </Container>
      </Layout>
    </Router>
  );
};

export default App;