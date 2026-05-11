const express=require("express");
const cors=require("cors");

const pessoaRoutes=require("./routes/protectedRoutes")
const authRoutes=require("./routes/authRoutes")

const app=express();

// middlewares
app.use(cors());
app.use(express.json());

// rotas
app.use("/auth",authRoutes)
app.use("/pessoas",pessoaRoutes)

// health check
app.get("/", (req, res) => {
    res.send("API Cardio Clínica funcionando");
});

module.exports = app;