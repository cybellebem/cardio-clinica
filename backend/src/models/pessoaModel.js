const db=require("../config/database")

const camposSeguros="id,cpf,nome,data_nascimento,telefone,endereco,crm,status,funcao"

class PessoaModel{
    static async listar(funcao){
        const [resultados]=await db.query(`select ${camposSeguros} from pessoas where funcao=?`,[funcao])
        return resultados
    }

    static async buscarPorId(id){
        const [resultado]=await db.query(`select ${camposSeguros} from pessoas where id=?`,[id])
        return resultado[0]
    }

    static async buscarPorCpf(cpf){
        const [resultado]=await db.query(`select ${camposSeguros} from pessoas where cpf=?`,[cpf])
        return resultado[0]
    }

    static async buscarPorCrm(crm){
        const [resultado]=await db.query(`select ${camposSeguros} from pessoas where crm=?`,[crm])
        return resultado[0]
    }

    static async buscarPorCpfLogin(cpf){
        const [resultado]=await db.query("select id,cpf,nome,funcao,senha,status from pessoas where cpf=?",[cpf])
        return resultado[0]
    }

    static async criar(dados){
        const {cpf,nome,data_nascimento,telefone,endereco,senha,funcao,crm}=dados
        const [resultado]=await db.query(
            "insert into pessoas (cpf,nome,data_nascimento,telefone,endereco,senha,funcao,crm) values (?,?,?,?,?,?,?,?)",
            [cpf,nome,data_nascimento,telefone,endereco,senha,funcao,crm]
        )
        return resultado.insertId
    }

    static async atualizar(dados){
        const {id,cpf,nome,data_nascimento,telefone,endereco,senha,crm}=dados

        const campos=[]
        const valores=[]

        const camposPermitidos={cpf,nome,data_nascimento,telefone,endereco,senha,crm}

        for(const [coluna,valor] of Object.entries(camposPermitidos)){
            if(valor!==undefined && valor!==""){
                campos.push(`${coluna}=?`)
                valores.push(valor)
            }
        }
        
        if(campos.length===0) throw Object.assign(new Error("Nenhum campo para atualizar"),{status:400});

        valores.push(id)

        await db.query(
            `update pessoas set ${campos.join(", ")} where id=?`,
            valores
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