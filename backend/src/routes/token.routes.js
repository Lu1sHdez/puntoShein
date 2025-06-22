import express from "express";
import { registrarToken } from "../controllers/token.controller.js";

const router = express.Router();

router.post("/", registrarToken);

export default router;
