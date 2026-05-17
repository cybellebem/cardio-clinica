const ConsultaModel = require("../models/consultaModel");
const PessoaModel = require("../models/pessoaModel");

class DashboardController {
  static async resumo(req, res) {
    try {
      // consultas do dia
      const consultas = await ConsultaModel.listar();

      // médicos
      const medicos = await PessoaModel.listar(["Medico"]);

      // pacientes
      const pacientes = await PessoaModel.listar(["Paciente"]);

      res.status(200).json({
        consultasHoje: consultas,
        totalConsultas: consultas.length,
        totalPacientes: pacientes.length,
        totalMedicos: medicos.length,
      });
    } catch (error) {
      res.status(error.status || 500).json({
        message: error.message,
      });
    }
  }
}

module.exports = DashboardController;
