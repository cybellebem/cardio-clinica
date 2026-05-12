const app=require("../src/app")
const request=require("supertest")
const db=require("../src/config/database")
const id=require("./valores")
var token

const idSelf=1

beforeAll(async () => {
    await db.query(`
        update pessoas
        set status='Ativo'
        where cpf in ('03209484040','96145395001','06589474001')
    `)
})

describe("Health Check",()=>{
    test("ping",async()=>{
        const res=await request(app).get("/")
        expect(res.statusCode).toBe(200)
    })
})

describe("Login",()=>{
    test("logar",async()=>{
        const res=await request(app)
            .post("/auth/login")
            .send({"cpf":"06589474001","senha":"senha123"})
        expect(res.statusCode).toBe(200)
        expect(res.body.token).toBeDefined()
        expect(typeof res.body.token).toBe("string")
        expect(res.body.token.length).toBeGreaterThan(10)
        token=res.body.token
    })
})

describe("Listagens",()=>{
    test("lista todos os usuários",async()=>{
        const res=await request(app)
            .get("/pessoas/lista")
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("lista paciente específico",async()=>{
        const res=await request(app)
            .get(`/pessoas/lista/${id.paciente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("lista médico específico",async()=>{
        const res=await request(app)
            .get(`/pessoas/lista/${id.medico}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("lista admin específico",async()=>{
        const res=await request(app)
            .get(`/pessoas/lista/${id.admin}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("lista atendente específico",async()=>{
        const res=await request(app)
            .get(`/pessoas/lista/${id.atendente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("lista a si mesmo",async()=>{
        const res=await request(app)
            .get(`/pessoas/lista/${idSelf}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("NÃO lista consultas",async()=>{
        const res=await request(app)
            .get("/consultas/lista")
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO lista consulta específica",async()=>{
        const res=await request(app)
            .get(`/consultas/lista/${id.consulta}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })
})

describe("Ativar e desativar",()=>{
    test("NÃO ativa médico específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/ativar/${id.medico}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO desativa médico específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/desativar/${id.medico}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO ativa paciente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/ativar/${id.paciente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO desativa paciente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/desativar/${id.paciente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO ativa a si mesmo",async()=>{
        const res=await request(app)
            .put(`/pessoas/ativar/${idSelf}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO desativa a si mesmo",async()=>{
        const res=await request(app)
            .put(`/pessoas/desativar/${idSelf}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("ativa admin específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/ativar/${id.admin}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("desativa admin específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/desativar/${id.admin}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("ativa atendente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/ativar/${id.atendente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("desativa atendente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/desativar/${id.atendente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})

describe("Alterações",()=>{
    test("NÃO altera médico específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${id.medico}`)
            .send({
                "cpf": "99894784062",
                "nome": "Dra. Camila Ferreira Lopes",
                "data_nascimento": "1982-06-15",
                "endereco": "Rua Marechal Floriano, 220 - Centro Médico",
                "crm": "CRM10002"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO altera paciente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${id.paciente}`)
            .send({
                "cpf":"00482581050",
                "nome":"Bruno Henrique da Rocha",
                "data_nascimento":"2000-01-01",
                "telefone":"51990000016"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("altera admin específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${id.admin}`)
            .send({
                "cpf": "57303635084",
                "nome": "Rogério Teixeira de Barros",
                "telefone": "51988766542"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("altera atendente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${id.atendente}`)
            .send({
                "cpf": "33229115007",
                "nome": "Rafael Oliveira Santos",
                "data_nascimento": "1991-02-02",
                "telefone": "53990000007",
                "endereco": "Av. Independência, 880 - Centro"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("altera a si mesmo",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${idSelf}`)
            .send({
                "cpf": "06589474001",
                "nome": "Marcos Vinícius Almeida",
                "data_nascimento": "1980-01-01",
                "telefone": "51990000001",
                "endereco": "Rua das Acácias, 120 - Centro"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})

describe("Inclusões",()=>{
    test("cadastra admin",async()=>{
        const res=await request(app)
            .post("/pessoas/incluir")
            .send({
                "cpf":"46809872000",
                "nome":"João da Silva",
                "data_nascimento":"1980-01-01",
                "telefone":"51990000001",
                "endereco":"Rua Assis Brasil, 120",
                "senha":"senha123",
                "funcao":"Admin"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(201)
    })

    test("cadastra atendente",async()=>{
        const res=await request(app)
            .post("/pessoas/incluir")
            .send({
                "cpf": "40744490057",
                "nome": "Lúcio Varela Montenegro",
                "data_nascimento": "1974-11-23",
                "telefone": "51987340219",
                "endereco": "Rua dos Jacarandás, 903 - Vila Hípica",
                "senha": "V4r3l@#1974",
                "funcao": "Atendente"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(201)
    })

    test("NÃO cadastra médico",async()=>{
        const res=await request(app)
            .post("/pessoas/incluir")
            .send({
                "cpf": "747.906.860-35",
                "nome": "Dr. Eduardo Martins Costa",
                "data_nascimento": "1975-01-01",
                "telefone": "51990000011",
                "endereco": "Rua General Osório, 500 - Centro Médico",
                "senha": "senha123",
                "crm": "CRM11001",
                "funcao": "Médico"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO cadastra paciente",async()=>{
        const res=await request(app)
            .post("/pessoas/incluir")
            .send({
                "cpf": "64958949020",
                "nome": "Mariana Alves Ferreira",
                "data_nascimento": "1975-01-01",
                "telefone": "51988887766",
                "endereco": "Av. Independência, 1200",
                "senha": "senha123",
                "funcao": "Paciente"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })
    
    test("NÃO cadastra consulta",async()=>{
        const res=await request(app)
            .post("/consultas/incluir")
            .send({
                data_hora: "2026-05-01 08:30:00",
                id_paciente: 5,
                sintomas: "Dor no peito e falta de ar",
                temperatura: 36.70,
                peso: 82.50,
                diagnostico: "Hipertensão arterial",
                tratamento: "Uso de losartana e acompanhamento",
                status_pagamento: "Pago"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })
})

afterAll(async()=>{
    await db.end()
})