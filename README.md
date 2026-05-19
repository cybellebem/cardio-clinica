# Cardio Clínica

### Descrição

Projeto de um sistema básico para uma clínica de consultas, permitindo cadastramento de médicos, funcionários, pacientes e consultas. A documentação do sistema, como regras de negócio, requisitos e demais diagramas está disponível em um [arquivo do Google Docs](https://docs.google.com/document/d/1Pu9-j4TbNubbAWiRvrwxqBYHwX5gUAm8goxXMvFWJ1E).

## ⚙️ Configuração do Sistema

### 📁 Clone o repositório

```bash
git clone https://github.com/cybellebem/cardio-clinica.git
cd cardio-clinica
```

### 🛠️ Instalação inicial

- Instale os pacotes necessários.
```bash
npm install
```

- Crie um arquivo `.env` na pasta [backend](./backend/), com as configurações essenciais abaixo. Note que o usuário e a senha devem ser alterados conforme a configuração de seu banco de dados local.

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=cardio_clinica
```

- Prepare o banco de dados utilizando a script abaixo, que executa a criação do banco e seu preenchimento com os dados contidos no arquivo [Seed.js](./backend/src/config/seed.js).
```bash
npm run banco
```
- Se o script acima não funcionar, dependendo de qual banco de dados você possui instalado, é possível executar manualmente os comandos SQL disponibilizados no arquivo [Comandos.sql](./database/comandos.sql)

### ▶️ Execução do Sistema

- Windows / Linux:

```bash
npm run backend
npm run frontend
```

- Linux + [tmux](https://github.com/tmux/tmux/wiki):
```
./start.sh
```

### Disponível em:

```
Servidor: http://localhost:3000
Cliente: http://localhost:5173
```

## Login no Sistema:
Os usuários criados automaticamente possuem senha `senha123` e os CPFs estão disponíveis no arquivo [Seed.js](./backend/src/config/seed.js). Alguns exemplos  de usuários:
- Administrador: `06589474001`
- Atendente: `96145395001`
- Médico: `03209484040`
- Paciente: `00482581050`