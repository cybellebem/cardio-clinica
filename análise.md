# Análise

Arquivo com um resumo do que for analisado antes e durante o desenvolvimento, onde pode ser alterado bem como usado como um checklist para ver o que já foi feito e o que está pendente

Se alterado, favor marcar em amarelo as alterações, principalmente durante o desenvolvimento

## Tabelas:

Tabelas do banco de dados

### Pessoa:
- ID único
- CPF
- nome
- data nascimento
- telefone
- endereço
- status (ativo,desativo,bloqueado?,outros)

### Funcionário:
- ID único
- ID pessoa (HERANÇA Pessoa)
- função
- OBS: nada impede que ele seja um paciente também, em algum momento

### Médico:
- ID único
- ID pessoa (HERANÇA Pessoa)
- CRM

### Paciente:
- ID único
- ID pessoa (HERANÇA Pessoa)

### Consulta
- ID único
- data e hora
- ID paciente
- ID médico
- sintomas
- temperatura
- peso
- diagnóstico
- tratamento
- status pagamento (default="pendente")



## Backend
Rotas a serem feitas

### Nível Médico
- incluir consulta
    - validar CPF paciente
    - validar temperatura+peso (intervalo valores)
    - importante retornar nome e CPF do paciente
    - dados do médico já devem estar em cache, não precisaria retornar
- visualizar consultas (que ele fez)

### Nível Administrador do site
- gerenciar funcionários
    - incluir
    - alterar
    - ativar
    - desativar

### Atendente
- gerenciar médicos
    - incluir
    - alterar
    - ativar
    - desativar
- manter pacientes
    - incluir
    - alterar
    - <div style="color:red;"> permitir ativar/desativar? incerto</div>

### Geral
- login e logoff



# Frontend
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