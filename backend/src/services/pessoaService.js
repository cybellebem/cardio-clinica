const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const PessoaModel=require("../models/pessoaModel")

function checarCpf(cpfLimpo){
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
    return cpfLimpo
}

function checarData(data){
    const dataNascimento=new Date(data)
    const hoje=new Date()

    if(isNaN(dataNascimento.getTime())){
        throw Object.assign(new Error("Data inválida"),{status:400})
    }

     hoje.setHours(0,0,0,0)
    dataNascimento.setHours(0,0,0,0)

    if(dataNascimento>hoje){
        throw Object.assign(new Error("A data de nascimento não pode ser superior ao dia atual"),{status:400})
    }
}

class PessoaService{
    static async listar(){
        return await PessoaModel.listar()
    }

    static async buscarPorId(id){
        const pessoa=await PessoaModel.buscarPorId(id)
        if(!pessoa) throw Object.assign(new Error("Pessoa não encontrada"),{status:404});
        return pessoa
    }

    static async criar(dados){
        const {cpf,nome,data,telefone,endereco,senha}=dados

        if(!cpf||!nome||!data||!telefone||!endereco||!senha) throw Object.assign(new Error("Há campos em branco"),{status:400});

        const cpfLimpo=cpf.replace(/\D/g,"")
        const pessoa=await PessoaModel.buscarPorCpf(cpfLimpo)

        if(pessoa){
            throw Object.assign(new Error(`O CPF já está cadastrado`),{status:400})
        }
        
        // checagens CPF e data de nascimento
        dados.cpf=checarCpf(cpfLimpo)
        checarData(data)

        // salvar no banco
        dados.senha=await bcrypt.hash(senha,10)

        const id=await PessoaModel.criar(dados)
        return {message:"Pessoa inserida com sucesso",id:id}
    }

    static async atualizar(dados){
        const {id,cpf,nome,data,telefone,endereco,senha}=dados

        if(!cpf||!nome||!data||!telefone||!endereco) throw Object.assign(new Error("Há campos em branco"),{status:400});
        const cpfLimpo=cpf.replace(/\D/g,"")

        const pessoa=await PessoaModel.buscarPorId(id)
        const pessoaCpf=await PessoaModel.buscarPorCpf(cpfLimpo)

        if(!pessoa) throw Object.assign(new Error("Pessoa não encontrada"),{status:404});

        if(pessoaCpf && pessoaCpf.id!==id) throw Object.assign(new Error("CPF cadastrado em outra pessoa"),{status:409});

        // checagens CPF e data de nascimento
        dados.cpf=checarCpf(cpfLimpo)
        checarData(data)

        // se necessário atualizar senha
        if(senha){
            dados.senha=await bcrypt.hash(senha,10)
        }

        await PessoaModel.atualizar(dados)
    }

    static async ativar(id){
        const pessoa=await PessoaModel.buscarPorId(id)
        if(!pessoa) throw Object.assign(new Error("Pessoa não encontrada"),{status:404});
        await PessoaModel.ativar(id)
    }

    static async desativar(id){
        const pessoa=await PessoaModel.buscarPorId(id)
        if(!pessoa) throw Object.assign(new Error("Pessoa não encontrada"),{status:404});
        await PessoaModel.desativar(id)
    }
}

module.exports=PessoaService