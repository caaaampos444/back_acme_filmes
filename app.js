const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const app=express()
app.use((request,response,next) =>{
    response.header('Acess-Control-Allow-Origin','*')
    response.header('Acess-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
    app.use(cors())
    next()
})

const controllerFilmes=require('./controller/controller_filmes.js')
const controllerGeneros=require('./controller/controller_generos.js')

const bodyParserJSON=bodyParser.json()

app.get('/v1/acmefilmes/filme',cors(),async function(request,response,next){
    let controleFilmes=require('./controller/funcoes')
    let listaFilmes=controleFilmes.getFilmes()
    if(listaFilmes){
        response.json(listaFilmes)
        response.status(200)
    }
    else{
        response.status(404)
    }
})

app.get('/v1/acmefilmes/filme/:idUsuario',cors(),async function(request,response,next){
    let idFilme=request.params.idUsuario
    let controleFilmes=require('./controller/funcoes')
    let dadosFilme=controleFilmes.getFilmesID(idFilme)
    if(dadosFilme){
        response.json(dadosFilme)
        response.status(200)
    }
    else{
        response.status(404)
    }
})

//listar tds os filmes
app.get('/v2/acmefilmes/filmes',cors(),async function(request, response){
    let dadosFilmes=await controllerFilmes.getListarFilmes()
    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})


//buscar filme pelo id
app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response){
    let idFilme=request.params.id
    let dadosFilme=await controllerFilmes.getBuscarFilmePeloID(idFilme)
    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})


//buscar filme pelo nome
app.get('/v2/acmefilmes/filmes/filme',cors(),async function(request, response){
    let nomeFilme=request.query.nome
    let dadosFilmes=await controllerFilmes.getBuscarFilmePeloNome(nomeFilme)
    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})


//inserir filme novo
app.post('/v2/acmefilmes/insertfilme',cors(), bodyParserJSON, async function(request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    console.log(dadosBody)
    let resultDadosNovoFilme=await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})


//atualizar filme
app.put('/v2/acmefilmes/updatefilme/:id', cors(), bodyParserJSON, async function(request, response){
    let idFilme=request.params.id
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovoFilme=await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType)
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

//deletar filme
app.delete('/v2/acmefilmes/deletefilme/:id', cors(), async function(request, response){
    let idFilme=request.params.id
    let resultFilmeDeletado=await controllerFilmes.setExcluirFilme(idFilme)
    response.status(resultFilmeDeletado.status_code)
    response.json(resultFilmeDeletado)
})

//listar tds os generos
app.get('/v2/acmefilmes/generos',cors(),async function(request, response){
    let dadosGeneros=await controllerGeneros.getListarGeneros()
    response.status(dadosGeneros.status_code)
    response.json(dadosGeneros)
})

//buscar genero pelo id
app.get('/v2/acmefilmes/genero/:id', cors(), async function(request, response){
    let idGenero=request.params.id
    let dadosGenero=await controllerGeneros.getBuscarGeneroPeloID(idGenero)
    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

//buscar genero pelo nome
app.get('/v2/acmefilmes/generos/genero',cors(),async function(request, response){
    let nomeGenero=request.query.nome
    let dadosGenero=await controllerGeneros.getBuscarGeneroPeloNome(nomeGenero)
    response.status(dadosGenero.status_code)
    response.json(dadosGenero)
})

//inserir genero novo
app.post('/v2/acmefilmes/insertgenero',cors(), bodyParserJSON, async function(request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovoGenero=await controllerGeneros.setInserirNovoGenero(dadosBody, contentType)
    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})

//atualizar genero
app.put('/v2/acmefilmes/updategenero/:id', cors(), bodyParserJSON, async function(request, response){
    let idGenero=request.params.id
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovoGenero=await controllerGeneros.setAtualizarGenero(idGenero, dadosBody, contentType)
    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})

//deletar genero
app.delete('/v2/acmefilmes/deletegenero/:id', cors(), async function(request, response){
    let idGenero=request.params.id
    let resultGeneroDeletado=await controllerGeneros.setExcluirGenero(idGenero)
    response.status(resultGeneroDeletado.status_code)
    response.json(resultGeneroDeletado)
})

app.listen('8080',function(){
    console.log('API no ar!!!')
})