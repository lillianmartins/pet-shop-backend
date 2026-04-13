import Filhote from "../model/Filhote.js";
import obterConexao from "./obterConexao.js";

export default class FilhoteDB {
  async cadastrarFilhote(filhote) {
    if (filhote instanceof Filhote) {
      const sql = "INSERT INTO filhotes (especie, raca) VALUES (?, ?)";
      const valores = [filhote.especie, filhote.raca];
      const conexao = await obterConexao();
      const resultado = await conexao.execute(sql, valores);
      filhote.id = resultado[0].insertId;
      conexao.release();
    }
  }

  async listarFilhotes() {
    const sql = "SELECT * FROM filhotes";
    const conexao = await obterConexao();
    const resultado = await conexao.execute(sql);
    conexao.release();

    let listaFilhotes = [];
    for (const registro of resultado[0]) {
      const filhote = new Filhote(registro.id, registro.especie, registro.raca);
      listaFilhotes.push(filhote);
    }
    return listaFilhotes;
  }

  async consultarFilhote(id) {
    const sql = "SELECT * FROM filhotes WHERE id = ?";
    const conexao = await obterConexao();
    const resultado = await conexao.execute(sql, [id]);
    conexao.release();

    if (resultado[0].length > 0) {
      const registro = resultado[0][0];
      return new Filhote(registro.id, registro.especie, registro.raca);
    }
    return null;
  }

  async atualizarFilhote(filhote) {
    if (filhote instanceof Filhote) {
      const sql = "UPDATE filhotes SET especie = ?, raca = ? WHERE id = ?";
      const valores = [filhote.especie, filhote.raca, filhote.id];
      const conexao = await obterConexao();
      await conexao.execute(sql, valores);
      conexao.release();
    }
  }

  async excluirFilhote(id) {
    const sql = "DELETE FROM filhotes WHERE id = ?";
    const conexao = await obterConexao();
    await conexao.execute(sql, [id]);
    conexao.release();
  }
}
