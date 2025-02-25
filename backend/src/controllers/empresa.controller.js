import Empresa from '../models/empresa.model.js';
import Valores from '../models/valores.model.js'; // Importar el modelo de valores

// Obtener datos de la empresa con sus valores
export const obtenerEmpresa = async (req, res) => {
  try {
    const empresa = await Empresa.findOne({
      include: [{
        model: Valores,
        as: 'valores',  // Relación definida en el modelo
        required: false,  // No es obligatorio que la empresa tenga valores
      }],
    });

    if (!empresa) {
      return res.status(404).json({ message: "No se encontró la empresa." });
    }

    res.json(empresa);  // Devuelve la empresa junto con sus valores
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Actualizar datos de la empresa y sus valores
export const actualizarEmpresa = async (req, res) => {
    try {
      const { nombre, mision, vision, valores, historia, equipo, logo, correo, telefono } = req.body;
  
      // Encontrar la empresa
      const empresa = await Empresa.findOne();
  
      if (!empresa) {
        return res.status(404).json({ message: "Empresa no encontrada." });
      }
  
      // Actualizar la empresa
      empresa.nombre = nombre || empresa.nombre;
      empresa.mision = mision || empresa.mision;
      empresa.vision = vision || empresa.vision;
      empresa.valores = valores || empresa.valores;
      empresa.historia = historia || empresa.historia;
      empresa.equipo = equipo || empresa.equipo;
      empresa.correo = correo || empresa.correo;
      empresa.telefono = telefono || empresa.telefono;
      empresa.logo = logo || empresa.logo;
  
      await empresa.save();  // Guardar los cambios en la empresa
  
      // Si se proporcionan nuevos valores, actualizarlos
      if (valores && valores.length > 0) {
        // Primero eliminamos los valores existentes
        await Valores.destroy({ where: { empresa_id: empresa.id } });
  
        // Insertamos los nuevos valores
        for (let valor of valores) {
          await Valores.create({
            nombre: valor.nombre,
            descripcion: valor.descripcion,
            empresa_id: empresa.id,
          });
        }
      }
  
      res.json(empresa);  // Retorna la empresa actualizada
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar los datos de la empresa.", error: error.message });
    }
  };
  