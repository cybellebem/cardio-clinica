insert into pessoas (cpf, nome, data_nascimento, telefone, endereco, senha, status) values
("12345678901", "João Silva", "1985-03-10", "51999990001", "Rua A, 100", "senha1", "Ativo"),
("23456789012", "Maria Oliveira", "1990-07-22", "51999990002", "Rua B, 200", "senha2", "Ativo"),
("34567890123", "Carlos Souza", "1978-11-05", "51999990003", "Rua C, 300", "senha3", "Ativo"),
("45678901234", "Ana Lima", "2000-01-15", "51999990004", "Rua D, 400", "senha4", "Ativo"),
("56789012345", "Pedro Santos", "1995-09-30", "51999990005", "Rua E, 500", "senha5", "Inativo");

insert into funcionarios (id_pessoa, funcao) values
(1, "Admin"),
(2, "Funcionário"),
(3, "Funcionário"),
(4, "Médico"),
(5, "Funcionário");

insert into medicos (id_pessoa, crm) values
(4, "CRM12345"),
(3, "CRM23456"),
(2, "CRM34567"),
(1, "CRM45678"),
(5, "CRM56789");

insert into pacientes (id_pessoa) values
(1),
(2),
(3),
(4),
(5);