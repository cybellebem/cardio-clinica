const DashboardService = require("../services/dashboardService");

class DashboardController {
  static async resumo(req, res) {
    try {
      const resultado = await DashboardService.resumo();

      return res.status(200).json(resultado);
    } catch (error) {
      return res.status(500).json({
        message: error.message,
      });
    }
  }
}

module.exports = DashboardController;