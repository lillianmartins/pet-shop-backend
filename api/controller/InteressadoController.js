import InteressadoDB from "../database/InteressadoDB.js";
import Interessado from "../model/Interessado.js";

const interessadoDB = new InteressadoDB();

export default {
  async cadastrarInteressado(req, res) {
    try {
      const { cpf, nome, telefone, email } = req.body;

      if (!cpf || !nome || !telefone || !email) {
        return res
          .status(400)
          .json({ mensagem: "Campos obrigatórios não preenchidos!" });
      }

      if (!validarCpf(cpf)) {
        return res.status(400).json({ mensagem: "CPF inválido!" });
      }

      if (!validarEmail(email)) {
        return res.status(400).json({ mensagem: "Email inválido!" });
      }

      if (!validarTelefone(telefone)) {
        return res.status(400).json({ mensagem: "Telefone inválido!" });
      }

      const novoInteressado = new Interessado(
        null,
        cpf,
        nome,
        telefone,
        email,
        null,
      );
      await interessadoDB.cadastrarInteressado(novoInteressado);

      return res
        .status(201)
        .json({ mensagem: "Interessado cadastrado com sucesso!" });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao cadastrar interessado",
        erro: error.message,
      });
    }
  },

  async listarInteressados(req, res) {
    try {
      const listaInteressados = await interessadoDB.listarInteressados();

      if (listaInteressados.length === 0) {
        return res
          .status(404)
          .json({ mensagem: "Nenhum interessado encontrado" });
      }

      return res.status(200).json({ interessados: listaInteressados });
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Erro ao listar interessados", erro: error.message });
    }
  },

  async consultarInteressado(req, res) {
    try {
      const { id } = req.params;
      const interessado = await interessadoDB.consultarInteressado(id);

      if (!interessado) {
        return res.status(404).json({ mensagem: "Interessado não encontrado" });
      }

      return res.status(200).json({ interessado: interessado });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao consultar interessado",
        erro: error.message,
      });
    }
  },

  async atualizarInteressado(req, res) {
    try {
      const { id } = req.params;
      const { cpf, nome, telefone, email, idFilhote } = req.body;

      if (!cpf || !nome || !telefone || !email) {
        return res
          .status(400)
          .json({ mensagem: "Campos obrigatórios não preenchidos!" });
      }

      if (!validarCpf(cpf)) {
        return res.status(400).json({ mensagem: "CPF inválido!" });
      }

      if (!validarEmail(email)) {
        return res.status(400).json({ mensagem: "Email inválido!" });
      }

      if (!validarTelefone(telefone)) {
        return res.status(400).json({ mensagem: "Telefone inválido!" });
      }

      const interessado = await interessadoDB.consultarInteressado(id);
      if (!interessado) {
        return res.status(404).json({ mensagem: "Interessado não encontrado" });
      }

      const interessadoAtualizado = new Interessado(
        id,
        cpf,
        nome,
        telefone,
        email,
        idFilhote || null,
      );
      await interessadoDB.atualizarInteressado(interessadoAtualizado);

      return res
        .status(200)
        .json({ mensagem: "Interessado atualizado com sucesso!" });
    } catch (error) {
      return res.status(500).json({
        mensagem: "Erro ao atualizar interessado",
        erro: error.message,
      });
    }
  },

  async excluirInteressado(req, res) {
    try {
      const { id } = req.params;
      const interessado = await interessadoDB.consultarInteressado(id);

      if (!interessado) {
        return res.status(404).json({ mensagem: "Interessado não encontrado" });
      }

      await interessadoDB.excluirInteressado(id);

      return res
        .status(200)
        .json({ mensagem: "Interessado excluído com sucesso!" });
    } catch (error) {
      return res
        .status(500)
        .json({ mensagem: "Erro ao excluir interessado", erro: error.message });
    }
  },
};

function validarCpf(cpf) {
  const regexCpf = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$/;
  return regexCpf.test(cpf);
}

function validarEmail(email) {
  const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regexEmail.test(email);
}

function validarTelefone(telefone) {
  const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
  return regexTelefone.test(telefone);
}
