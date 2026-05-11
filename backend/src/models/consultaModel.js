const db=require("../config/database")

const baseSelect=`
    select
        consultas.*,
        medico.nome as medico_nome,
        medico.crm as medico_crm,
        paciente.nome as paciente_nome
    from consultas
    join pessoas as medico on consultas.id_medico=medico.id
    join pessoas as paciente on consultas.id_paciente=paciente.id`

class ConsultaModel{
    static async listar(id_medico){
        const [resultados]=await db.query(`
            ${baseSelect}
            where consultas.id_medico=?
        `,[id_medico])
        return resultados
    }

    static async buscarPorId(id_medico,id_consulta){
        const [resultado]=await db.query(`
            ${baseSelect}
            where consultas.id_medico=? and consultas.id=?
        `,[id_medico,id_consulta])
        return resultado[0]
    }

    static async incluir(dados){
        const {data_hora,id_paciente,id_medico,sintomas,temperatura,peso,diagnostico,tratamento}=dados
        const [resultado]=await db.query(
            "insert into consultas (data_hora,id_paciente,id_medico,sintomas,temperatura,peso,diagnostico,tratamento) values (?,?,?,?,?,?,?,?)",
            [data_hora,id_paciente,id_medico,sintomas,temperatura,peso,diagnostico,tratamento]
        )
        return resultado.insertId
    }
}

module.exports=ConsultaModel