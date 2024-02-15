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

const selectByNomeFilme=async function(nome){
    let filtro=nome
    let sql=`select * from tbl_filme where nome like '${filtro}'`
    let rsFilmes=await prisma.$queryRawUnsafe(sql)
    if(rsFilmes.length>0)
        return rsFilmes
    else
        return false
}

module.exports={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNomeFilme
}