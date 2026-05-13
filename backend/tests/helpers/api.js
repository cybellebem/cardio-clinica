const request=require("supertest")
const app=require("../../src/app")

function api(token){
    const base=(method,url)=>request(app)[method](url).set("Authorization",`Bearer ${token}`)

    return{
        get:(url)=>base("get",url),
        post:(url)=>base("post",url),
        put:(url)=>base("put",url)
    }
}

module.exports=api