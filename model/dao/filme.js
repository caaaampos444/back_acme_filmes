const {PrismaClient}=require('@prisma/client')
const e = require('express')

const prisma=new PrismaClient()

const insertFilme=async function(dadosFilme){
    try {

        let sql

        if(dadosFilme.data_relancamento!=''&&
           dadosFilme.data_relancamento!=null&&
           dadosFilme.data_relancamento!=undefined){

            sql=`insert into tbl_filme (
                nome,
                sinopse,
                duracao,
                data_lancamento,
                data_relancamento,
                foto_capa,
                valor_unitario,
                id_classificacao
            ) values(
                    '${dadosFilme.nome}',
                    '${dadosFilme.sinopse}',
                    '${dadosFilme.duracao}',
                    '${dadosFilme.data_lancamento}',
                    '${dadosFilme.data_relancamento}',
                    '${dadosFilme.foto_capa}',
                    '${dadosFilme.valor_unitario}',
                    ${dadosFilme.id_classificacao}
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
                    '${dadosFilme.valor_unitario}',
                    ${dadosFilme.id_classificacao}
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

const updateFilme=async function(id, dadosFilme){
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

const deleteFilme=async function(id){
    try {
        let sql=`delete from tbl_filme where id=${id}`
        let rsFilme=await prisma.$executeRawUnsafe(sql)
        return rsFilme
    } catch (error) {
        return false
    }
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

const selectAtores=async function(id){
    try {
        let sql=`select a.nome from tbl_filme_ator as i
        join tbl_filme as f on i.id_filme=f.id
        join tbl_ator as a on i.id_ator=a.id
        where f.id=${id}`
        let rsAtores=await prisma.$queryRawUnsafe(sql)
        return rsAtores
    } catch (error) {
        return false
    }
}

const selectDiretores=async function(id){
    try {
        let sql=`select d.nome from tbl_filme_diretor as i
        join tbl_filme as f on i.id_filme=f.id
        join tbl_diretor as d on i.id_diretor=d.id
        where f.id=${id}`
        let rsDiretores=await prisma.$queryRawUnsafe(sql)
        return rsDiretores
    } catch (error) {
        return false
    }
}

const selectGeneros=async function(id){
    try {
        let sql=`select g.nome from tbl_filme_genero as i
        join tbl_filme as f on i.id_filme=f.id
        join tbl_genero as g on i.id_genero=g.id
        where f.id=${id}`
        let rsGeneros=await prisma.$queryRawUnsafe(sql)
        return rsGeneros
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
    insertFilme,
    updateFilme,
    deleteFilme,
    selectAllFilmes,
    selectByIdFilme,
    selectByNomeFilme,
    selectLastID,
    selectAtores,
    selectDiretores,
    selectGeneros
}