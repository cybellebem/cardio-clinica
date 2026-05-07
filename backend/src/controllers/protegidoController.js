const PessoaService=require("../services/pessoaService")

class ProtegidoController{
    static async listarPessoas(req,res){
        try{
            const result=await PessoaService.listar()
            res.status(200).json({pessoas:result})
        }catch(err){
            res.status(error.status||500).json({erro:err.message})
        }
    }

    static async listarPessoaPorId(req,res){
        try{
            const id=req.params.id
            const resultado=await PessoaService.buscarPorId(id)
            res.status(200).json({pessoa:resultado})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async incluirPessoa(req,res){
        try{
            // console.log(req.body)
            const resultado=await PessoaService.criar(req.body)
            return res.status(201).json(resultado)
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async atualizarPessoa(req,res){
        try{
            const result=await PessoaService.atualizar(req.body)
            return res.status(200).json({message:"Atualizado com sucesso",id:req.body.id})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async ativarPessoa(req,res){
        try{
            const id=req.params.id
            const result=await PessoaService.ativar(id)
            return res.status(200).json({message:"Usuário ativado com sucesso",id:id})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async desativarPessoa(req,res){
        try{
            const id=req.params.id
            const result=await PessoaService.desativar(id)
            return res.status(200).json({message:"Usuário desativado com sucesso",id:id})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }
}

module.exports=ProtegidoController