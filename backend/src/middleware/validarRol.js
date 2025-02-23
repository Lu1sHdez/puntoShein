export const validarRol = (rolesPermitidos) => {
    return (req, res, next) => {
      const token = req.cookies.token; // Obtiene el token de las cookies
      if (!token) {
        return res.status(401).json({ mensaje: "No autorizado, token no encontrado." });
      }
      try {
        const decoded = jwt.verify(token, process.env.TOKEN_SECRET); // Decodifica el token
        if (!rolesPermitidos.includes(decoded.rol)) {
          return res.status(403).json({ mensaje: "Acceso denegado, no tienes permisos para esta acción." });
        }
        req.userId = decoded.id; // Almacena el id del usuario
        req.userRol = decoded.rol; // Almacena el rol del usuario
        next(); // Continúa con el siguiente middleware
      } catch (error) {
        return res.status(401).json({ mensaje: "Token no válido." });
      }
    };
  };
  