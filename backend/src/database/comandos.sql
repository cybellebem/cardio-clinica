create database if not exists cardio_clinica;

use cardio_clinica;

create table if not exists pessoas(
    id int auto_increment primary key,
    cpf varchar(20) not null,
    nome varchar(100) not null,
    data_nascimento date not null,
    telefone varchar(50) not null,
    endereco varchar(50) not null,
    status varchar(20) default 'Ativo'
);

create table if not exists funcionarios(
    id int auto_increment primary key,
    id_pessoa int,
    foreign key (id_pessoa) references pessoas(id),
    funcao varchar(50) not null
);

create table if not exists medicos(
    id int auto_increment primary key,
    id_pessoa int,
    foreign key (id_pessoa) references pessoas(id),
    crm varchar(20) not null
);

create table if not exists pacientes(
    id int auto_increment primary key,
    id_pessoa int,
    foreign key (id_pessoa) references pessoas(id)
);

create table if not exists consultas(
    id int auto_increment primary key,
    data_hora date not null,
    id_paciente int,
    id_medico int,
    foreign key (id_paciente) references pacientes(id),
    foreign key (id_medico) references medicos(id),
    sintomas varchar(200) not null,
    temperatura int not null,
    peso int not null,
    diagnostico varchar(200) not null,
    tratamento varchar(200) not null,
    status_pagamento varchar(20) default 'Pendente'
)