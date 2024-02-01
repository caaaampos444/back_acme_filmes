const dadosFilmes=require('../module/filmes.js')

const getFilmes=function(){
    let arrayFilmes=[]
    let contador=0
    let status=false
    while(contador<dadosFilmes.filmes.length){
        let JSONFilmes={}
        JSONFilmes.nome=dadosFilmes.filmes[contador].nome
        JSONFilmes.sinopse=dadosFilmes.filmes[contador].sinopse
        JSONFilmes.duracao=dadosFilmes.filmes[contador].duracao
        JSONFilmes.data_lancamento=dadosFilmes.filmes[contador].data_lancamento
        JSONFilmes.data_relancamento=dadosFilmes.filmes[contador].data_relancamento
        JSONFilmes.foto_capa=dadosFilmes.filmes[contador].foto_capa
        JSONFilmes.valor_unitario=dadosFilmes.filmes[contador].valor_unitario
        arrayFilmes.push(JSONFilmes)
        contador++
        status=true
    }
    if(status)
        return arrayFilmes
    else
        return false
}

const getFilmesID=function(idUsuario){
    let JSONFilmes={}
    let contador=0
    let filtro=idUsuario
    let status=false
    while(true){
        if(filtro==dadosFilmes.filmes[contador].id){
            JSONFilmes.nome=dadosFilmes.filmes[contador].nome
            JSONFilmes.sinopse=dadosFilmes.filmes[contador].sinopse
            JSONFilmes.duracao=dadosFilmes.filmes[contador].duracao
            JSONFilmes.data_lancamento=dadosFilmes.filmes[contador].data_lancamento
            JSONFilmes.data_relancamento=dadosFilmes.filmes[contador].data_relancamento
            JSONFilmes.foto_capa=dadosFilmes.filmes[contador].foto_capa
            JSONFilmes.valor_unitario=dadosFilmes.filmes[contador].valor_unitario
            status=true
            break
        }
        contador++
    }
    if(status)
        return JSONFilmes
    else
        return false
}

module.exports={getFilmes,getFilmesID}