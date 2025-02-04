import Usuario from '../models/usuario.model.js'; // Ajusta la ruta según tu estructura

(async () => {
  try {
    console.log("🔄 Actualizando la base de datos...");
    await Usuario.sync({ alter: true }); // 🔹 Esto actualizará la tabla sin borrar los datos
    console.log("✅ Base de datos actualizada correctamente.");
    process.exit(0); // Finaliza el proceso después de la sincronización
  } catch (error) {
    console.error("Error al actualizar la base de datos:", error);
    process.exit(1); // Sale con error si algo falla
  }
})();
