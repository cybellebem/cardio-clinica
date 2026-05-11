const ConsultaService=require("../services/consultaService")

class ConsultaController{
    static async listarConsultas(req,res){
        try{
            const resultado=await ConsultaService.listar(req.pessoa.id)
            res.status(200).json({consultas:resultado})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }

    static async listarConsultaPorId(req,res){
        try{
            const id=req.params.id
            const resultado=await ConsultaService.buscarPorId(req.pessoa.id,id)
            res.status(200).json({consulta:resultado})
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }
}

module.exports=ConsultaController