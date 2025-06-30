import DocumentoLegal from "../models/documentoLegal.model.js";

// Obtener el documento por tipo
export const obtenerDocumentoPorTipo = async (req, res) => {
  try {
    const { tipo } = req.params;

    const documento = await DocumentoLegal.findOne({
      where: { tipo },
    });

    if (!documento) {
      return res.status(404).json({ mensaje: "Documento no encontrado." });
    }

    res.json(documento);
  } catch (error) {
    console.error("Error al obtener documento:", error);
    res.status(500).json({ mensaje: "Error del servidor." });
  }
};

// Crear o actualizar un documento
export const guardarDocumento = async (req, res) => {
  try {
    const { tipo, contenido, empresa_id } = req.body;

    const [documento, creado] = await DocumentoLegal.findOrCreate({
      where: { tipo },
      defaults: { contenido, empresa_id },
    });

    if (!creado) {
      documento.contenido = contenido;
      documento.empresa_id = empresa_id;
      await documento.save();
    }

    res.json({
      mensaje: creado ? "Documento creado correctamente." : "Documento actualizado.",
      documento,
    });
  } catch (error) {
    console.error("Error al guardar documento:", error);
    res.status(500).json({ mensaje: "Error del servidor." });
  }
};
