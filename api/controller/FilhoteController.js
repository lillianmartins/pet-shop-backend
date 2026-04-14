import FilhoteDB from "../database/FilhoteDB.js";
import Filhote from "../model/Filhote.js";

const filhoteDB = new FilhoteDB();

export default {
  async cadastrarFilhote(req, res) {
    try {
      const { especie, raca } = req.body;
      
      if (!especie || !raca) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
      }

      const novoFilhote = new Filhote(null, especie, raca);
      await filhoteDB.cadastrarFilhote(novoFilhote);
      
      return res.status(201).json({ mensagem: "Filhote cadastrado com sucesso!" });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao cadastrar filhote", erro: error.message });
    }
  },

  async listarFilhotes(req, res) {
    try {
      const listaFilhotes = await filhoteDB.listarFilhotes();

      if (listaFilhotes.length === 0) {
        return res.status(404).json({ mensagem: "Nenhum filhote encontrado" });
      }

      return res.status(200).json({ filhotes: listaFilhotes });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao listar filhotes", erro: error.message });
    }
  },

  async consultarFilhote(req, res) {
    try {
      const { id } = req.params;
      const filhote = await filhoteDB.consultarFilhote(id);

      if (!filhote) {
        return res.status(404).json({ mensagem: "Filhote não encontrado" });
      } 
        
      return res.status(200).json({ filhote: filhote });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao consultar filhote", erro: error.message });
    }
  },

  async atualizarFilhote(req, res) {
    try {
      const { id } = req.params;
      const { especie, raca } = req.body;

      if (!especie || !raca) {
        return res.status(400).json({ mensagem: "Todos os campos são obrigatórios!" });
      }

      const filhote = await filhoteDB.consultarFilhote(id);
      if (!filhote) {
        return res.status(404).json({ mensagem: "Filhote não encontrado" });
      }

      const filhoteAtualizado = new Filhote(id, especie, raca);
      await filhoteDB.atualizarFilhote(filhoteAtualizado);

      return res.status(200).json({ mensagem: "Filhote atualizado com sucesso!" });
      
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao atualizar filhote", erro: error.message });
    }
  },

  async excluirFilhote(req, res) {
    try {
      const { id } = req.params;

      const filhote = await filhoteDB.consultarFilhote(id);
      if (!filhote) {
        return res.status(404).json({ mensagem: "Filhote não encontrado" });
      }

      await filhoteDB.excluirFilhote(id);

      return res.status(200).json({ mensagem: "Filhote excluído com sucesso!" });
    } catch (error) {
      return res.status(500).json({ mensagem: "Erro ao excluir filhote", erro: error.message });
    }
  }
}
