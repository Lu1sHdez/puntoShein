import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  TextField,
  InputAdornment,
  MenuItem,
  FormControl,
  Select,
  Slider,
  Box,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";

const Encabezado = () => {
  const [categoria, setCategoria] = useState("");
  const [precio, setPrecio] = useState([0, 500]);

  const handleCategoriaChange = (event) => {
    setCategoria(event.target.value);
  };

  const handlePrecioChange = (event, newValue) => {
    setPrecio(newValue);
  };

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        {/* Logo o nombre */}
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Punto Shein
        </Typography>

        {/* Barra de búsqueda */}
        <TextField
          variant="outlined"
          placeholder="Buscar productos..."
          size="small"
          sx={{ backgroundColor: "white", borderRadius: 1, mx: 2, width: "25%" }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Filtros */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          {/* Filtro de Categoría */}
          <FormControl size="small" sx={{ minWidth: 120, backgroundColor: "white", borderRadius: 1 }}>
            <Select value={categoria} onChange={handleCategoriaChange} displayEmpty>
              <MenuItem value="" disabled>
                Categoría
              </MenuItem>
              <MenuItem value="ropa">Ropa</MenuItem>
              <MenuItem value="zapatos">Zapatos</MenuItem>
              <MenuItem value="accesorios">Accesorios</MenuItem>
              <MenuItem value="tecnologia">Tecnologia</MenuItem>
            </Select>
          </FormControl>

          {/* Filtro de Precio */}
          <Box sx={{ width: 150 }}>
            <Typography variant="body2" color="white">
              Precio: ${precio[0]} - ${precio[1]}
            </Typography>
            <Slider
              value={precio}
              onChange={handlePrecioChange}
              valueLabelDisplay="auto"
              min={0}
              max={500}
              sx={{ color: "white" }}
            />
          </Box>

          {/* Botón de Filtrar */}
          <Button variant="contained" sx={{ backgroundColor: "white", color: "black" }}>
            <FilterListIcon sx={{ mr: 1 }} /> Filtrar
          </Button>
        </Box>

        {/* Navegación */}
        <Button color="inherit">Inicio</Button>
        <Button color="inherit">Productos</Button>
        <Button color="inherit">Ofertas</Button>
        <Button color="inherit">Contacto</Button>

        {/* Carrito */}
        <IconButton color="inherit">
          <ShoppingCartIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Encabezado;
