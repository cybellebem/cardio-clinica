const mysql=require("mysql2/promise")

require("dotenv").config({quiet:true})

async function main(){
    const connection=await mysql.createConnection({
        host:process.env.DB_HOST,
        user:process.env.DB_USER,
        password:process.env.DB_PASSWORD,
    })

    console.log("Deletando banco anterior")
    await connection.execute("drop database if exists cardio_clinica")

    console.log("Criando banco")
    await connection.execute(`
        create database if not exists cardio_clinica
        character set utf8mb4
        collate utf8mb4_unicode_ci
    `)

    console.log("Usando banco")
    await connection.execute("use cardio_clinica")

    console.log("Criando tabela pessoas")
    await connection.execute(`
        create table if not exists pessoas(
            id int auto_increment primary key,
            cpf varchar(20) not null unique,
            nome varchar(100) not null,
            data_nascimento date,
            telefone varchar(50) not null,
            endereco varchar(200),
            senha varchar(255) not null,
            crm varchar(20) unique,
            status enum('Ativo','Inativo') default 'Ativo',
            funcao enum('Atendente','Admin','Paciente','Medico') not null
        )
    `)

    console.log("Criando tabela consultas")
    await connection.execute(`
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
            status_pagamento enum('Pendente','Pago') default 'Pendente',
            foreign key (id_paciente) references pessoas(id),
            foreign key (id_medico) references pessoas(id)
        )
    `)

    console.log("Banco criado com sucesso")

    await connection.end()
}

main()
    .then(()=>console.log("Finalizado"))
    .catch((error)=>console.error(error))