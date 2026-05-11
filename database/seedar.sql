use cardio_clinica;

-- admin
insert into pessoas (cpf, nome, data_nascimento, telefone, endereco, senha, crm, status, funcao) values
("06589474001", "Marcos Vinícius Almeida", "1980-01-01", "51990000001", "Rua das Acácias, 120 - Centro", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", NULL, "Ativo", "Admin");

-- atendentes
insert into pessoas (cpf, nome, data_nascimento, telefone, endereco, senha, crm, status, funcao) values
("96145395001", "Juliana Pereira da Silva", "1990-01-01", "51990000006", "Rua Bento Gonçalves, 45 - São Bento", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", NULL, "Ativo", "Atendente"),
("33229115007", "Rafael Oliveira Santos", "1991-02-02", "51990000007", "Av. Independência, 880 - Centro", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", NULL, "Ativo", "Atendente");

-- médicos
insert into pessoas (cpf, nome, data_nascimento, telefone, endereco, senha, crm, status, funcao) values
("03209484040", "Dr. Eduardo Martins Costa", "1975-01-01", "51990000011", "Rua General Osório, 500 - Centro Médico", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", "CRM10001", "Ativo", "Médico"),
("58192477088", "Dra. Camila Ferreira Lopes", "1982-06-15", "51990000012", "Rua Marechal Floriano, 220 - Centro Médico", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", "CRM10002", "Ativo", "Médico");

-- pacientes
insert into pessoas (cpf, nome, data_nascimento, telefone, endereco, senha, crm, status, funcao) values
("00482581050", "Bruno Henrique da Rocha", "2000-01-01", "51990000016", "Rua das Flores, 33 - Bairro Aurora", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", NULL, "Ativo", "Paciente"),
("91751299066", "Larissa Gomes Ribeiro", "2001-02-02", "51990000017", "Rua São João, 150 - Vila Nova", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", NULL, "Ativo", "Paciente"),
("38889378093", "Gabriel Souza Lima", "2002-03-03", "51990000018", "Av. Brasil, 1010 - Centro", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", NULL, "Ativo", "Paciente"),
("76258206026", "Mariana Alves Cardoso", "2003-04-04", "51990000019", "Rua das Hortênsias, 78 - Jardim Europa", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", NULL, "Ativo", "Paciente"),
("49238507015", "Felipe Andrade Nunes", "2004-05-05", "51990000020", "Rua dos Pinheiros, 305 - Industrial", "$2b$10$2p8FM/0v9ENW0WEhNDtCc.aifml3pc6vj7BuUqOqJYRNNMrwiMIwS", NULL, "Ativo", "Paciente");

-- consultas
insert into consultas (data_hora, id_paciente, id_medico, sintomas, temperatura, peso, diagnostico, tratamento, status_pagamento) values
("2026-05-01 08:30:00", 5, 4, "Dor no peito e falta de ar", 36.70, 82.50, "Hipertensão arterial", "Uso de losartana e acompanhamento", "Pago"),
("2026-05-02 10:00:00", 6, 4, "Palpitações frequentes", 36.50, 61.20, "Arritmia leve", "Solicitado eletrocardiograma", "Pendente"),
("2026-05-03 14:15:00", 7, 4, "Cansaço excessivo", 37.00, 75.00, "Insuficiência cardíaca inicial", "Mudança alimentar e medicação", "Pago"),
("2026-05-04 09:45:00", 8, 4, "Pressão alta constante", 36.80, 68.40, "Hipertensão estágio 1", "Controle de sódio e exercícios", "Pendente"),
("2026-05-05 16:20:00", 9, 5, "Dor no braço esquerdo", 37.10, 90.30, "Suspeita de angina", "Encaminhamento para exames", "Pago"),
("2026-05-06 11:00:00", 5, 5, "Tontura e pressão baixa", 36.40, 82.50, "Hipotensão arterial", "Aumento da hidratação e acompanhamento", "Pago");