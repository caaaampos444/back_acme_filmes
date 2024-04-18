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
const controllerClassificacoes=require('./controller/controller_classificacao.js')

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
app.post('/v2/acmefilmes/filme/insert',cors(), bodyParserJSON, async function(request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovoFilme=await controllerFilmes.setInserirNovoFilme(dadosBody, contentType)
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})


//atualizar filme
app.put('/v2/acmefilmes/filme/update/:id', cors(), bodyParserJSON, async function(request, response){
    let idFilme=request.params.id
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovoFilme=await controllerFilmes.setAtualizarFilme(idFilme, dadosBody, contentType)
    response.status(resultDadosNovoFilme.status_code)
    response.json(resultDadosNovoFilme)
})

//deletar filme
app.delete('/v2/acmefilmes/filme/delete/:id', cors(), async function(request, response){
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
app.post('/v2/acmefilmes/genero/insert',cors(), bodyParserJSON, async function(request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovoGenero=await controllerGeneros.setInserirNovoGenero(dadosBody, contentType)
    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})

//atualizar genero
app.put('/v2/acmefilmes/genero/update/:id', cors(), bodyParserJSON, async function(request, response){
    let idGenero=request.params.id
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovoGenero=await controllerGeneros.setAtualizarGenero(idGenero, dadosBody, contentType)
    response.status(resultDadosNovoGenero.status_code)
    response.json(resultDadosNovoGenero)
})

//deletar genero
app.delete('/v2/acmefilmes/genero/delete/:id', cors(), async function(request, response){
    let idGenero=request.params.id
    let resultGeneroDeletado=await controllerGeneros.setExcluirGenero(idGenero)
    response.status(resultGeneroDeletado.status_code)
    response.json(resultGeneroDeletado)
})

//listar tds as classificacoes
app.get('/v2/acmefilmes/classificacoes',cors(),async function(request, response){
    let dadosClassificacoes=await controllerClassificacoes.getListarClassificacoes()
    response.status(dadosClassificacoes.status_code)
    response.json(dadosClassificacoes)
})

//buscar classificaçao pelo id
app.get('/v2/acmefilmes/classificacao/:id', cors(), async function(request, response){
    let idClassificacao=request.params.id
    let dadosClassificacao=await controllerClassificacoes.getBuscarClassificacaoPeloID(idClassificacao)
    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

//buscar classificaçao pela faixa etaria
app.get('/v2/acmefilmes/classificacoes/classificacao',cors(),async function(request, response){
    let faixaEtaria=request.query.f
    let dadosClassificacao=await controllerClassificacoes.getBuscarClassificacaoPelaFaixaEtaria(faixaEtaria)
    response.status(dadosClassificacao.status_code)
    response.json(dadosClassificacao)
})

//inserir classificaçao nova
app.post('/v2/acmefilmes/classificacao/insert',cors(), bodyParserJSON, async function(request, response){
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosNovaClassificacao=await controllerClassificacoes.setInserirNovaClassificacao(dadosBody, contentType)
    response.status(resultDadosNovaClassificacao.status_code)
    response.json(resultDadosNovaClassificacao)
})

//atualizar genero
app.put('/v2/acmefilmes/classificacao/update/:id', cors(), bodyParserJSON, async function(request, response){
    let idClassificacao=request.params.id
    let contentType=request.headers['content-type']
    let dadosBody=request.body
    let resultDadosClassificacaoAtualizada=await controllerClassificacoes.setAtualizarClassificacao(idClassificacao, dadosBody, contentType)
    response.status(resultDadosClassificacaoAtualizada.status_code)
    response.json(resultDadosClassificacaoAtualizada)
})

//deletar genero
app.delete('/v2/acmefilmes/classificacao/delete/:id', cors(), async function(request, response){
    let idClassificacao=request.params.id
    let resultClassificacaoDeletada=await controllerClassificacoes.setExcluirClassificacao(idClassificacao)
    response.status(resultClassificacaoDeletada.status_code)
    response.json(resultClassificacaoDeletada)
})

app.listen('8080',function(){
    console.log('API no ar!!!')
})