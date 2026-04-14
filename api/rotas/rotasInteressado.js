import { Router } from "express";
import InteressadoController from "../controller/InteressadoController.js";

const rotasInteressado = Router();

rotasInteressado.post("/", InteressadoController.cadastrarInteressado);
rotasInteressado.get("/", InteressadoController.listarInteressados);
rotasInteressado.get("/:id", InteressadoController.consultarInteressado);
rotasInteressado.put("/:id", InteressadoController.atualizarInteressado);
rotasInteressado.delete("/:id", InteressadoController.excluirInteressado);

export default rotasInteressado;