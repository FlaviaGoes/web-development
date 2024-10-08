import { executarComandoSQL } from "../database/mysql";
import { Usuario } from "../model/entity/usuario";

export class UsuarioRepository {
    
    private static instance: UsuarioRepository;

    private constructor(){
        this.createTable();
    }

    public static getInstance(): UsuarioRepository {
        if(!this.instance){
            this.instance = new UsuarioRepository();
        }
        return this.instance;
    }

    private async createTable() {
        const query = `
        CREATE TABLE IF NOT EXISTS biblioteca.Usuario
        (
            id INT AUTO_INCREMENT PRIMARY KEY,
            idPessoa INT NOT NULL,
            senha VARCHAR(255) NOT NULL
        )`;

        try {
            const resultado = await executarComandoSQL(query, []);
            console.log('Query executada com sucesso:', resultado);
        } catch (err) {
            console.error('Error');
        }
    }

    async insereUsuario(usuario: Usuario): Promise<Usuario>{
        const query = "INSERT INTO biblioteca.Usuario(idPessoa, senha) VALUES (?,?)";

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha]);
            console.log('Usuario cadastrado com sucesso!');
            usuario.id = resultado.insertId;
            return new Promise<Usuario>((resolve)=> {
                resolve(usuario);
            })
        } catch (err:any) {
            console.error('Erro ao cadastrar Usuario: ', err);
            throw err;
        }
    }

    async atualizaUsuario(usuario: Usuario): Promise<Usuario>{
        const query = "UPDATE biblioteca.Usuario set idPessoa = ?, senha = ? where id = ?";

        try {
            const resultado = await executarComandoSQL(query, [usuario.idPessoa, usuario.senha, usuario.id]);
            console.log('Pessoa atualizada com sucesso!');
            return new Promise<Usuario>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Erro ao atualizar a pessoa de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async deletaUsuario(usuario: Usuario): Promise<Usuario> {
        const query = "DELETE FROM biblioteca.Usuario where id = ?;";

        try {
            const resultado = await executarComandoSQL(query, [usuario.id]);
            console.log('Usuario deletado com sucesso: ', usuario);
            return new Promise<Usuario>((resolve)=>{
                resolve(usuario);
            })
        } catch (err:any) {
            console.error(`Falha ao deletar o Usuario de ID ${usuario.id} gerando o erro: ${err}`);
            throw err;
        }
    }

    async filtrarUsuarioById(id?:number, idPessoa?: number):Promise<Usuario[]>{
        let query = "SELECT * FROM biblioteca.Usuario where ";
        const params: any[] = [];

        if(id) {
            query += "id = ?";
            params.push(id);
        }

        if(idPessoa) {
            query += "idPessoa = ?";
            params.push(idPessoa);
        }

        if (params.length === 0) {
            throw new Error("Pelo menos um dos parâmetros deve ser fornecido");
        }

        try {
            const resultado: Usuario[] = await executarComandoSQL(query, params);
            console.log('Busca afetuada com sucesso: ', resultado);
            return resultado;
          
        } catch (err:any){
            console.error(`Falha ao procurar usuario gerando o erro: ${err}`);
            throw err;
        }
    }

    async confirmaSenhaById(id: number, idPessoa?:number, senha?:string):Promise<Usuario[]>{
        let query = "SELECT * FROM biblioteca.Pessoa where id = ? and ";
        const params: any[] = [];

        if(idPessoa) {
            query += "idPessoa = ?";
            params.push(idPessoa);
        }

        if(senha) {
            query += "senha = ?";
            params.push(senha);
        }

        try {
            const resultado: Usuario[] = await executarComandoSQL(query, [id, params]);
            console.log('Busca afetuada com sucesso: ', resultado);
            return resultado;
          
        } catch (err:any){
            console.error(`Falha ao procurar usuario gerando o erro: ${err}`);
            throw err;
        }
    }

    async filtrarUsuarios():Promise<Usuario[]>{
        const query = "SELECT * FROM biblioteca.Usuario";

        try {
            const resultado = await executarComandoSQL(query, []);
            return new Promise<Usuario[]>((resolve)=>{
                resolve(resultado);
            })
        } catch (err:any) {
            console.log('Falha ao listar Usuarios cadastradas!');
            throw err;
        }
    }
}