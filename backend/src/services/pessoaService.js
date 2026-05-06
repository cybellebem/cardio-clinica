const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const PessoaModel=require("../models/pessoaModel")

class PessoaService{
    static async listar(){
        return await PessoaModel.listar()
    }

    static async criar(dados){
        const {cpf,nome,data,telefone,endereco,senha}=dados

        if(!cpf||!nome||!data||!telefone||!endereco||!senha) throw new Error("Há campos em branco");

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
        const pessoa=await PessoaModel.buscarPorCpf(cpf)
        if(!pessoa){
            dados.senha=await bcrypt.hash(senha,10)
            const id=await PessoaModel.criar(dados)
            return {message:"Pessoa inserida com sucesso",id:id}
        }else{
            if(pessoa.status==="Inativo"){
                throw Object.assign(new Error(`A pessoa [${pessoa.id} - ${pessoa.nome}] já está cadastrada, mas desativada`),{status:400})
            }else{
                throw Object.assign(new Error(`A pessoa [${pessoa.id} - ${pessoa.nome}] já foi cadastrada`),{status:409})
            }
        }
    }
}

module.exports=PessoaService