// SeccionProductos.js (Mejorado con hover y botón de detalles)
import React from "react";
import { Grid, Card, CardMedia, CardContent, Typography, Button } from "@mui/material";

const productos = [
  { id: 1, nombre: "Vestido Elegante", precio: "$35.99", imagen: "https://cdn-2.jjshouse.com/upimg/jjshouse/o500/29/b5/c137bf85b4f9bae825a99f557eee29b5.jpg" },
  { id: 2, nombre: "Camisa Casual", precio: "$25.50", imagen: "https://lendthetrend.mx/cdn/shop/files/evelyn-azul-venta-renta-de-vestidos-mexico-lend-the-trend-877337.jpg?v=1718219210&width=1000" },
  { id: 3, nombre: "Jeans Ajustados", precio: "$40.00", imagen: "https://cdn-2.jjshouse.com/upimg/jjshouse/o500/a3/31/c49d0b1ebbcdb48d15aa1a5a3dffa331.jpg" },
  { id: 4, nombre: "Jeans Ajustados", precio: "$40.00", imagen: "https://image.made-in-china.com/202f0j00uezYymbJSPcK/Two-Pieces-Women-Maxi-Dress-Hot-Sales-Ladies-Fashion-Dresses-High-Quality-Party-Evening-Dress.webp" },
  { id: 5, nombre: "Jeans Ajustados", precio: "$40.00", imagen: "https://cdn-2.jjshouse.com/upimg/jjshouse/o500/fe/45/c90681ff3fd19c94674519f035e3fe45.jpg" },
  { id: 6, nombre: "Jeans Ajustados", precio: "$40.00", imagen: "https://down-mx.img.susercontent.com/file/sg-11134202-7rccw-lt6fnhs75ewj22" },




];

const SeccionProductos = () => {
  return (
    <Grid container spacing={3} justifyContent="center" sx={{ padding: 4 }}>
      {productos.map((producto) => (
        <Grid item key={producto.id} xs={12} sm={6} md={4}>
          <Card sx={{ maxWidth: 300, boxShadow: 3, borderRadius: 2, transition: "0.3s", '&:hover': { boxShadow: 10 } }}>
            <CardMedia component="img" height="200" image={producto.imagen} alt={producto.nombre} />
            <CardContent>
              <Typography variant="h6">{producto.nombre}</Typography>
              <Typography color="text.secondary">{producto.precio}</Typography>
              <Button variant="contained" color="primary" fullWidth>
                Agregar al carrito
              </Button>
              <Button variant="outlined" color="secondary" fullWidth sx={{ mt: 1 }}>
                Ver detalles
              </Button>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default SeccionProductos;