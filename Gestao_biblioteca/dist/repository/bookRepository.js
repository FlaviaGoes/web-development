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
exports.bookRepository = void 0;
const mysql_1 = require("../database/mysql");
const book_1 = require("../model/book");
class bookRepository {
    constructor() {
        this.createTable();
        console.log();
    }
    createTable() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `
        CREATE TABLE IF NOT EXISTS Biblioteca.books(
            id INT AUTO_INCREMENT PRIMARY KEY,
            title VARCHAR(255) NOT NULL,
            author VARCHAR(255) NOT NULL,
            publishedDate VARCHAR(255) NOT NULL,
            isbn VARCHAR(255) NOT NULL,
            pages INT(10) NOT NULL,
            language VARCHAR(255) NOT NULL,
            publisher VARCHAR(255) NOT NULL
        )`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, []);
                console.log('Query executada com sucesso:', resultado);
            }
            catch (err) {
                console.error('Error');
            }
        });
    }
    ;
    insertBook(title, author, publishedDate, isbn, pages, language, publisher) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `INSERT INTO Biblioteca.books (title, author, publishedDate, isbn, pages, language, publisher) VALUES (?, ?, ?, ?, ?, ?, ?)`;
            try {
                const resultado = yield (0, mysql_1.executarComandoSQL)(query, [title, author, publishedDate, isbn, pages, language, publisher]);
                console.log('Livro inserido com sucesso, ID: ', resultado.insertId);
                const book = new book_1.Book(resultado.insertId, title, author, publishedDate, isbn, pages, language, publisher);
                return new Promise((resolve) => {
                    resolve(book);
                });
            }
            catch (err) {
                console.error('Erro ao inserir o livro:', err);
                throw err;
            }
        });
    }
    search(id_Isbn, query) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [id_Isbn]);
                return new Promise((resolve) => {
                    resolve(result.length);
                });
            }
            catch (err) {
                console.error(`Falha ao procurar o ISBN/ID ${id_Isbn}, gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    searchUpdate(isbn, id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM Biblioteca.books WHERE isbn = ? AND id != ?";
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [isbn, id]);
                return new Promise((resolve) => {
                    resolve(result.length);
                });
            }
            catch (err) {
                console.error(`Falha ao procurar livro com isbn ${isbn}, gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    filterbook() {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM Biblioteca.books";
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, []);
                return new Promise((resolve) => {
                    resolve(result);
                });
            }
            catch (err) {
                console.error(`Falha ao buscar livros: ${err}`);
                throw err;
            }
        });
    }
    filterId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "SELECT * FROM Biblioteca.books where id = ?";
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log('Livro localizado com sucesso, ID: ', result);
                return new Promise((resolve) => {
                    resolve(result);
                });
            }
            catch (err) {
                console.error(`Falha ao procurar o livro com o ID: ${id}`);
                throw err;
            }
        });
    }
    updateBook(id, title, author, publishedDate, isbn, pages, language, publisher) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = "UPDATE Biblioteca.books set title = ?, author = ?, publishedDate = ?, isbn = ?, pages = ?, language = ?, publisher = ? where id = ?;";
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [title, author, publishedDate, isbn, pages, language, publisher, id]);
                console.log('Livro atualizado com sucesso, ID: ', result);
                const livro = new book_1.Book(id, title, author, publishedDate, isbn, pages, language, publisher);
                return new Promise((resolve) => {
                    resolve(livro);
                });
            }
            catch (err) {
                console.error(`Erro ao atualizar o produto de ID ${id} gerando o erro: ${err}`);
                throw err;
            }
        });
    }
    deleteBook(id, title, author, publishedDate, isbn, pages, language, publisher) {
        return __awaiter(this, void 0, void 0, function* () {
            const query = `DELETE FROM Biblioteca.books where id = ?`;
            try {
                const result = yield (0, mysql_1.executarComandoSQL)(query, [id]);
                console.log('Livro deletado com sucesso, ID: ', result);
                const book = new book_1.Book(id, title, author, publishedDate, isbn, pages, language, publisher);
                return new Promise((resolve) => {
                    resolve(book);
                });
            }
            catch (err) {
                console.error(`Erro ao deletar o livro de ID ${id}`);
                throw err;
            }
        });
    }
}
exports.bookRepository = bookRepository;
