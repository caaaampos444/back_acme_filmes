const {PrismaClient}=require('@prisma/client')
const e = require('express')

const prisma=new PrismaClient()

const insertAtor=async function(dadosAtor){
    try {

        let sql

        //caso o ator ja tenha falecido
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
            if(result){
                let idAtor=await selectLastID()
                for(let nacionalidade of dadosAtor.id_nacionalidade){
                    sql=`insert into tbl_nacionalidade_ator(
                            id_nacionalidade,
                            id_ator
                        ) values(
                            ${nacionalidade},
                            ${idAtor[0].id}
                        )`
                    let result=await prisma.$executeRawUnsafe(sql)
                    //enquanto os dados estiverem sendo inseridos o loop vai continuar, caso aconteça algum erro, o código para e retorna falso
                    if(result)
                        continue
                    else
                        return false
                }
                //caso chegue até aqui é pq inseriu corretamente os dados da nacionalidade, então só retorna verdadeiro para indicar q deu certo
                return true
            }
            //se o result n deu certo nada deu certo ent retorna falso
            else
                return false 
           }
           //caso o ator nao tenha falecido
           else{
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
            if(result){
                let idAtor=await selectLastID()
                for(let nacionalidade of dadosAtor.id_nacionalidade){
                    sql=`insert into tbl_nacionalidade_ator(
                            id_nacionalidade,
                            id_ator
                        ) values(
                            ${nacionalidade},
                            ${idAtor[0].id}
                        )`
                    let result=await prisma.$executeRawUnsafe(sql)
                    if(result)
                        continue
                    else
                        return false
                }
                return true
            }
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
                data_nascimento='${dadosAtor.data_nascimento}',
                data_falecimento='${dadosAtor.data_falecimento}',
                foto='${dadosAtor.foto}',
                biografia='${dadosAtor.biografia}',
                id_sexo=${dadosAtor.id_sexo}

            where id='${id}';
        `
        }
        else{

            sql=`

            update tbl_ator 

            set 
                nome='${dadosAtor.nome}',
                data_nascimento='${dadosAtor.data_nascimento}',
                foto='${dadosAtor.foto}',
                biografia='${dadosAtor.biografia}',
                id_sexo=${dadosAtor.id_sexo}

            where id='${id}';
        `
        }
        let result=await prisma.$executeRawUnsafe(sql)
        if(result){
            sql=`delete from tbl_nacionalidade_ator where id_ator=${id}`
            result=await prisma.$executeRawUnsafe(sql)
            for(let nacionalidade of dadosAtor.id_nacionalidade){
                sql=`insert into tbl_nacionalidade_ator(
                    id_nacionalidade,
                    id_ator
                ) values(
                    ${nacionalidade},
                    ${id}
                )`
                let result=await prisma.$executeRawUnsafe(sql)
                if(result)
                    continue
                else
                    return false
            }
            return true
        }
        else
            return false
    } catch (error) {
        console.log(error)
        return false
    }
}

const deleteAtor=async function(id){
    try {
        let sql=`delete from tbl_nacionalidade_ator where id_ator=${id}`
        let rsIntermediaria=await prisma.$executeRawUnsafe(sql)
        if(rsIntermediaria){
            sql=`delete from tbl_ator where id=${id}`
            let rsAtor=await prisma.$executeRawUnsafe(sql)
            return rsAtor
        }else{
            return false
        }
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
        console.log(error)
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

const selectFilmes=async function(id){
    try {
        let sql=`select f.nome from tbl_filme_ator as i
        join tbl_filme as f on i.id_filme=f.id
        join tbl_ator as a on i.id_ator=a.id
        where a.id=${id};`
        let rsFilmes=await prisma.$queryRawUnsafe(sql)
        return rsFilmes
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
    selectLastID,
    selectFilmes
}