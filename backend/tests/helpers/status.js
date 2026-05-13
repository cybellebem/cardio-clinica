function esperaStatus(res,status){
    expect(res.statusCode).toBe(status)
}

module.exports=esperaStatus