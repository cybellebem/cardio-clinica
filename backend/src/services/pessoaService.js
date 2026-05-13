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
    if(funcao==="Medico" && !crm) erro("CRM é obrigatório para cadastrar médico",400);
    if(funcao!=="Medico" && crm) erro("CRM é um campo exclusivo para médicos",400);
}

const funcoes={
    Admin:{
        listar:["Admin","Atendente","Medico","Paciente"],
        gerenciar:["Admin","Atendente"],
        obrigatorios:["cpf","nome","telefone","funcao","endereco","senha"]
    },
    Atendente:{
        listar:["Medico","Paciente"],
        gerenciar:["Medico","Paciente"],
        obrigatorios:["cpf","nome","telefone","funcao","endereco","senha"]
    },
    Medico:{
        listar:["Paciente"],
        gerenciar:[],
        obrigatorios:["cpf","nome","telefone","funcao","crm","endereco","senha"]
    },
    Paciente:{
        listar:[],
        gerenciar:[],
        obrigatorios:["cpf","nome","telefone","funcao","data_nascimento"]
    }
}

// const permissoesListar={
//     Admin:["Admin","Atendente","Medico","Paciente"],
//     Atendente:["Medico","Paciente"],
//     Medico:["Paciente"],
//     Paciente:[]
// }

// const permissoesGerenciar={
//     Admin:["Admin","Atendente"],
//     Atendente:["Medico","Paciente"],
//     Medico:[],
//     Paciente:[]
// }

// const regras={
//     Minimo:["cpf","nome","telefone","funcao"],
//     Medico:["crm","endereco","senha"],
//     Atendente:["endereco","senha"],
//     Admin:["endereco","senha"],
//     Paciente:["data_nascimento"]
// }

class PessoaService{
    static async listar(funcao){
        const funcoesPermitidas=funcoes[funcao]?.listar||[]
        if(funcoesPermitidas.length===0) erro("Acesso negado",403);
        return await PessoaModel.listar(funcoesPermitidas)
    }

    static async buscarPorId(id,requisitante){
        const pessoa=await PessoaModel.buscarPorId(id)
        if(!pessoa) erro("Pessoa não encontrada",404);

        const permissoesReq=funcoes[requisitante.funcao]||{}

        const permitido=
            id==requisitante.id
            ||(permissoesReq.listar||[]).includes(pessoa.funcao)
            ||(permissoesReq.gerenciar||[]).includes(pessoa.funcao)
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
        const {cpf,nome,data_nascimento,telefone,endereco,senha,crm,funcao}=dados

        if(!funcoes[funcao]) erro("Função inválida",400);

        const faltando=funcoes[funcao].obrigatorios.filter(campo=>
            dados[campo]===undefined||
            dados[campo]===null||
            dados[campo]===""
        )
        if(faltando.length) erro(`Há campos obrigatórios em branco: ${faltando.join(", ")}`,400)

        // checagem permissão
        const permitido=(funcoes[funcaoReq]?.gerenciar||[]).includes(funcao)
        if(!permitido) erro("Acesso negado",403);

        // checagens CPF e data de nascimento
        const cpfLimpo=checarCpf(cpf)
        if(data_nascimento) checarData(data_nascimento);

        // checagem CPF já cadastrado
        const existeCpf=await PessoaModel.buscarPorCpf(cpfLimpo)
        if(existeCpf) erro("CPF já está cadastrado",409);

        // checagem CRM exclusivo para médicos
        checarMedico(funcao,crm)

        // checagem tentativa enviar status
        if(dados.status) erro("Não envie status ao cadastrar uma pessoa",403);

        // objeto final
        const pessoa={
            cpf:cpfLimpo,
            nome,data_nascimento,telefone,endereco,crm,funcao,
            senha:await bcrypt.hash(senha,10)
        }
        
        // salvar no banco
        const id=await PessoaModel.criar(pessoa)
        return {message:"Pessoa inserida com sucesso",id}
    }

    static async atualizar(id,dados,requisitante){
        const {cpf,nome,data_nascimento,telefone,endereco,senha,crm}=dados

        if(!id) erro("ID não foi informado",400);

        // checagem pessoa existe
        let pessoa=await this.buscarPorId(id,requisitante)

        // checagem permissão
        const permitido=
            id==requisitante.id||
            ((funcoes[requisitante.funcao]||{}).gerenciar||[])
                .includes(pessoa.funcao)
        if(!permitido) erro("Acesso negado",403);

        // checagens CPF e data de nascimento
        const cpfLimpo = cpf ? checarCpf(cpf) : pessoa.cpf
        if(data_nascimento) checarData(data_nascimento);

        // checagem CRM exclusivo para médicos
        if(crm) checarMedico(pessoa.funcao,crm);

        // checagem CPF não usado em outro cadastro
        const pessoaCpf=await PessoaModel.buscarPorCpf(cpfLimpo)
        if(pessoaCpf && pessoaCpf.id!=id) erro("CPF cadastrado em outra pessoa",409);

        // checagem tentativa mudar função
        if(dados.funcao) erro("Tentativa de mudança de função foi bloqueada",403);

        // checagem tentativa mudar status
        if(dados.status) erro("Tentativa de mudança de status foi bloqueada, use a rota apropriada",403);

        // objeto final
        const pessoaAtualizada={id:id}
        if(cpf) pessoaAtualizada.cpf=cpfLimpo;
        if(nome) pessoaAtualizada.nome=nome;
        if(data_nascimento) pessoaAtualizada.data_nascimento=data_nascimento
        if(telefone) pessoaAtualizada.telefone=telefone
        if(endereco) pessoaAtualizada.endereco=endereco
        if(crm) pessoaAtualizada.crm=crm

        // se necessário atualizar senha
        if(typeof senha==="string" && senha.length>0) pessoaAtualizada.senha=await bcrypt.hash(senha,10);

        await PessoaModel.atualizar(pessoaAtualizada)
        return pessoaAtualizada
    }

    static async ativar(id,requisitante){
        if(id==requisitante.id) erro("Não pode ativar seu próprio cadastro",403);
        const pessoa=await this.buscarPorId(id,requisitante)
        const permitido=(funcoes[requisitante.funcao]?.gerenciar||[]).includes(pessoa.funcao)
        if(!permitido) erro("Acesso negado",403);
        await PessoaModel.ativar(id)
    }

    static async desativar(id,requisitante){
        if(id==requisitante.id) erro("Não pode desativar seu próprio cadastro",403);
        const pessoa=await this.buscarPorId(id,requisitante)
        const permitido=(funcoes[requisitante.funcao]?.gerenciar||[]).includes(pessoa.funcao)
        if(!permitido) erro("Acesso negado",403);
        await PessoaModel.desativar(id)
    }
}

module.exports=PessoaService