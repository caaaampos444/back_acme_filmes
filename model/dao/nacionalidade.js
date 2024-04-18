const {PrismaClient}=require('@prisma/client')
const e = require('express')

const prisma=new PrismaClient()

const selectAllNacionalidades=async function(){
    try {
        let sql='select * from tbl_nacionalidade'
        let rsNacionalidades=await prisma.$queryRawUnsafe(sql)
        return rsNacionalidades
    } catch (error) {
        return false
    }
}

const selectByIDNacionalidade=async function(id){
    try {
        let sql=`select * from tbl_nacionalidade where id=${id}`
        let rsNacionalidade=await prisma.$queryRawUnsafe(sql)
        return rsNacionalidade
    } catch (error) {
        return false
    }
}

const selectByNomeNacionalidade=async function(nome){
    try {
        let sql=`select * from tbl_nacionalidade where nome like "%${nome}%"`
        let rsNacionalidades=await prisma.$queryRawUnsafe(sql)
        return rsNacionalidades
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllNacionalidades,
    selectByIDNacionalidade,
    selectByNomeNacionalidade
}