const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const pacienteRoutes = require("./routes/pacienteRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/auth", authRoutes);
app.use("/pacientes", pacienteRoutes);

app.get("/", (req, res) => {
    res.send("API Cardio Clínica funcionando");
});

module.exports = app;