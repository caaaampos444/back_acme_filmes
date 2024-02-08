const filmeDAO=require('../model/dao/filme.js')

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
        filmesJSON.filmes=dadosFilmes
        filmesJSON.quantidade=dadosFilmes.length
        filmesJSON.status_code=200
        return filmesJSON
    }else
        return false
}

const getBuscarFilme=async function(){

}

module.exports={
    setInserirNovoFilme,
    setAtualizarFilme,
    setExcluirFilme,
    getBuscarFilme,
    getListarFilmes
}