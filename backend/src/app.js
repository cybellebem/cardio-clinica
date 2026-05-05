const express = require("express");
const cors = require("cors");

const protegidoRoutes=require("./routes/protegidoRoutes")

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// rotas
app.use("/",protegidoRoutes)

// health check
app.get("/", (req, res) => {
    res.send("API Cardio Clínica funcionando");
});

module.exports = app;