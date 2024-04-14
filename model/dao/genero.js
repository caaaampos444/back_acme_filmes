const {PrismaClient}=require('@prisma/client')
const e = require('express')

const prisma=new PrismaClient()

const insertGenero=async function(dadosGenero){
    try {
        let sql=`insert into tbl_genero (
                nome
            ) values(
                    '${dadosGenero.nome}'
            )`
            let result=await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false
    } catch (error) {
        return false
    }
}

const updateGenero=async function(id, dadosGenero){
    try {
        let sql=`
            update tbl_genero 

            set 
                nome='${dadosGenero.nome}'

            where id='${id}';
        `
        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteGenero=async function(id){
    try {
        let sql=`delete from tbl_genero where id=${id}`
        let rsGenero=await prisma.$executeRawUnsafe(sql)
        return rsGenero
    } catch (error) {
        return false
    }
}

const selectAllGeneros=async function(){
    try {
        let sql='select * from tbl_genero;'
        let rsGeneros=await prisma.$queryRawUnsafe(sql)
        return rsGeneros
    } catch (error) {
        return false
    }
}

const selectByIdGenero=async function(id){
    try {
        let sql=`select * from tbl_genero where id=${id}`
        let rsFilme=await prisma.$queryRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }
}

const selectByNomeGenero=async function(nome){
    let nomeGenero=nome
    try {
        let sql=`select * from tbl_genero where nome like "%${nomeGenero}%"`
        let rsGeneros=await prisma.$queryRawUnsafe(sql)
        return rsGeneros
    } catch (error) {
        return false
    }
}

const selectLastID=async function(){
    try {
        let sql='select cast(last_insert_id() as decimal) as id from tbl_genero limit 1;'
        let rsID=await prisma.$queryRawUnsafe(sql)
        return rsID
    } catch (error) {
        return false
    }
}

module.exports={
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGeneros,
    selectByIdGenero,
    selectByNomeGenero,
    selectLastID
}