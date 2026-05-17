const rotas={
    pessoas:{
        lista:(funcao)=>`/pessoas/funcao/${funcao}`,
        porId:(id)=>`/pessoas/${id}`,
        ativar:(id)=>`/pessoas/ativar/${id}`,
        desativar:(id)=>`/pessoas/desativar/${id}`,
        atualizar:(id)=>`/pessoas/atualizar/${id}`,
        incluir:"/pessoas/incluir"
    },
    consultas:{
        lista:"/consultas",
        porId:(id)=>`/consultas/${id}`,
        incluir:"/consultas/incluir"
    },
    auth:{
        login:"/auth/login"
    }
}

module.exports=rotas