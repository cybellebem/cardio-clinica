const ConsultaModel=require("../models/consultaModel")
const PessoaModel = require("../models/pessoaModel")

function erro(msg,status){
    const error=new Error(msg)
    error.status=status
    throw error
}

class ConsultaService{
    static async listar(id_medico){
        return await ConsultaModel.listar(id_medico)
    }

    static async buscarPorId(id_medico,id_consulta){
        const consulta=await ConsultaModel.buscarPorId(id_medico,id_consulta)
        if(!consulta) erro("Consulta não encontrada",404);
        return consulta
    }

    static async incluir(dados){
        const {data_hora,id_paciente,id_medico,sintomas,temperatura,peso,diagnostico,tratamento,status_pagamento}=dados

        if(!data_hora||!id_paciente||!id_medico||!sintomas||temperatura==null||peso==null||!diagnostico||!tratamento) erro("Há campos obrigatórios em branco",400);

        const pacienteExiste=await PessoaModel.buscarPorId(id_paciente)
        if(!pacienteExiste) erro("Paciente não encontrado",404);

        const id=await ConsultaModel.incluir(dados)
        return {message:"Consulta incluída com sucesso",id}
    }
}

module.exports=ConsultaService