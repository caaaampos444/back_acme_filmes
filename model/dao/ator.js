const {PrismaClient}=require('@prisma/client')
const e = require('express')

const prisma=new PrismaClient()

const insertAtor=async function(dadosAtor){
    try {

        let sql

        if(dadosAtor.data_falecimento!=''&&
           dadosAtor.data_falecimento!=null&&
           dadosAtor.data_falecimento!=undefined){

            sql=`insert into tbl_ator (
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                id_sexo
            ) values(
                    '${dadosAtor.nome}',
                    '${dadosAtor.data_nascimento}',
                    '${dadosAtor.data_falecimento}',
                    '${dadosAtor.biografia}',
                    '${dadosAtor.foto}',
                    '${dadosAtor.id_sexo}'
            )`
            let result=await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false 

           }else{

            sql=`insert into tbl_ator (
                nome,
                data_nascimento,
                data_falecimento,
                biografia,
                foto,
                id_sexo
            ) values(
                    '${dadosAtor.nome}',
                    '${dadosAtor.data_nascimento}',
                    null,
                    '${dadosAtor.biografia}',
                    '${dadosAtor.foto}',
                    '${dadosAtor.id_sexo}'
            )`
            let result=await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false 

           }  
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateAtor=async function(id, dadosAtor){
    try {
        let sql
        if(dadosAtor.data_falecimento!=''&&
           dadosAtor.data_falecimento!=null&&
           dadosAtor.data_falecimento!=undefined){

            
            sql=`
            update tbl_ator 

            set 
                nome='${dadosAtor.nome}',
                sinopse='${dadosAtor.sinopse}',
                duracao='${dadosAtor.duracao}',
                data_lancamento='${dadosAtor.data_lancamento}',
                data_falecimento='${dadosAtor.data_falecimento}',
                foto_capa='${dadosAtor.foto_capa}',
                valor_unitario='${dadosAtor.valor_unitario}'

            where id='${id}';
        `
        }
        else{

            sql=`

            update tbl_ator 

            set 
                nome='${dadosAtor.nome}',
                sinopse='${dadosAtor.sinopse}',
                duracao='${dadosAtor.duracao}',
                data_lancamento='${dadosAtor.data_lancamento}',
                foto_capa='${dadosAtor.foto_capa}',
                valor_unitario=${dadosAtor.valor_unitario}

            where id='${id}';
        `
        }
        let result=await prisma.$executeRawUnsafe(sql)
        if(result)
            return true
        else
            return false
    } catch (error) {
        return false
    }
}

const deleteAtor=async function(id){
    try {
        let sql=`delete from tbl_ator where id=${id}`
        let rsAtor=await prisma.$executeRawUnsafe(sql)
        return rsAtor
    } catch (error) {
        return false
    }
}

const selectAllAtores=async function(){
    try {
        let sql='select * from tbl_ator'
        let rsAtores=await prisma.$queryRawUnsafe(sql)
        return rsAtores
    } catch (error) {
        return false
    }
}

const selectByIdAtor=async function(id){
    try {
        let sql=`select * from tbl_ator where id=${id}`
        let rsAtor=await prisma.$queryRawUnsafe(sql)
        return rsAtor
    } catch (error) {
        return false
    }
}

const selectByNomeAtor=async function(nome){
    try {
        let sql=`select * from tbl_ator where nome like "%${nome}%"`
        let rsAtores=await prisma.$queryRawUnsafe(sql)
        return rsAtores
    } catch (error) {
        return false
    }
}

const selectLastID=async function(){
    try {
        let sql='select cast(last_insert_id() as decimal) as id from tbl_ator limit 1;'
        let rsID=await prisma.$queryRawUnsafe(sql)
        return rsID
    } catch (error) {
        return false
    }
}

module.exports={
    insertAtor,
    updateAtor,
    deleteAtor,
    selectAllAtores,
    selectByIdAtor,
    selectByNomeAtor,
    selectLastID
}