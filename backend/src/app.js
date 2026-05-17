const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const pessoaRoutes = require("./routes/pessoaRoutes");
const consultaRoutes = require("./routes/consultaRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rotas
app.use("/auth", authRoutes);
app.use("/pessoas", pessoaRoutes);
app.use("/consultas", consultaRoutes);
app.use("/dashboard", dashboardRoutes);

// health check
app.get("/", (req, res) => {
  res.send("API Cardio Clínica funcionando");
});

module.exports = app;
