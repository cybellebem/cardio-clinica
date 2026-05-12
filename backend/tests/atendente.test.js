const app=require("../src/app")
const request=require("supertest")
const db=require("../src/config/database")
var token

const idSelf=2,idPaciente=6,idMedico=5,idAdmin=1,idAtendente=3,idConsulta=1

beforeAll(async () => {
    await db.query(`
        update pessoas
        set status='Ativo'
        where cpf in ('03209484040','96145395001')
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
            .send({"cpf":"96145395001","senha":"senha123"})
        expect(res.statusCode).toBe(200)
        expect(res.body.token).toBeDefined()
        expect(typeof res.body.token).toBe("string")
        expect(res.body.token.length).toBeGreaterThan(10)
        token=res.body.token
    })
})

describe("Listagens",()=>{
    test("listar médicos e pacientes",async()=>{
        const res=await request(app)
            .get("/pessoas/lista")
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("lista médico específico",async()=>{
        const res=await request(app)
            .get(`/pessoas/lista/${idMedico}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("lista paciente específico",async()=>{
        const res=await request(app)
            .get(`/pessoas/lista/${idPaciente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("NÃO lista admin específico",async()=>{
        const res=await request(app)
            .get(`/pessoas/lista/${idAdmin}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO lista atendente específico",async()=>{
        const res=await request(app)
            .get(`/pessoas/lista/${idAtendente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
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
            .get(`/consultas/lista/${idConsulta}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })
})

describe("Ativar e desativar",()=>{
    test("ativa médico específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/ativar/${idMedico}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("desativa médico específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/desativar/${idMedico}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("ativa paciente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/ativar/${idPaciente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("desativa paciente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/desativar/${idPaciente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
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

    test("NÃO ativa admin específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/ativar/${idAdmin}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO desativa admin específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/desativar/${idAdmin}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO ativa atendente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/ativar/${idAtendente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO desativa atendente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/desativar/${idAtendente}`)
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })
})

describe("Alterações",()=>{
    test("altera médico específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${idMedico}`)
            .send({
                "cpf": "99894784062",
                "nome": "Dra. Camila Ferreira Lopes",
                "data_nascimento": "1982-06-15",
                "endereco": "Rua Marechal Floriano, 220 - Centro Médico",
                "crm": "CRM10002"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("altera paciente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${idPaciente}`)
            .send({
                "cpf":"00482581050",
                "nome":"Bruno Henrique da Rocha",
                "data_nascimento":"2000-01-01",
                "telefone":"51990000016"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })

    test("NÃO altera admin específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${idAdmin}`)
            .send({
                "cpf": "06589474001",
                "nome": "Marcos Vinícius Almeida",
                "telefone": "51990000001"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("NÃO altera atendente específico",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${idAtendente}`)
            .send({
                "cpf": "33229115007",
                "nome": "Rafael Oliveira Santos",
                "data_nascimento": "1991-02-02",
                "telefone": "51990000007",
                "endereco": "Av. Independência, 880 - Centro"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("altera a si mesmo",async()=>{
        const res=await request(app)
            .put(`/pessoas/atualizar/${idSelf}`)
            .send({
                "cpf": "96145395001",
                "nome": "Juliana Pereira da Silva",
                "data_nascimento": "1990-01-01",
                "telefone": "51990000006",
                "endereco": "Rua Bento Gonçalves, 45 - São Bento"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(200)
    })
})

describe("Inclusões",()=>{
    test("NÃO cadastra admin",async()=>{
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
        expect(res.statusCode).toBe(403)
    })

    test("NÃO cadastra atendente",async()=>{
        const res=await request(app)
            .post("/pessoas/incluir")
            .send({
                "cpf":"46809872000",
                "nome":"João da Silva",
                "data_nascimento":"1980-01-01",
                "telefone":"51990000001",
                "endereco":"Rua Assis Brasil, 120",
                "senha":"senha123",
                "funcao":"Atendente"
            })
            .set("Authorization",`Bearer ${token}`)
        expect(res.statusCode).toBe(403)
    })

    test("cadastra médico",async()=>{
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
        expect(res.statusCode).toBe(201)
    })

    test("cadastra paciente",async()=>{
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
        expect(res.statusCode).toBe(201)
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