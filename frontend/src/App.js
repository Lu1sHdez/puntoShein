import React from "react";
import Encabezado from "./components/Encabezado";
import SeccionProductos from "./components/SeccionProductos";
import PieDePagina from "./components/PieDePagina";
import { Container } from "@mui/material";

const App = () => {
  return (
    <div>
      <Encabezado />
      <Container>
        <SeccionProductos />
      </Container>
      <PieDePagina />
    </div>
  );
};

export default App;
