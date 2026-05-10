# Análise

Arquivo com um resumo do que for analisado antes e durante o desenvolvimento, onde pode ser alterado bem como usado como um checklist para ver o que já foi feito e o que está pendente


## Tabelas:

Tabelas do banco de dados

### Pessoa:
- ID único
- CPF
- nome
- data nascimento
- telefone
- endereço
- senha
- CRM (se função=médico)
- status (ativo, desativo)
- função (funcionário, admin, paciente, médico)

### Consulta
- ID único
- data e hora
- ID paciente (pessoa com função=Paciente)
- ID médico (pessoa com função=Médico)
- sintomas
- temperatura
- peso
- diagnóstico
- tratamento
- status pagamento (default="pendente")



## Backend
Rotas a serem feitas

### Médico
- incluir consultas
    - validar se pessoa cadastrada (através do CPF)
    - validar se pessoa tem função paciente
    - validar se pessoa está ativa
    - validar temperatura e peso (valores negativos ou muito grandes)
    - retornar nome e CPF do paciente
    - não retornar dados do médico
- listar consultas (que o médico fez)

### Administrador do site
- gerenciar funcionários: atendente e admin
    - incluir
        - validar se pessoa cadastrada (através do CPF)
    - alterar
        - validar se pessoa cadastrada (através do CPF)
        - validar se pessoa é atendente ou admin
        - alterar: dados pessoa, exceto função
    - ativar
    - desativar
    - listar todos
    - listar específico

### Atendente
- gerenciar médicos e manter pacientes
    - incluir
        - validar se pessoa cadastrada (através do CPF)
        - se médico, validar se médico já cadastrado (através do CRM)
    - alterar
        - validar se pessoa cadastrada (através do CPF)
        - validar se pessoa é médico ou paciente
            - se médico, alterar CRM
        - alterar: dados pessoa, exceto função
    - ativar
    - desativar
    - listar todos
    - listar específico

### Geral
- login e logoff



## Frontend
Telas do frontend a serem feitas

Pelo que já foi enviado, após feito no Figma:
<ol>
    <li>Login</li>
    <li>Dashboard</li>
    <li>Gerenciar médicos</li>
    <li>Gerenciar funcionários</li>
    <li>Gerenciar pacientes</li>
    <li>Incluir consulta</li>
    <li>Dashboard/detalhes consulta</li>
    <li>Dashboard/detalhes médico</li>
    <li>Dashboard detalhes funcionário</li>
    <li>Dashboard detalhes paciente</li>
</ol>

Os números abaixo, ao lado de cada tela, são referência à lista acima

### Login (1)
- Ponto inicial de usuário não autenticado

### Dashboard (2)
- Página inicial usuário logado
- Conteúdo visível varia conteúdo conforme nível de acesso
- Deve ter botões que permitem acessar as outras páginas com rotas específicas
- Barra no topo: logo clínica, nome rota, logo usuário e botão logoff (sempre presente a partir daqui)

### Gerenciar médicos (3)
- Precisa ser atendente
- Lista simples com ID, nome, status, ações (editar + ativar/desativar)
- <div style="font-weight:900;display:inline">(8) Ao clicar em editar, mostrar dados completos do médico específico (popup + background blur), permitindo alteração</div>
- Botão no canto para incluir médico <div style="color:red;display:inline">(redirecionar nova tela ou abrir popup?)</div>

### Manter pacientes (5)
- Precisa ser atendente
- Lista simples com ID, nome, status, ações (editar <div style="color:red;display:inline;">+ ativar/desativar?</div>)
- <div style="font-weight:900;display:inline">(10) Ao clicar em editar, mostrar dados completos do paciente específico (popup + background blur), permitindo alteração</div>
- Botão no canto para incluir paciente <div style="color:red;display:inline">(redirecionar nova tela ou abrir popup?)</div>

### Gerenciar funcionários (4)
- Precisa ser administrador do site
- Lista simples com ID, nome, status, ações (editar + ativar/desativar)
- <div style="font-weight:900;display:inline">(9) Ao clicar em editar, mostrar dados completos do funcionário específico (popup + background blur), permitindo alteração</div>
- Botão no canto para incluir funcionário <div style="color:red;display:inline">(redirecionar nova tela ou abrir popup?)</div>

### Incluir consulta (6)
- Precisa ser médico
- Passos: (porque foi entregue arquivo com caso de uso específico)
    - Pede CPF paciente e valida dados paciente (backend faz essa parte)
    - Mostra dados do paciente (vindo do banco) e do médico (cache)
    - Permite preenchimento dos demais campos <div style="color:red;display:inline">(bloquear antes disso?)</div>
    - No final mostrar alerta ou mensagem que finalizou além de um botão para retornar (página) ou fechar (popup)

### Visualizar consultas (7)
- Precisa ser médico
- Lista simples com ID, nome, status, ação (visualizar)
- Ao clicar em visualizar, mostrar dados completos da consulta específica (popup + background blur)