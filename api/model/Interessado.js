export default class Interessado {
    #id;
    #cpf;
    #nome;
    #telefone;
    #email;
    #idFilhote;

    constructor(id, cpf, nome, telefone, email, idFilhote) {
        this.#id = id;
        this.#cpf = cpf;
        this.#nome = nome;
        this.#telefone = telefone;
        this.#email = email;
        this.#idFilhote = idFilhote;
    }

    get id() {
        return this.#id;
    }
    set id(id) {
        this.#id = id;
    }

    get cpf() {
        return this.#cpf;
    }
    set cpf(cpf) {
        this.#cpf = cpf;
    }

    get nome() {
        return this.#nome;
    }
    set nome(nome) {
        this.#nome = nome;
    }

    get telefone() {
        return this.#telefone;
    }
    set telefone(telefone) {
        this.#telefone = telefone;
    }

    get email() {
        return this.#email;
    }
    set email(email) {
        this.#email = email;
    }

    get idFilhote() {
        return this.#idFilhote;
    }
    set idFilhote(idFilhote) {
        this.#idFilhote = idFilhote;
    }
}