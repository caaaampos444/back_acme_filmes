const filmeDAO=require('../model/dao/filme.js')
const message=require('../module/config.js')

const setInserirNovoFilme=async function(dadosFilme){
    let novoFilmeJSON={}
    let ultimoID
    if(dadosFilme.nome==''            ||dadosFilme.nome==undefined            ||dadosFilme.nome==null            ||dadosFilme.nome.length>80             ||
       dadosFilme.sinopse==''         ||dadosFilme.sinopse==undefined         ||dadosFilme.sinopse==null         ||dadosFilme.sinopse.length>65000       ||
       dadosFilme.duracao==''         ||dadosFilme.duracao==undefined         ||dadosFilme.duracao==null         ||dadosFilme.duracao.length>8           ||
       dadosFilme.data_lancamento=='' ||dadosFilme.data_lancamento==undefined ||dadosFilme.data_lancamento==null ||dadosFilme.data_lancamento.length!=10 ||
       dadosFilme.foto_capa==''       ||dadosFilme.foto_capa==undefined       ||dadosFilme.foto_capa==null       ||dadosFilme.foto_capa.length>200       ||
       dadosFilme.valor_unitario.length>6
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
}

const setAtualizarFilme=async function(){

}

const setExcluirFilme=async function(){

}

const getListarFilmes=async function(){
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
}

const getBuscarFilmePeloID=async function(id){
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
}

const getBuscarFilmePeloNome=async function(nome){
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
}

module.exports={
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getBuscarFilmePeloID,
    getBuscarFilmePeloNome,
    getListarFilmes
}