const {PrismaClient}=require('@prisma/client')
const e = require('express')

const prisma=new PrismaClient()

const selectAllSexos=async function(){
    try {
        let sql='select * from tbl_sexo'
        let rsSexos=await prisma.$queryRawUnsafe(sql)
        return rsSexos
    } catch (error) {
        return false
    }
}

const selectByIDSexo=async function(id){
    try {
        let sql=`select * from tbl_sexo where id=${id}`
        let rsSexo=await prisma.$queryRawUnsafe(sql)
        return rsSexo
    } catch (error) {
        return false
    }
}

const selectByNomeSexo=async function(nome){
    try {
        let sql=`select * from tbl_sexo where nome like "%${nome}%"`
        let rsSexos=await prisma.$queryRawUnsafe(sql)
        return rsSexos
    } catch (error) {
        return false
    }
}

module.exports={
    selectAllSexos,
    selectByIDSexo,
    selectByNomeSexo
}