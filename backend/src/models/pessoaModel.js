const db=require("../config/database")

class PessoaModel{
    static async listar(){
        const [resultados]=await db.query("select * from pessoas")
        return resultados
    }

    static async buscarPorId(id){
        const [resultado]=await db.query("select * from pessoas where id=?",[id])
        return resultado[0]
    }

    static async buscarPorCpf(cpf){
        const [resultado]=await db.query("select * from pessoas where cpf=?",[cpf])
        return resultado[0]
    }

    static async criar(dados){
        const {cpf,nome,data,fone,endereco,senha}=dados
        const [result]=await db.query(
            "insert into pessoas (cpf,nome,data_nascimento,telefone,endereco,senha) values (?,?,?,?,?,?)",
            [cpf,nome,data,fone,endereco,senha]
        )
        return result.insertId
    }

    static async atualizar(id,dados){
        const {cpf,nome,data,fone,endereco,senha}=dados
        await db.query(
            "update pessoas set cpf=?, nome=?, data_nascimento=?, telefone=?, endereco=?, senha=? where id=?",
            [cpf,nome,data,fone,endereco,senha,id]
        )
    }

    static async ativar(id){
        await db.query("update pessoas set status='Ativo' where id=?",[id])
    }

    static async desativar(id){
        await db.query("update pessoas set status='Inativo' where id=?",[id])
    }
}

module.exports=PessoaModel