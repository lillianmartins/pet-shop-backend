import "dotenv/config.js";
import express from "express";

const app = express();
app.use(express.json());

const localhost = "localhost";
const port = 3000;

app.listen(port, localhost, () => {
    console.log(`Servidor rodando em http://${localhost}:${port}`);
});
