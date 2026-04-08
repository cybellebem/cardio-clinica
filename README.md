
# Cardio Clínica

---

## 📁 Clonar o repositório

```bash
git clone https://github.com/cybellebem/cardio-clinica.git
cd cardio-clinica
```

---

## ⚙️ Configuração do Backend

```bash
cd backend

npm init -y
npm install express cors dotenv bcrypt jsonwebtoken
npm install --save-dev nodemon
```

### Configurar scripts no `package.json`

```json
{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "src/server.js",
  "scripts": {
    "dev": "nodemon src/server.js",
    "start": "node src/server.js"
  },
    ...
}
```

### Criar arquivo `.env`

```env
PORT=3000
JWT_SECRET=sua_chave_secreta
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=sua_senha
DB_NAME=cardio_clinica
```

---

### ▶️ Rodar o backend

```bash
npm run dev
```

Servidor disponível em:

```
http://localhost:3000
```

---