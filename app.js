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

app.get('/v2/acmefilmes/filmes',cors(),async function(request, response){
    let dadosFilmes=await controllerFilmes.getListarFilmes()
    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})

app.get('/v2/acmefilmes/filme/:id', cors(), async function(request, response){
    let idFilme=request.params.id
    let dadosFilme=await controllerFilmes.getBuscarFilme(idFilme)
    response.status(dadosFilme.status_code)
    response.json(dadosFilme)
})

app.get('/v2/acmefilmes/filmes/filme',cors(),async function(request, response){
    let nomeFilme=request.query.nome
    let dadosFilmes=await controllerFilmes.getBuscarFilmePeloNome(nomeFilme)
    response.status(dadosFilmes.status_code)
    response.json(dadosFilmes)
})

app.post('/v2/acmefilmes/filme',cors(), bodyParserJSON, async function(request, response){
    let dadosBody=request.body
    let resultDadosNovoFilme=await controllerFilmes.setInserirNovoFilme(dadosBody)
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

app.listen('8080',function(){
    console.log('API no ar!!!')
})