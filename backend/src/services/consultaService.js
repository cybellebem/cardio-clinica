const ConsultaModel=require("../models/consultaModel")

function erro(msg,status){
    const error=new Error(msg)
    error.status=status
    throw error
}

class ConsultaService{
    static async listar(id_medico){
        console.log(id_medico)
        return await ConsultaModel.listar(id_medico)
    }

    static async buscarPorId(id_medico,id_consulta){
        const consulta=await ConsultaModel.buscarPorId(id_medico,id_consulta)
        if(!consulta) erro("Consulta não encontrada",404);
        return consulta
    }
}

module.exports=ConsultaService