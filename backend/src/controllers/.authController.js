const jwt = require("jsonwebtoken");

const usuarios = [
    {
        id: 1,
        nome: "Dr. João",
        cpf: "12345678900",
        senha: "123456",
        perfil: "medico"
    },
    {
        id: 2,
        nome: "Maria",
        cpf: "98765432100",
        senha: "123456",
        perfil: "atendente"
    }
];

exports.login = (req, res) => {
    const { cpf, senha } = req.body;

    const usuario = usuarios.find(
        (u) => u.cpf === cpf && u.senha === senha
    );

    if (!usuario) {
        return res.status(401).json({ mensagem: "CPF ou senha inválidos" });
    }

    const token = jwt.sign(
        {
            id: usuario.id,
            perfil: usuario.perfil,
            nome: usuario.nome
        },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
    );

    return res.json({
        mensagem: "Login realizado com sucesso",
        token
    });
};