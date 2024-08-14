"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PessoaService = void 0;
const pessoa_1 = require("../model/entity/pessoa");
const PessoaRepository_1 = require("../repository/PessoaRepository");
class PessoaService {
    constructor() {
        this.PessoaRepository = PessoaRepository_1.PessoaRepository.getInstance();
    }
    cadastraPessoa(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email } = pessoaData;
            const pessoa = new pessoa_1.Pessoa(undefined, name.toLowerCase(), email);
            let pessoaEncontrada = yield this.PessoaRepository.filtrarPessoaByNameId(undefined, name.toLowerCase(), undefined);
            if (pessoaEncontrada.length > 0) {
                throw new Error("Pessoa com esse nome já cadastrada!");
            }
            pessoaEncontrada = yield this.PessoaRepository.filtrarPessoaByNameId(undefined, undefined, email.toLowerCase());
            if (pessoaEncontrada.length > 0) {
                throw new Error("Pessoa com esse email já cadastrada!");
            }
            const novaPessoa = yield this.PessoaRepository.inserePessoa(pessoa);
            console.log("Cadastrado:", novaPessoa);
            return novaPessoa;
        });
    }
    atualizaPessoa(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email } = pessoaData;
            if (typeof id !== 'number') {
                throw new Error("Informe um ID correto.");
            }
            const pessoa = new pessoa_1.Pessoa(id, name, email);
            const pessoaEncontrada = yield this.PessoaRepository.filtrarPessoaByNameId(pessoa.id, pessoa.name, pessoa.email);
            if (pessoaEncontrada.length == 0) {
                throw new Error("Cliente informado inexistente.");
            }
            yield this.PessoaRepository.atualizaPessoa(pessoa);
            console.log("Atualizado:", pessoa);
            return pessoa;
        });
    }
    deletaPessoa(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id, name, email } = pessoaData;
            if (typeof id !== 'number') {
                throw new Error("Informe um ID correto.");
            }
            const pessoa = new pessoa_1.Pessoa(id, name, email);
            const pessoaEncontrada = yield this.PessoaRepository.filtrarPessoaByNameId(pessoa.id, pessoa.name, pessoa.email);
            if (pessoaEncontrada.length == 0) {
                throw new Error("Pessoa informada inexistente.");
            }
            yield this.PessoaRepository.deletaPessoa(pessoa);
            console.log("Deletado: ", pessoa);
            return pessoa;
        });
    }
    filtraPessoa(pessoaData) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(pessoaData, 10);
            const pessoa = yield this.PessoaRepository.filtrarPessoaByNameId(id, undefined, undefined);
            console.log("Filtrado: ", pessoa);
            if (pessoa.length > 0) {
                return pessoa;
            }
            return null;
        });
    }
    filtraPessoas() {
        return __awaiter(this, void 0, void 0, function* () {
            const pessoas = yield this.PessoaRepository.filtrarPessoas();
            console.log("Filtrado: ", pessoas);
            return pessoas;
        });
    }
}
exports.PessoaService = PessoaService;
