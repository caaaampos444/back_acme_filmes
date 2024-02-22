const filmeDAO=require('../model/dao/filme.js')
const message=require('../module/config.js')

const setInserirNovoFilme=async function(){

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

const getBuscarFilme=async function(id){
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
    getBuscarFilme,
    getBuscarFilmePeloNome,
    getListarFilmes
}