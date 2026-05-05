const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const PessoaModel=require("../models/pessoaModel")

class PessoaService{
    static async listar(){
        return await PessoaModel.listar()
    }
}

module.exports=PessoaService