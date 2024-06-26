const atorDAO=require('../model/dao/ator.js')
const sexoDAO=require('../model/dao/sexo.js')
const nacionalidadeDAO=require('../model/dao/nacionalidade.js')
const message=require('../module/config.js')

const setInserirNovoAtor=async function(dadosAtor, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            function saoInteiros(dados) {
                return dados.id_nacionalidade.every(function(valor) {
                  return Number.isInteger(valor)
                });
            }
            let novoAtorJSON={}
            let ultimoID
            let verificaDadosNacionalidade=saoInteiros(dadosAtor)
            if(
            dadosAtor.nome==''             ||dadosAtor.nome==undefined             ||dadosAtor.nome==null                  ||dadosAtor.nome.length>100            ||
            dadosAtor.data_nascimento==''  ||dadosAtor.data_nascimento==undefined  ||dadosAtor.data_nascimento==null       ||dadosAtor.data_nascimento.length!=10 ||
            dadosAtor.biografia==''        ||dadosAtor.biografia==undefined        ||dadosAtor.biografia==null             ||dadosAtor.biografia.length>65000     ||
            dadosAtor.foto==''             ||dadosAtor.foto==undefined             ||dadosAtor.foto==null                  ||dadosAtor.foto.length>150            ||
            dadosAtor.id_sexo==''          ||dadosAtor.id_sexo==undefined          ||dadosAtor.id_sexo==null               ||dadosAtor.id_sexo>2                  ||
            isNaN(dadosAtor.id_sexo)       ||dadosAtor.id_nacionalidade.length==0  ||dadosAtor.id_nacionalidade==undefined ||dadosAtor.id_nacionalidade==null     
        
            )
                return message.ERROR_REQUIRED_FIELDS
            else{
                let validateStatus=false
                if(dadosAtor.data_falecimento!=null&&dadosAtor.data_falecimento!=''&&dadosAtor.data_falecimento!=undefined){
                    if(dadosAtor.data_falecimento.length!=10){
                        return message.ERROR_REQUIRED_FIELDS
                    }else{
                        validateStatus=true
                    }
                }else{
                    validateStatus=true
                }
    
                if(validateStatus){
                    let novoAtor=await atorDAO.insertAtor(dadosAtor)
                    if(novoAtor){
                        novoAtorJSON.ator=dadosAtor
                        novoAtorJSON.status=message.SUCCESS_CREATED_ITEM.status
                        novoAtorJSON.status_code=message.SUCCESS_CREATED_ITEM.status_code
                        novoAtorJSON.message=message.SUCCESS_CREATED_ITEM.message
                        ultimoID=await atorDAO.selectLastID()
                        dadosAtor.id=ultimoID[0].id               
                        return novoAtorJSON
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

const setAtualizarAtor=async function(id, dadosAtor, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let idAtor=id
            if(idAtor==''||idAtor==undefined||isNaN(idAtor))
                return message.ERROR_INVALID_ID
            else if(dadosAtor.id_nacionalidade==null||dadosAtor.id_nacionalidade==undefined)
                return message.ERROR_REQUIRED_FIELDS
            else{
                let ator=await atorDAO.selectByIdAtor(idAtor)
                if(ator){
                    let atorAtualizadoJSON={}
                    let atorAtualizado=await atorDAO.updateAtor(idAtor, dadosAtor)
                    if(atorAtualizado){
                        atorAtualizadoJSON.ator=dadosAtor
                        atorAtualizadoJSON.status=message.SUCCES_UPDATED_ITEM.status
                        atorAtualizadoJSON.status_code=message.SUCCES_UPDATED_ITEM.status_code
                        atorAtualizadoJSON.message=message.SUCCES_UPDATED_ITEM.message
                        return atorAtualizadoJSON
                    }
                    else
                        return message.ERROR_INTERNAL_SERVER_DB
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

const setExcluirAtor=async function(id){
    try {
        let idAtor=id
        if(idAtor==''||idAtor==undefined||isNaN(idAtor))
            return message.ERROR_INVALID_ID
        else{
            let comando=await atorDAO.deleteAtor(idAtor)
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

const getListarAtores=async function(){
    try {
        let atoresJSON={}
        let dadosAtores=await atorDAO.selectAllAtores()
        if(dadosAtores){
            if(dadosAtores.length>0){
                for (let ator of dadosAtores){
                    ator.filmes=await atorDAO.selectFilmes(ator.id)
                    ator.sexo = await sexoDAO.selectByIDSexo(ator.id_sexo)
                    ator.nacionalidade = await nacionalidadeDAO.selectByIDNacionalidade(ator.id)
                    delete ator.id_sexo
                }
                atoresJSON.atores=dadosAtores
                atoresJSON.quantidade=dadosAtores.length
                atoresJSON.status_code=200
                return atoresJSON
            }else
                return message.ERROR_NOT_FOUND
        }else
            return message.ERROR_INTERNAL_SERVER_DB
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarAtorPeloID=async function(id){
    try {
        let idAtor=id
        let atoresJSON={}
        if(idAtor==''||idAtor==undefined||isNaN(idAtor))
            return message.ERROR_INVALID_ID
        else{
            let dadosAtor=await atorDAO.selectByIdAtor(idAtor)
            if(dadosAtor){
                if(dadosAtor.length>0){
                    for (let ator of dadosAtor){
                        ator.filmes=await atorDAO.selectFilmes(ator.id)
                        ator.sexo = await sexoDAO.selectByIDSexo(ator.id_sexo)
                        ator.nacionalidade = await nacionalidadeDAO.selectByIDNacionalidade(ator.id)
                        delete ator.id_sexo
                    }
                    atoresJSON.ator=dadosAtor
                    atoresJSON.status_code=200
                    return atoresJSON
                }else
                    return message.ERROR_NOT_FOUND
            }else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarAtorPeloNome=async function(nome){
    try {
        let nomeAtor=nome
        let atoresJSON={}
        if(nomeAtor==''||nomeAtor==undefined||!isNaN(nomeAtor))
            return message.ERROR_INVALID_ID
        else{
            let dadosAtores=await atorDAO.selectByNomeAtor(nomeAtor)
            if(dadosAtores){
                if(dadosAtores.length>0){
                    for (let ator of dadosAtores){
                        ator.filmes=await atorDAO.selectFilmes(ator.id)
                        ator.sexo = await sexoDAO.selectByIDSexo(ator.id_sexo)
                        ator.nacionalidade = await nacionalidadeDAO.selectByIDNacionalidade(ator.id)
                        delete ator.id_sexo
                    }
                    atoresJSON.atores=dadosAtores
                    atoresJSON.status_code=200
                    return atoresJSON
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
    setInserirNovoAtor,
    setAtualizarAtor,
    setExcluirAtor,
    getBuscarAtorPeloID,
    getBuscarAtorPeloNome,
    getListarAtores
}