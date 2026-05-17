const app=require("../src/app")
const request=require("supertest")
const db=require("../src/config/database")
const id=require("./valores")
const apiFactory=require("./helpers/api")
const esperaStatus=require("./helpers/status")
const rotas=require("./helpers/routes")

var token,api
const idSelf=7

beforeAll(async () => {
    await db.query(`
        update pessoas
        set status='Ativo'
        where cpf in ('03209484040','96145395001','06589474001','91751299066')
    `)

    const res=await request(app)
        .post(rotas.auth.login)
        .send({"cpf":"91751299066","senha":"senha123"})
    
    token=res.body.token
    api=apiFactory(token)
})

describe("Health Check",()=>{
    test("ping",async()=>{
        const res=await request(app).get("/")
        expect(res.statusCode).toBe(200)
    })
})

describe("Listagens",()=>{
    const casos=[
        ["NÃO lista médicos",rotas.pessoas.lista("Medico"),403],
        ["NÃO lista pacientes",rotas.pessoas.lista("Paciente"),403],
        ["NÃO lista atendentes",rotas.pessoas.lista("Atendente"),403],
        ["NÃO lista admins",rotas.pessoas.lista("Admin"),403],
        ["NÃO lista paciente específico",rotas.pessoas.porId(id.paciente),403],
        ["NÃO lista médico específico",rotas.pessoas.porId(id.medico),403],
        ["NÃO lista admin específico",rotas.pessoas.porId(id.admin),403],
        ["NÃO lista atendente específico",rotas.pessoas.porId(id.atendente),403],
        ["NÃO lista a si mesmo",rotas.pessoas.porId(idSelf),403],
        ["NÃO lista consultas",rotas.consultas.lista,403],
        ["NÃO lista consulta específica",rotas.consultas.porId(id.consulta),403]
    ]

    test.each(casos)("%s",async(_,url,status)=>{
        const res=await api.get(url)
        esperaStatus(res,status)
    })
})

describe("Ativar e desativar",()=>{
    const casos=[
        ["NÃO ativa médico específico",rotas.pessoas.ativar(id.medico),403],
        ["NÃO ativa paciente específico",rotas.pessoas.ativar(id.paciente),403],
        ["NÃO ativa a si mesmo",rotas.pessoas.ativar(idSelf),403],
        ["NÃO ativa admin específico",rotas.pessoas.ativar(id.admin),403],
        ["NÃO ativa atendente específico",rotas.pessoas.ativar(id.atendente),403],

        ["NÃO desativa médico específico",rotas.pessoas.desativar(id.medico),403],
        ["NÃO desativa paciente específico",rotas.pessoas.desativar(id.paciente),403],
        ["NÃO desativa a si mesmo",rotas.pessoas.desativar(idSelf),403],
        ["NÃO desativa admin específico",rotas.pessoas.desativar(id.admin),403],
        ["NÃO desativa atendente específico",rotas.pessoas.desativar(id.atendente),403]
    ]
    
    test.each(casos)("%s",async(_,url,status)=>{
        const res=await api.put(url)
        esperaStatus(res,status)
    })
})

describe("Alterações",()=>{
    const casos=[
        ["NÃO altera médico específico",
        rotas.pessoas.atualizar(id.medico),{
            "cpf": "99894784062",
            "nome": "Dra. Camila Ferreira Lopes",
            "data_nascimento": "1982-06-15",
            "endereco": "Rua Marechal Floriano, 220 - Centro Médico",
            "crm": "CRM10002"
        },403],
        ["NÃO altera paciente específico",
        rotas.pessoas.atualizar(id.paciente),{
            "cpf":"00482581050",
            "nome":"Bruno Henrique da Rocha",
            "data_nascimento":"2000-01-01",
            "telefone":"51990000016"
        },403],
        ["NÃO altera admin específico",
        rotas.pessoas.atualizar(id.admin),{
            "cpf": "57303635084",
            "nome": "Rogério Teixeira de Barros",
            "telefone": "51988766542"
        },403],
        ["NÃO altera atendente específico",
        rotas.pessoas.atualizar(id.atendente),{
            "cpf": "33229115007",
            "nome": "Rafael Oliveira Santos",
            "data_nascimento": "1991-02-02",
            "telefone": "53990000007",
            "endereco": "Av. Independência, 880 - Centro"
        },403],
        ["NÃO altera a si mesmo",
        rotas.pessoas.atualizar(idSelf),{
            "cpf": "06589474001",
            "nome": "Marcos Vinícius Almeida",
            "data_nascimento": "1980-01-01",
            "telefone": "51990000001",
            "endereco": "Rua das Acácias, 120 - Centro"
        },403]
    ]

    test.each(casos)("%s",async(_,url,dados,status)=>{
        const res=await api.put(url).send(dados)
        esperaStatus(res,status)
    })
    
})

describe("Inclusões",()=>{
    const casos=[
        ["NÃO cadastra admin",rotas.pessoas.incluir,{
            "cpf":"46809872000",
            "nome":"João da Silva",
            "data_nascimento":"1980-01-01",
            "telefone":"51990000001",
            "endereco":"Rua Assis Brasil, 120",
            "senha":"senha123",
            "funcao":"Admin"
        },403],
        ["NÃO cadastra atendente",rotas.pessoas.incluir,{
            "cpf": "40744490057",
            "nome": "Lúcio Varela Montenegro",
            "data_nascimento": "1974-11-23",
            "telefone": "51987340219",
            "endereco": "Rua dos Jacarandás, 903 - Vila Hípica",
            "senha": "V4r3l@#1974",
            "funcao": "Atendente"
        },403],
        ["NÃO cadastra médico",rotas.pessoas.incluir,{
            "cpf": "747.906.860-35",
            "nome": "Dr. Eduardo Martins Costa",
            "data_nascimento": "1975-01-01",
            "telefone": "51990000011",
            "endereco": "Rua General Osório, 500 - Centro Médico",
            "senha": "senha123",
            "crm": "CRM11001",
            "funcao": "Medico"
        },403],
        ["NÃO cadastra paciente",rotas.pessoas.incluir,{
            "cpf": "64958949020",
            "nome": "Mariana Alves Ferreira",
            "data_nascimento": "1975-01-01",
            "telefone": "51988887766",
            "endereco": "Av. Independência, 1200",
            "senha": "senha123",
            "funcao": "Paciente"
        },403],
        ["NÃO cadastra consulta",rotas.consultas.incluir,{
            "data_hora": "2026-05-01 08:30:00",
            "id_paciente": 5,
            "sintomas": "Dor no peito e falta de ar",
            "temperatura": 36.70,
            "peso": 82.50,
            "diagnostico": "Hipertensão arterial",
            "tratamento": "Uso de losartana e acompanhamento",
            "status_pagamento": "Pago"
        },403]
    ]

    test.each(casos)("%s",async(_,url,dados,status)=>{
        const res=await api.post(url).send(dados)
        esperaStatus(res,status)
    })
})

afterAll(async()=>{
    await db.end()
})