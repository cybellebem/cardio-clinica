let pacientes = [
    {
        id: 1,
        cpf: "11111111111",
        nome: "Carlos Silva",
        telefone: "54999999999",
        data_nascimento: "1990-05-10"
    }
];

exports.listar = (req, res) => {
    res.json(pacientes);
};

exports.criar = (req, res) => {
    const { cpf, nome, telefone, data_nascimento } = req.body;

    if (!cpf || !nome || !telefone || !data_nascimento) {
        return res.status(400).json({
            mensagem: "Todos os campos são obrigatórios"
        });
    }

    const pacienteExistente = pacientes.find((p) => p.cpf === cpf);

    if (pacienteExistente) {
        return res.status(400).json({
            mensagem: "Já existe paciente com esse CPF"
        });
    }

    const novoPaciente = {
        id: pacientes.length + 1,
        cpf,
        nome,
        telefone,
        data_nascimento
    };

    pacientes.push(novoPaciente);

    res.status(201).json({
        mensagem: "Paciente cadastrado com sucesso",
        paciente: novoPaciente
    });
};