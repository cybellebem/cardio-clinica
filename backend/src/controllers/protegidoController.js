const PessoaService=require("../services/pessoaService")

class ProtegidoController{
    static async listarPessoas(req,res){
        try{
            const result=await PessoaService.listar(req.pessoa.funcao)
            res.status(200).json({pessoas:result})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async listarPessoaPorId(req,res){
        try{
            const id=req.params.id
            const resultado=await PessoaService.buscarPorId(id,req.pessoa.funcao)
            res.status(200).json({pessoa:resultado})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async incluirPessoa(req,res){
        try{
            const resultado=await PessoaService.criar(req.body,req.pessoa.funcao)
            return res.status(201).json(resultado)
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async atualizarPessoa(req,res){
        try{
            const id=req.params.id
            const pessoa=await PessoaService.atualizar(id,req.body,req.pessoa.funcao)
            return res.status(200).json({message:"Atualizado com sucesso",pessoaAtualizada:{
                id:pessoa.id,
                nome:pessoa.nome,
                status:pessoa.status,
                funcao:pessoa.funcao,
            }})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async ativarPessoa(req,res){
        try{
            const id=req.params.id
            const result=await PessoaService.ativar(id,req.pessoa.funcao)
            return res.status(200).json({message:"Usuário ativado com sucesso",id:id})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async desativarPessoa(req,res){
        try{
            const id=req.params.id
            const result=await PessoaService.desativar(id,req.pessoa.funcao)
            return res.status(200).json({message:"Usuário desativado com sucesso",id:id})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }
}

module.exports=ProtegidoController