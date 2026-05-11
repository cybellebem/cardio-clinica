const express=require("express")
const PessoaController=require("../controllers/pessoaController")
const {authToken,authRole}=require("../middlewares/authMiddleware")

const router=express.Router()

// pessoas
router.get("/lista",authToken,PessoaController.listarPessoas)
router.get("/lista/:id",authToken,PessoaController.listarPessoaPorId)
router.post("/incluir",authToken,PessoaController.incluirPessoa)
router.put("/atualizar/:id",authToken,PessoaController.atualizarPessoa)
router.put("/ativar/:id",authToken,PessoaController.ativarPessoa)
router.put("/desativar/:id",authToken,PessoaController.desativarPessoa)

module.exports=router