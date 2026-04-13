import Interessado from "../model/Interessado.js";
import obterConexao from "./obterConexao.js";

export default class InteressadoDB {
  async cadastrarInteressado(interessado) {
    if (interessado instanceof Interessado) {
      const sql =
        "INSERT INTO interessados (cpf, nome, telefone, email, id_filhote) VALUES (?, ?, ?, ?, ?)";
      const valores = [
        interessado.cpf,
        interessado.nome,
        interessado.telefone,
        interessado.email,
        interessado.idFilhote,
      ];
      const conexao = await obterConexao();
      const resultado = await conexao.execute(sql, valores);
      interessado.id = resultado[0].insertId;
      conexao.release();
    }
  }

  async listarInteressados() {
    const sql = "SELECT * FROM interessados";
    const conexao = await obterConexao();
    const resultado = await conexao.execute(sql);
    conexao.release();

    let listaInteressados = [];
    for (const registro of resultado[0]) {
      const interessado = new Interessado(
        registro.id,
        registro.cpf,
        registro.nome,
        registro.telefone,
        registro.email,
        registro.id_filhote,
      );
      listaInteressados.push(interessado);
    }
    return listaInteressados;
  }

  async consultarInteressado(id) {
    const sql = "SELECT * FROM interessados WHERE id = ?";
    const conexao = await obterConexao();
    const resultado = await conexao.execute(sql, [id]);
    conexao.release();

    if (resultado[0].length > 0) {
      const registro = resultado[0][0];
      return new Interessado(
        registro.id,
        registro.cpf,
        registro.nome,
        registro.telefone,
        registro.email,
        registro.id_filhote,
      );
    }
    return null;
  }

  async atualizarInteressado(interessado) {
    const sql = "UPDATE interessados SET cpf = ?, nome = ?, telefone = ?, email = ?, id_filhote = ? WHERE id = ?";
    const valores = [
      interessado.cpf,
      interessado.nome,
      interessado.telefone,
      interessado.email,
      interessado.idFilhote,
      interessado.id,
    ];
    const conexao = await obterConexao();
    await conexao.execute(sql, valores);
    conexao.release();
  }

  async excluirInteressado(id) {
    const sql = "DELETE FROM interessados WHERE id = ?";
    const conexao = await obterConexao();
    await conexao.execute(sql, [id]);
    conexao.release();
  }
}
