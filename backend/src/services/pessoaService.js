const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const PessoaModel=require("../models/pessoaModel")

class PessoaService{
    static async listar(){
        return await PessoaModel.listar()
    }

    // implementar?
    static async procurarId(id){}
    static async procurarCpf(cpf){}

    static async criar(dados){
        const {cpf,nome,data,telefone,endereco,senha}=dados

        if(!cpf||!nome||!data||!telefone||!endereco||!senha) throw Object.assign(new Error("Há campos em branco"),{status:400});
        
        const pessoa=await PessoaModel.buscarPorCpf(cpf)

        if(pessoa){
            throw Object.assign(new Error(`A pessoa [${pessoa.id} - ${pessoa.nome}] já está cadastrada`),{status:400})
        }else{
            // checagem CPF
            const cpfLimpo=cpf.replace(/\D/g,"")
            if(/^(\d)\1+$/.test(cpfLimpo)) throw Object.assign(new Error("CPF inválido: todos os dígitos são iguais"),{status:400});
            let check=cpfLimpo.slice(0,9).split("").map(Number)
            function calcularDigito(entrada,pesoInicial){
                let valor=entrada.reduce((ac,x,i)=>ac+x*(pesoInicial-i),0)%11
                valor=valor<2?0:11-valor
                return valor
            }
            check.push(calcularDigito(check,10))
            check.push(calcularDigito(check,11))
            if(check.join("")!==cpfLimpo) throw Object.assign(new Error("CPF inválido"),{status:400});
            dados.cpf=cpfLimpo

            // CHECAR DATA DE NASCIMENTO: não pode ser posterior ao dia atual

            // salvar no banco
            dados.senha=await bcrypt.hash(senha,10)

            try{
                const id=await PessoaModel.criar(dados)
            }catch(err){
                throw Object.assign(new Error("Erro interno"),{status:500})
            }
            return {message:"Pessoa inserida com sucesso",id:id}
        }
    }

    static async atualizar(dados){
        const {id,cpf,nome,data,telefone,endereco,senha}=dados

        if(!cpf||!nome||!data||!telefone||!endereco||!senha) throw Object.assign(new Error("Há campos em branco"),{status:400});
        
        const pessoa=await PessoaModel.buscarPorId(id)
        const pessoaCpf=await PessoaModel.buscarPorCpf(cpf)

        if(!pessoa) throw Object.assign(new Error("Pessoa não encontrada"),{status:404});

        if(pessoaCpf && pessoaCpf.id!==id) throw Object.assign(new Error("CPF cadastrado em outra pessoa"),{status:409})

        // CHECAGEM CPF E DATA NASCIMENTO

        // atualizar no banco
        dados.senha=bcrypt.hash(senha,10)

        try{
            const idAtualizado=await PessoaModel.atualizar(dados)
            return {message:"Pessoa atualizada com sucesso",idAtualizado:id}
        }catch(err){
            throw new Error(err)
        }
    }

    static async ativar(id){
        const pessoa=await PessoaModel.buscarPorId(id)

        if(!pessoa) throw Object.assign(new Error("Pessoa não encontrada"),{status:404});
        else{
            try{
                await PessoaModel.ativar(id)
            }catch(err){
                throw Object.assign(new Error("Erro interno"),{status:500})
            }
        }
    }

    static async desativar(id){
        const pessoa=await PessoaModel.buscarPorId(id)

        if(!pessoa) throw Object.assign(new Error("Pessoa não encontrada"),{status:404});
        else{
            try{
                await PessoaModel.desativar(id)
            }catch(err){
                throw Object.assign(new Error("Erro interno"),{status:500})
            }
        }
    }
}

module.exports=PessoaService