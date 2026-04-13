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
}