const DashboardModel = require("../models/dashboardModel");

class DashboardService {
  static async resumo() {
    const consultasHoje = await DashboardModel.consultasHoje();

    const totalPacientes = await DashboardModel.totalPacientes();

    const totalMedicos = await DashboardModel.totalMedicos();

    const totalConsultas = await DashboardModel.totalConsultas();

    return {
      consultasHoje,
      totalPacientes,
      totalMedicos,
      totalConsultas,
    };
  }
}

module.exports = DashboardService;