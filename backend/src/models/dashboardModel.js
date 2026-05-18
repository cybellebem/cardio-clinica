const db = require("../config/database");

class DashboardModel {
  static async consultasHoje() {
    const [rows] = await db.query(`
      SELECT
        c.id,
        TIME(c.data_hora) AS hora,
        p.nome AS paciente,
        m.nome AS medico,
        c.status_pagamento
      FROM consultas c
      JOIN pessoas p
        ON p.id = c.id_paciente
      JOIN pessoas m
        ON m.id = c.id_medico
      WHERE DATE(c.data_hora) = CURDATE()
      ORDER BY c.data_hora ASC
    `);

    return rows;
  }

  static async totalPacientes() {
    const [rows] = await db.query(`
      SELECT COUNT(*) AS total
      FROM pessoas
      WHERE funcao = 'Paciente'
    `);

    return rows[0].total;
  }

  static async totalMedicos() {
    const [rows] = await db.query(`
      SELECT COUNT(*) AS total
      FROM pessoas
      WHERE funcao = 'Medico'
    `);

    return rows[0].total;
  }

  static async totalConsultas() {
    const [rows] = await db.query(`
      SELECT COUNT(*) AS total
      FROM consultas
    `);

    return rows[0].total;
  }
}

module.exports = DashboardModel;