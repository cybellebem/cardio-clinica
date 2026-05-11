const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const PessoaModel=require("../models/pessoaModel")

function erro(msg,status){
    const error=new Error(msg)
    error.status=status
    throw error
}

function checarCpf(cpf){
    const cpfLimpo=cpf.replace(/\D/g,"")
    if(/^(\d)\1+$/.test(cpfLimpo)) erro("CPF inválido: todos os dígitos são iguais",400);
    let check=cpfLimpo.slice(0,9).split("").map(Number)
    function calcularDigito(entrada,pesoInicial){
        let valor=entrada.reduce((ac,x,i)=>ac+x*(pesoInicial-i),0)%11
        valor=valor<2?0:11-valor
        return valor
    }
    check.push(calcularDigito(check,10))
    check.push(calcularDigito(check,11))
    if(check.join("")!==cpfLimpo) erro("CPF inválido",400);
    return cpfLimpo
}

function checarData(data){
    const dataNascimento=new Date(data)
    const hoje=new Date()

    if(isNaN(dataNascimento.getTime())) erro("Data inválida",400);

    hoje.setHours(0,0,0,0)
    dataNascimento.setHours(0,0,0,0)

    if(dataNascimento>hoje) erro("A data de nascimento não pode ser superior ao dia atual",400);
}

function checarMedico(funcao,crm){
    if(funcao==="Médico" && !crm) erro("CRM é obrigatório para cadastrar médico",400);
    if(funcao!=="Médico" && crm) erro("CRM é um campo exclusivo para médicos",400);
}

const permissoesListar={
    Admin:["Admin","Atendente","Médico","Paciente"],
    Atendente:["Médico","Paciente"],
    Médico:["Paciente"]
}

const permissoesGerenciar={
    Admin:["Admin","Atendente"],
    Atendente:["Médico","Paciente"]
}

class PessoaService{
    static async listar(funcao){
        const funcoesPermitidas=permissoesListar[funcao]
        if(!funcoesPermitidas) erro("Acesso negado",403);
        return await PessoaModel.listar(funcoesPermitidas)
    }

    static async buscarPorId(id,funcao){
        const pessoa=await PessoaModel.buscarPorId(id)
        if(!pessoa) erro("Pessoa não encontrada",404);

        const permitido=pessoa.funcao===funcao||permissoesListar[funcao]?.includes(pessoa.funcao)||permissoesGerenciar[funcao]?.includes(pessoa.funcao)
        if(!permitido) erro("Acesso negado",403);

        return pessoa
    }

    static async login(dados){
        const {cpf,senha}=dados

        if(!cpf||!senha) erro("Há campos obrigatórios em branco",400);

        const cpfLimpo=cpf.replace(/\D/g,"")
        const pessoa=await PessoaModel.buscarPorCpfLogin(cpfLimpo)
        if(!pessoa) erro("Pessoa não encontrada",404);
        if(pessoa.status!=="Ativo") erro("Seu cadastro está inativo, entre em contato com um funcionário ou administrador do site",403);

        const senhaValida=await bcrypt.compare(senha,pessoa.senha)
        if(!senhaValida) erro("Credenciais inválidas",400);

        const token=jwt.sign(
            {id:pessoa.id,funcao:pessoa.funcao},
            process.env.JWT_SECRET,
            {expiresIn:"1h"}
        )

        return {token,pessoa:{id:pessoa.id,nome:pessoa.nome,funcao:pessoa.funcao}}
    }

    static async criar(dados,funcaoReq){
        const {cpf,nome,data,telefone,endereco,senha,crm,funcao}=dados

        if(!cpf||!nome||!data||!telefone||!endereco||!senha||!funcao) erro("Há campos obrigatórios em branco",400);
        
        // checagem permissão
        const permitido=permissoesGerenciar[funcaoReq]?.includes(funcao)
        if(!permitido) erro("Acesso negado",403);

        // checagens CPF e data de nascimento
        const cpfLimpo=checarCpf(cpf)
        checarData(data)

        // checagem CPF já cadastrado
        const existeCpf=await PessoaModel.buscarPorCpf(cpfLimpo)
        if(existeCpf) erro("CPF já está cadastrado",409);

        // checagem CRM exclusivo para médicos
        console.log(dados)
        checarMedico(funcao,crm)

        // objeto final
        const pessoa={
            cpf:cpfLimpo,
            nome,data,telefone,endereco,crm,funcao,
            senha:await bcrypt.hash(senha,10)
        }
        
        // salvar no banco
        const id=await PessoaModel.criar(pessoa)
        return {message:"Pessoa inserida com sucesso",id:id}
    }

    static async atualizar(id,dados,funcaoReq){
        const {cpf,nome,data,telefone,endereco,senha,crm,funcao}=dados

        if(!id) erro("ID não foi informado",400);

        // checagem pessoa existe
        let pessoa=await this.buscarPorId(id,funcaoReq)

        // checagem permissão
        const permitido=permissoesGerenciar[funcaoReq]?.includes(pessoa.funcao)
        if(!permitido) erro("Acesso negado",403);

        // checagens CPF e data de nascimento
        const cpfLimpo=checarCpf(cpf)
        checarData(data)

        // checagem CRM exclusivo para médicos
        checarMedico(funcao,crm)

        // checagem CPF não usado em outro cadastro
        const pessoaCpf=await PessoaModel.buscarPorCpf(cpfLimpo)
        if(pessoaCpf && pessoaCpf.id!=id) erro("CPF cadastrado em outra pessoa",409);

        // checagem tentativa mudar função
        if(dados.funcao) erro("Tentativa de mudança de função foi bloqueada",403)

        // objeto final
        pessoa={
            ...pessoa,
            cpf:cpfLimpo,
            nome:nome??undefined,
            data:data??undefined,
            telefone:telefone??undefined,
            endereco:endereco??undefined,
            crm:crm??undefined
        }

        // se necessário atualizar senha
        if(typeof senha==="string" && senha.length>0) pessoa.senha=await bcrypt.hash(senha,10);

        await PessoaModel.atualizar(pessoa)
        return pessoa
    }

    static async ativar(id,funcaoReq){
        const pessoa=await this.buscarPorId(id,funcaoReq)
        const permitido=permissoesGerenciar[funcaoReq]?.includes(pessoa.funcao)
        if(!permitido) erro("Acesso negado",403);
        await PessoaModel.ativar(id)
    }

    static async desativar(id,funcaoReq){
        const pessoa=await this.buscarPorId(id,funcaoReq)
        const permitido=permissoesGerenciar[funcaoReq]?.includes(pessoa.funcao)
        if(!permitido) erro("Acesso negado (service)",403);
        await PessoaModel.desativar(id)
    }
}

module.exports=PessoaService