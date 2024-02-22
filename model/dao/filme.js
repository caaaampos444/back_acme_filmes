const {PrismaClient}=require('@prisma/client')

const prisma=new PrismaClient()

const insertFilme=async function(){
}

const updateFilme=async function(){
}

const deleteFilme=async function(){
}

const selectAllFilmes=async function(){
    try {
        let sql='select * from tbl_filme'
        let rsFilmes=await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

const selectByIdFilme=async function(id){
    try {
        let sql=`select * from tbl_filme where id=${id}`
        let rsFilme=await prisma.$queryRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }
}

const selectByNomeFilme=async function(nome){
    let nomeFilme=nome
    try {
        let sql=`select * from tbl_filme where nome like "%${nomeFilme}%"`
        let rsFilmes=await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

module.exports={
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNomeFilme
}