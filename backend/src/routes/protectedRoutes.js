const express=require("express")
const ProtegidoController=require("../controllers/protegidoController")
const {authToken,authRole}=require("../middlewares/authMiddleware")

const router=express.Router()

router.get("/lista",authToken,ProtegidoController.listarPessoas)
router.get("/lista/:id",authToken,ProtegidoController.listarPessoaPorId)
router.post("/incluir",authToken,ProtegidoController.incluirPessoa)
router.put("/atualizar/:id",authToken,ProtegidoController.atualizarPessoa)
router.put("/ativar/:id",authToken,ProtegidoController.ativarPessoa)
router.put("/desativar/:id",authToken,ProtegidoController.desativarPessoa)

module.exports=router