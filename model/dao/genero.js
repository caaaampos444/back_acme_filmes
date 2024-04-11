const {PrismaClient}=require('@prisma/client')
const e = require('express')

const prisma=new PrismaClient()

const insertGenero=async function(dadosGenero){
    try {

        let sql

        if(dadosFilme.data_falecimento!=''&&
           dadosFilme.data_falecimento!=null&&
           dadosFilme.data_falecimento!=undefined){

            sql=`insert into tbl_ator (
                nome,
                data_nascimento,
                biografia,
                foto,
                id_sexo
            ) values(
                    '${dadosFilme.nome}',
                    '${dadosFilme.data_nascimento}',
                    '${dadosFilme.biografia}',
                    '${dadosFilme.foto}',
                    '${dadosFilme.id_sexo}'
            )`
            let result=await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false 

           }else{

            sql=`insert into tbl_filme (
                nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario
            ) values(
                    '${dadosFilme.nome}',
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.duracao}',
                    '${dadosFilme.data_lancamento}',
                    null,
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor_unitario}'
            )`
            let result=await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false 

           }  
    } catch (error) {
        return false
    }
}

const updateGenero=async function(id, dadosFilme){
    try {
        let sql
        if(dadosFilme.data_relancamento!=''&&
           dadosFilme.data_relancamento!=null&&
           dadosFilme.data_relancamento!=undefined){

            
            sql=`
            update tbl_filme 

            set 
                nome='${dadosFilme.nome}',
                sinopse='${dadosFilme.sinopse}',
                duracao='${dadosFilme.duracao}',
                data_lancamento='${dadosFilme.data_lancamento}',
                data_relancamento='${dadosFilme.data_relancamento}',
                foto_capa='${dadosFilme.foto_capa}',
                valor_unitario='${dadosFilme.valor_unitario}'

            where id='${id}';
        `
        }
        else{

            sql=`

            update tbl_filme 

            set 
                nome='${dadosFilme.nome}',
                sinopse='${dadosFilme.sinopse}',
                duracao='${dadosFilme.duracao}',
                data_lancamento='${dadosFilme.data_lancamento}',
                foto_capa='${dadosFilme.foto_capa}',
                valor_unitario=${dadosFilme.valor_unitario}

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

const deleteGenero=async function(id){
    try {
        let sql=`delete from tbl_filme where id=${id}`
        let rsFilme=await prisma.$executeRawUnsafe(sql)
        return rsFilme
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
        let sql=`select * from tbl_filme where id=${id}`
        let rsFilme=await prisma.$queryRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }
}

const selectByNomeGenero=async function(nome){
    let nomeFilme=nome
    try {
        let sql=`select * from tbl_filme where nome like "%${nomeFilme}%"`
        let rsFilmes=await prisma.$queryRawUnsafe(sql)
        return rsFilmes
    } catch (error) {
        return false
    }
}

const selectLastID=async function(){
    try {
        let sql='select cast(last_insert_id() as decimal) as id from tbl_filme limit 1;'
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