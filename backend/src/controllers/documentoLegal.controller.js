import DocumentoLegal from '../models/documentoLegal.model.js';

// Función para actualizar un documento legal
export const actualizarDocumento = async (req, res) => {
  try {
    const { tipo } = req.params;
    const { titulo, descripcion, contenido } = req.body;

    // Buscar el documento por tipo
    const documento = await DocumentoLegal.findOne({
      where: { tipo },
    });

    if (!documento) {
      return res.status(404).json({ mensaje: 'Documento no encontrado.' });
    }

    // Actualizamos los datos del documento
    documento.titulo = titulo;
    documento.descripcion = descripcion;
    documento.contenido = contenido;
    documento.fecha_actualizacion = new Date(); // Fecha de actualización
    await documento.save();

    // Devolver respuesta exitosa
    res.json({
      mensaje: 'Documento actualizado correctamente.',
      documento,
    });
  } catch (error) {
    console.error('Error al actualizar el documento:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};
// Función para obtener un documento legal por tipo
export const obtenerDocumentoPorTipo = async (req, res) => {
  try {
    const { tipo } = req.params;

    // Buscar el documento por tipo
    const documento = await DocumentoLegal.findOne({
      where: { tipo },
    });

    if (!documento) {
      return res.status(404).json({ mensaje: 'Documento no encontrado.' });
    }

    res.json(documento);
  } catch (error) {
    console.error('Error al obtener documento:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};

// Función para obtener todos los documentos
export const obtenerTodosDocumentos = async (req, res) => {
  try {
    const documentos = await DocumentoLegal.findAll();

    if (documentos.length === 0) {
      return res.status(200).json({ mensaje: 'No se encontraron documentos.' });  // Responder con 200
    }

    res.json(documentos);  // Responder con todos los documentos
  } catch (error) {
    console.error('Error al obtener documentos:', error);
    res.status(500).json({ mensaje: 'Error del servidor.' });
  }
};