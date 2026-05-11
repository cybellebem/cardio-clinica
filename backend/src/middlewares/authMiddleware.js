const jwt=require("jsonwebtoken")

function authToken(req,res,next){
    const authHeader=req.headers["authorization"]
    if(!authHeader) return res.status(401).json({message:"Token não informado"})

    const token=authHeader.split(" ")[1]
    if(!token) return res.status(401).json({message:"Não autenticado"})

    jwt.verify(token,process.env.JWT_SECRET,(error,pessoa)=>{
        if(error) return res.status(403).json({message:"Acesso proibido"})
        req.pessoa=pessoa
        next()
    })
}

function authRole(funcao){
    return(req,res,next)=>{
        if(!req.pessoa) return res.status(401).json({message:"Não autenticado"});
        if(req.pessoa.funcao!==funcao) return res.status(403).json({message:"Acesso proibido"});
        next()
    }
}

module.exports={authToken,authRole}