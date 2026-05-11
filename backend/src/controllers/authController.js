const express=require("express")
const PessoaService=require("../services/pessoaService")

class AuthController{
    static async login(req,res){
        try{
            const resultado=await PessoaService.login(req.body)
            return res.status(200).json(resultado)
        }catch(error){
            res.status(error.status||500).json({message:error.message})
        }
    }
}

module.exports=AuthController