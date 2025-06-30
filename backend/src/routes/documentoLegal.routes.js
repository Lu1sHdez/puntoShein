import { Router } from "express";
import { obtenerDocumentoPorTipo, guardarDocumento } from "../controllers/documentoLegal.controller.js";

const router = Router();

router.get("/documentos/:tipo", obtenerDocumentoPorTipo);
router.post("/documentos", guardarDocumento);

export default router;
