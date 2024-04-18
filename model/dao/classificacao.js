const {PrismaClient}=require('@prisma/client')
const e = require('express')

const prisma=new PrismaClient()

const insertClassificacao=async function(dadosClassificacao){
    try {
        let sql=`insert into tbl_classificacao (
                faixa_etaria,
                classificacao,
                caracteristica,
                icone
            ) values(
                    '${dadosClassificacao.faixa_etaria}',
                    '${dadosClassificacao.classificacao}',
                    '${dadosClassificacao.caracteristica}',
                    '${dadosClassificacao.icone}'
            )`
            let result=await prisma.$executeRawUnsafe(sql)
            if(result)
                return true
            else
                return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const updateClassificacao=async function(id, dadosClassificacao){
    try {
        let sql=`
            update tbl_classificacao 

            set 
                faixa_etaria='${dadosClassificacao.faixa_etaria}',
                classificacao='${dadosClassificacao.classificacao}',
                caracteristica='${dadosClassificacao.caracteristica}',
                icone='${dadosClassificacao.icone}'

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

const deleteClassificacao=async function(id){
    try {
        let sql=`delete from tbl_classificacao where id=${id}`
        let rsClassificacao=await prisma.$executeRawUnsafe(sql)
        return rsClassificacao
    } catch (error) {
        return false
    }
}

const selectAllClassificacoes=async function(){
    try {
        let sql='select * from tbl_classificacao;'
        let rsClassificacoes=await prisma.$queryRawUnsafe(sql)
        return rsClassificacoes
    } catch (error) {
        return false
    }
}

const selectByIdClassificacao=async function(id){
    try {
        let sql=`select * from tbl_classificacao where id=${id}`
        let rsClassificacao=await prisma.$queryRawUnsafe(sql)
        return rsClassificacao
    } catch (error) {
        return false
    }
}

const selectByFaixaEtariaClassificacao=async function(faixaEtaria){
    try {
        let sql=`select * from tbl_classificacao where faixa_etaria like "%${faixaEtaria}%"`
        let rsClassificacoes=await prisma.$queryRawUnsafe(sql)
        return rsClassificacoes
    } catch (error) {
        return false
    }
}

const selectLastID=async function(){
    try {
        let sql='select cast(last_insert_id() as decimal) as id from tbl_classificacao limit 1;'
        let rsID=await prisma.$queryRawUnsafe(sql)
        return rsID
    } catch (error) {
        return false
    }
}

module.exports={
    insertClassificacao,
    updateClassificacao,
    deleteClassificacao,
    selectAllClassificacoes,
    selectByIdClassificacao,
    selectByFaixaEtariaClassificacao,
    selectLastID
}