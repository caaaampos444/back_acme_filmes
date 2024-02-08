const {PrismaClient}=require('@prisma/client')

const prisma=new PrismaClient()

const insertFilme=async function(){

}

const updateFilme=async function(){
    
}

const deleteFilme=async function(){

}

const selectAllFilmes=async function(){
    let sql='select * from tbl_filme'
    let rsFilmes=await prisma.$queryRawUnsafe(sql)
    if(rsFilmes.length>0)
        return rsFilmes
    else
        return false
}

const selectByIdFilme=async function(){

}

module.exports={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme
}