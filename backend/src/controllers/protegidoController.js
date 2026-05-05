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
}

module.exports=ProtegidoController