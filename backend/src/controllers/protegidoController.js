const PessoaService=require("../services/pessoaService")

class ProtegidoController{
    static async listarPessoas(req,res){
        try{
            const result=await PessoaService.listar()
            res.status(200).json({pessoas:result})
        }catch(err){
            res.status(500).json({erro:err.message})
        }
    }

    static async incluirPessoa(req,res){
        try{
            // console.log(req.body)
            const resultado=await PessoaService.criar(req.body)
            return res.status(200).json(resultado)
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }
}

module.exports=ProtegidoController