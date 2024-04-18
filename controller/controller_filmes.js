const filmeDAO=require('../model/dao/filme.js')
const message=require('../module/config.js')

const setInserirNovoFilme=async function(dadosFilme, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let novoFilmeJSON={}
            let ultimoID
            if(
            dadosFilme.nome==''                ||dadosFilme.nome==undefined             ||dadosFilme.nome==null             ||dadosFilme.nome.length>80             ||
            dadosFilme.sinopse==''             ||dadosFilme.sinopse==undefined          ||dadosFilme.sinopse==null          ||dadosFilme.sinopse.length>65000       ||
            dadosFilme.duracao==''             ||dadosFilme.duracao==undefined          ||dadosFilme.duracao==null          ||dadosFilme.duracao.length>8           ||
            dadosFilme.data_lancamento==''     ||dadosFilme.data_lancamento==undefined  ||dadosFilme.data_lancamento==null  ||dadosFilme.data_lancamento.length!=10 ||
            dadosFilme.foto_capa==''           ||dadosFilme.foto_capa==undefined        ||dadosFilme.foto_capa==null        ||dadosFilme.foto_capa.length>200       ||
            dadosFilme.valor_unitario.length>6 ||
            dadosFilme.id_classificacao==''    ||dadosFilme.id_classificacao==undefined ||dadosFilme.id_classificacao==null ||dadosFilme.id_classificacao>6
            )
                return message.ERROR_REQUIRED_FIELDS
            else{
                let validateStatus=false
                if(dadosFilme.data_relancamento!=null&&dadosFilme.data_relancamento!=''&&dadosFilme.data_relancamento!=undefined){
                    if(dadosFilme.data_relancamento.length!=10){
                        return message.ERROR_REQUIRED_FIELDS
                    }else{
                        validateStatus=true
                    }
                }else{
                    validateStatus=true
                }
    
                if(validateStatus){
                    let novoFilme=await filmeDAO.insertFilme(dadosFilme)
                    if(novoFilme){
                        novoFilmeJSON.filme=dadosFilme
                        novoFilmeJSON.status=message.SUCCESS_CREATED_ITEM.status
                        novoFilmeJSON.status_code=message.SUCCESS_CREATED_ITEM.status_code
                        novoFilmeJSON.message=message.SUCCESS_CREATED_ITEM.message
                        ultimoID=await filmeDAO.selectLastID()
                        dadosFilme.id=ultimoID[0].id               
                        return novoFilmeJSON
                    }
    
                    else{
                        return message.ERROR_INTERNAL_SERVER_DB
                    }
                }
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarFilme=async function(id, dadosFilme, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let idFilme=id
            if(idFilme==''||idFilme==undefined||isNaN(idFilme))
                return message.ERROR_INVALID_ID
            else{
                let filme=await filmeDAO.selectByIdFilme(idFilme)
                if(filme){
                    let filmeAtualizadoJSON={}
                    let filmeAtualizado=await filmeDAO.updateFilme(idFilme, dadosFilme)
                    if(filmeAtualizado){
                        filmeAtualizadoJSON.filme=dadosFilme
                        filmeAtualizadoJSON.status=message.SUCCES_UPDATED_ITEM.status
                        filmeAtualizadoJSON.status_code=message.SUCCES_UPDATED_ITEM.status_code
                        filmeAtualizadoJSON.message=message.SUCCES_UPDATED_ITEM.message
                        return filmeAtualizadoJSON
                    }
                    else{
                        return message.ERROR_NOT_FOUND
                    }
                }
                else
                    return message.ERROR_NOT_FOUND
            }
        }else{
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirFilme=async function(id){
    try {
        let idFilme=id
        if(idFilme==''||idFilme==undefined||isNaN(idFilme))
            return message.ERROR_INVALID_ID
        else{
            let comando=await filmeDAO.deleteFilme(idFilme)
            if(comando)
                return message.SUCCESS_DELETED_ITEM
            else{
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarFilmes=async function(){
    try {
        let filmesJSON={}
        let dadosFilmes=await filmeDAO.selectAllFilmes()
        if(dadosFilmes){
            if(dadosFilmes.length>0){
                filmesJSON.filmes=dadosFilmes
                filmesJSON.quantidade=dadosFilmes.length
                filmesJSON.status_code=200
                return filmesJSON
            }else
                return message.ERROR_NOT_FOUND
        }else
            return message.ERROR_INTERNAL_SERVER_DB
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarFilmePeloID=async function(id){
    try {
        let idFilme=id
        let filmesJSON={}
        if(idFilme==''||idFilme==undefined||isNaN(idFilme))
            return message.ERROR_INVALID_ID
        else{
            let dadosFilme=await filmeDAO.selectByIdFilme(idFilme)
            if(dadosFilme){
                if(dadosFilme.length>0){
                filmesJSON.filme=dadosFilme
                filmesJSON.status_code=200
                return filmesJSON
                }else
                    return message.ERROR_NOT_FOUND
            }else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarFilmePeloNome=async function(nome){
    try {
        let nomeFilme=nome
        let filmesJSON={}
        if(nomeFilme==''||nomeFilme==undefined||!isNaN(nomeFilme))
            return message.ERROR_INVALID_ID
        else{
            let dadosFilmes=await filmeDAO.selectByNomeFilme(nomeFilme)
            if(dadosFilmes){
                if(dadosFilmes.length>0){
                    filmesJSON.filmes=dadosFilmes
                    filmesJSON.status_code=200
                    return filmesJSON
                }else
                    return message.ERROR_NOT_FOUND
            }
            else
                return message.ERROR_INTERNAL_SERVER_DB
    }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports={
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getBuscarFilmePeloID,
    getBuscarFilmePeloNome,
    getListarFilmes
}