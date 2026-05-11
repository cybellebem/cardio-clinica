const db=require("../config/database")

class ConsultaModel{
    static async listar(id_medico){
        console.log(id_medico)
        const [resultados]=await db.query("select * from consultas join pessoas on consultas.id_medico=pessoas.id where consultas.id_medico=?",[id_medico])
        return resultados
    }

    static async buscarPorId(id_medico,id_consulta){
        const [resultado]=await db.query("select * from consultas join pessoas on consultas.id_medico=pessoas.id where consultas.id_medico=? and consultas.id=?",[id_medico,id_consulta])
    }
}

module.exports=ConsultaModel