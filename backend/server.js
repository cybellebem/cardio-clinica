require("dotenv").config({quiet:true})
const app = require("./src/app");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Servidor disponível em: http://localhost:${PORT}`);
});