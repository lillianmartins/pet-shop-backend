import FilhoteDB from "../database/FilhoteDB.js";

export default class Filhote {
    #id;
    #especie;
    #raca;

    constructor(id, especie, raca) {
        this.#id = id;
        this.#especie = especie;
        this.#raca = raca;
    }

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }

    get especie() {
        return this.#especie;
    }
    set especie(especie) {
        this.#especie = especie;
    }

    get raca() {
        return this.#raca;
    }
    set raca(raca) {
        this.#raca = raca;
    }

    toString() {
    return `
        Especie: ${this.#especie}
        Raça: ${this.#raca}
    `;
  }

    async cadastrar() {
      const filhote = new FilhoteDB();
      await filhote.cadastrar(this);
    }
  
    async consultar(id) {
      const filhote = new FilhoteDB();
      return await filhote.consultar(id);
    }
  
    async atualizar() {
      const filhote = new FilhoteDB();
      await filhote.atualizar(this);
    }
  
    async excluir() {
      const filhote = new FilhoteDB();
      await filhote.excluir(this);
    }

    toJSON() {
      return {
        id: this.#id,
        especie: this.#especie,
        raca: this.#raca,
      };
    }
}