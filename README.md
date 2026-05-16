# Cardio Clínica

### Descrição

Projeto de um sistema básico para uma clínica de consultas, permitindo cadastramento de médicos, funcionários, pacientes e consultas. A documentação do sistema, como regras de negócio, requisitos e demais diagramas está em um [arquivo do Google Docs](https://docs.google.com/document/d/1Pu9-j4TbNubbAWiRvrwxqBYHwX5gUAm8goxXMvFWJ1E)

## 📁 Clonar o repositório

```bash
git clone https://github.com/cybellebem/cardio-clinica.git
cd cardio-clinica
```


## ⚙️ Configuração do Sistema

### Instalação inicial

- Pacotes necessários
```bash
npm install
```
- Preparação do banco de dados
```bash
npm run banco
```

### Criar arquivo `.env` na pasta [backend](./backend/)

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_DATABASE=cardio_clinica
```

### ▶️ Execução do sistema

```bash
npm run backend
npm run frontend
```

### Disponível em:

```
Servidor: http://localhost:3000
Cliente: http://localhost:5173
```