create database if not exists cardio_clinica;

use cardio_clinica;

create table if not exists pessoas(
    id int auto_increment primary key,
    cpf varchar(20) not null unique,
    nome varchar(100) not null,
    data_nascimento date not null,
    telefone varchar(50) not null,
    endereco varchar(200) not null,
    senha varchar(255) not null,
    crm varchar(20) unique,
    status enum("Ativo","Inativo") default "Ativo",
    funcao enum("Atendente","Admin","Paciente","Médico") not null
);

create table if not exists consultas(
    id int auto_increment primary key,
    data_hora datetime not null,
    id_paciente int not null,
    id_medico int not null,
    sintomas varchar(200) not null,
    temperatura decimal(5,2) not null,
    peso decimal(5,2) not null,
    diagnostico varchar(200) not null,
    tratamento varchar(200) not null,
    status_pagamento enum("Pendente","Pago") default 'Pendente',
    foreign key (id_paciente) references pessoas(id),
    foreign key (id_medico) references pessoas(id)
);