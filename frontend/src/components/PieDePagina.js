// PieDePagina.js (Mejorado con redes sociales)
import React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";

const PieDePagina = () => {
  return (
    <Box component="footer" sx={{ bgcolor: "primary.main", color: "white", py: 2, textAlign: "center" }}>
      <Typography variant="body1">&copy; 2024 Punto Shein - Todos los derechos reservados.</Typography>
      <Typography variant="body2">Política de privacidad | Términos y condiciones</Typography>
      <Box sx={{ mt: 1 }}>
        <IconButton color="inherit">
          <FacebookIcon />
        </IconButton>
        <IconButton color="inherit">
          <InstagramIcon />
        </IconButton>
        <IconButton color="inherit">
          <TwitterIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default PieDePagina;