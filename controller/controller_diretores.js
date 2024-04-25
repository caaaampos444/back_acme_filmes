const diretorDAO=require('../model/dao/diretor.js')
const sexoDAO=require('../model/dao/sexo.js')
const nacionalidadeDAO=require('../model/dao/nacionalidade.js')
const message=require('../module/config.js')

const setInserirNovoDiretor=async function(dadosDiretor, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            function saoInteiros(dados) {
                return dados.id_nacionalidade.every(function(valor) {
                  return Number.isInteger(valor)
                })
            }
            let novoDiretorJSON={}
            let ultimoID
            let verificaDadosNacionalidade=saoInteiros(dadosDiretor)
            if(
            dadosDiretor.nome==''             ||dadosDiretor.nome==undefined             ||dadosDiretor.nome==null                  ||dadosDiretor.nome.length>100            ||
            dadosDiretor.data_nascimento==''  ||dadosDiretor.data_nascimento==undefined  ||dadosDiretor.data_nascimento==null       ||dadosDiretor.data_nascimento.length!=10 ||
            dadosDiretor.biografia==''        ||dadosDiretor.biografia==undefined        ||dadosDiretor.biografia==null             ||dadosDiretor.biografia.length>65000     ||
            dadosDiretor.foto==''             ||dadosDiretor.foto==undefined             ||dadosDiretor.foto==null                  ||dadosDiretor.foto.length>150            ||
            dadosDiretor.id_sexo==''          ||dadosDiretor.id_sexo==undefined          ||dadosDiretor.id_sexo==null               ||dadosDiretor.id_sexo>2                  ||
            isNaN(dadosDiretor.id_sexo)       ||dadosDiretor.id_nacionalidade.length==0  ||dadosDiretor.id_nacionalidade==undefined ||dadosDiretor.id_nacionalidade==null     ||
            verificaDadosNacionalidade==false
            )
                return message.ERROR_REQUIRED_FIELDS
            else{
                let validateStatus=false
                if(dadosDiretor.data_falecimento!=null&&dadosDiretor.data_falecimento!=''&&dadosDiretor.data_falecimento!=undefined){
                    if(dadosDiretor.data_falecimento.length!=10){
                        return message.ERROR_REQUIRED_FIELDS
                    }else{
                        validateStatus=true
                    }
                }else{
                    validateStatus=true
                }
    
                if(validateStatus){
                    let novoDiretor=await diretorDAO.insertDiretor(dadosDiretor)
                    if(novoDiretor){
                        novoDiretorJSON.diretor=dadosDiretor
                        novoDiretorJSON.status=message.SUCCESS_CREATED_ITEM.status
                        novoDiretorJSON.status_code=message.SUCCESS_CREATED_ITEM.status_code
                        novoDiretorJSON.message=message.SUCCESS_CREATED_ITEM.message
                        ultimoID=await diretorDAO.selectLastID()
                        dadosDiretor.id=ultimoID[0].id               
                        return novoDiretorJSON
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

const setAtualizarDiretor=async function(id, dadosDiretor, contentType){
    try {
        if(String(contentType).toLowerCase()=='application/json'){
            let idDiretor=id
            if(idDiretor==''||idDiretor==undefined||isNaN(idDiretor))
                return message.ERROR_INVALID_ID
            else if(dadosDiretor.id_nacionalidade==null||dadosDiretor.id_nacionalidade==undefined)
                return message.ERROR_REQUIRED_FIELDS
            else{
                let diretor=await diretorDAO.selectByIdDiretor(idDiretor)
                if(diretor){
                    let diretorAtualizadoJSON={}
                    let diretorAtualizado=await diretorDAO.updateDiretor(idDiretor, dadosDiretor)
                    if(diretorAtualizado){
                        diretorAtualizadoJSON.diretor=dadosDiretor
                        diretorAtualizadoJSON.status=message.SUCCES_UPDATED_ITEM.status
                        diretorAtualizadoJSON.status_code=message.SUCCES_UPDATED_ITEM.status_code
                        diretorAtualizadoJSON.message=message.SUCCES_UPDATED_ITEM.message
                        return diretorAtualizadoJSON
                    }
                    else
                        return message.ERROR_NOT_FOUND
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

const setExcluirDiretor=async function(id){
    try {
        let idDiretor=id
        if(idDiretor==''||idDiretor==undefined||isNaN(idDiretor))
            return message.ERROR_INVALID_ID
        else{
            let comando=await diretorDAO.deleteDiretor(idDiretor)
            if(comando)
                return message.SUCCESS_DELETED_ITEM
            else{
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarDiretores=async function(){
    try {
        let diretoresJSON={}
        let dadosDiretores=await diretorDAO.selectAllDiretores()
        if(dadosDiretores){
            if(dadosDiretores.length>0){
                for (let diretor of dadosDiretores){
                    let sexoDiretor = await sexoDAO.selectByIDSexo(diretor.id_sexo)
                    let nacionalidadeDiretor = await nacionalidadeDAO.selectByIDNacionalidadeDiretor(diretor.id)
                    delete diretor.id_sexo
                    diretor.sexo = sexoDiretor
                    diretor.nacionalidade = nacionalidadeDiretor
                }
                diretoresJSON.diretores=dadosDiretores
                diretoresJSON.quantidade=dadosDiretores.length
                diretoresJSON.status_code=200
                return diretoresJSON
            }else
                return message.ERROR_NOT_FOUND
        }else
            return message.ERROR_INTERNAL_SERVER_DB
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarDiretorPeloID=async function(id){
    try {
        let idDiretor=id
        let diretoresJSON={}
        if(idDiretor==''||idDiretor==undefined||isNaN(idDiretor))
            return message.ERROR_INVALID_ID
        else{
            let dadosDiretor=await diretorDAO.selectByIdDiretor(idDiretor)
            if(dadosDiretor){
                if(dadosDiretor.length>0){
                    diretoresJSON.diretor=dadosDiretor
                    diretoresJSON.status_code=200
                    return diretoresJSON
                }else
                    return message.ERROR_NOT_FOUND
            }else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarDiretorPeloNome=async function(nome){
    try {
        let nomeDiretor=nome
        let diretoresJSON={}
        if(nomeDiretor==''||nomeDiretor==undefined||!isNaN(nomeDiretor))
            return message.ERROR_INVALID_ID
        else{
            let dadosDiretores=await diretorDAO.selectByNomeDiretor(nomeDiretor)
            if(dadosDiretores){
                if(dadosDiretores.length>0){
                    diretoresJSON.diretores=dadosDiretores
                    diretoresJSON.status_code=200
                    return diretoresJSON
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
    setInserirNovoDiretor,
    setAtualizarDiretor,
    setExcluirDiretor,
    getListarDiretores,
    getBuscarDiretorPeloID,
    getBuscarDiretorPeloNome
}