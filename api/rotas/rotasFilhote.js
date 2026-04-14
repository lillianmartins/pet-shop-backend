import { Router } from "express";
import FilhoteController from "../controller/FilhoteController.js";

const rotasFilhote = Router();

rotasFilhote.post("/", FilhoteController.cadastrarFilhote);
rotasFilhote.get("/", FilhoteController.listarFilhotes);
rotasFilhote.get("/:id", FilhoteController.consultarFilhote);
rotasFilhote.put("/:id", FilhoteController.atualizarFilhote);
rotasFilhote.delete("/:id", FilhoteController.excluirFilhote);

export default rotasFilhote;