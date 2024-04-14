const generoDAO = require('../model/dao/genero.js')
const message = require('../module/config.js')

const setInserirNovoGenero = async function (dadosGenero, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novoGeneroJSON = {}
            let ultimoID
            if (dadosGenero.nome == '')
                return message.ERROR_REQUIRED_FIELDS
            else {
                console.log(dadosGenero)
                let novoGenero = await generoDAO.insertGenero(dadosGenero)
                if (novoGenero) {
                    novoGeneroJSON.genero = dadosGenero
                    novoGeneroJSON.status = message.SUCCESS_CREATED_ITEM.status
                    novoGeneroJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novoGeneroJSON.message = message.SUCCESS_CREATED_ITEM.message
                    ultimoID = await generoDAO.selectLastID()
                    dadosGenero.id = ultimoID[0].id
                    return novoGeneroJSON
                }
                else {
                    return message.ERROR_INTERNAL_SERVER_DB
                }
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setAtualizarGenero = async function (id, dadosGenero, contentType) { 
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let idGenero = id
            if (idGenero == '' || idGenero == undefined || isNaN(idGenero))
                return message.ERROR_INVALID_ID
            else {
                let genero = await generoDAO.selectByIdGenero(idGenero)
                if (genero) {
                    let generoAtualizadoJSON = {}
                    let generoAtualizado = await generoDAO.updateGenero(idGenero, dadosGenero)
                    if (generoAtualizado) {
                        generoAtualizadoJSON.genero = dadosGenero
                        generoAtualizadoJSON.status = message.SUCCES_UPDATED_ITEM.status
                        generoAtualizadoJSON.status_code = message.SUCCES_UPDATED_ITEM.status_code
                        generoAtualizadoJSON.message = message.SUCCES_UPDATED_ITEM.message
                        return generoAtualizadoJSON
                    }
                    else {
                        return message.ERROR_NOT_FOUND
                    }
                }
                else
                    return message.ERROR_NOT_FOUND
            }
        } else {
            return message.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirGenero = async function (id) {
    try {
        let idGenero = id
        if (idGenero == '' || idGenero == undefined || isNaN(idGenero))
            return message.ERROR_INVALID_ID
        else {
            let comando = await generoDAO.deleteGenero(idGenero)
            if (comando)
                return message.SUCCESS_DELETED_ITEM
            else {
                return message.ERROR_NOT_FOUND
            }
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getListarGeneros = async function () {
    try {
        let generosJSON = {}
        let dadosGeneros = await generoDAO.selectAllGeneros()
        if (dadosGeneros) {
            if (dadosGeneros.length > 0) {
                generosJSON.generos = dadosGeneros
                generosJSON.quantidade = dadosGeneros.length
                generosJSON.status_code = 200
                return generosJSON
            } else
                return message.ERROR_NOT_FOUND
        } else
            return message.ERROR_INTERNAL_SERVER_DB
    } catch (error) {
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarGeneroPeloID = async function (id) {
    try {
        let idGenero = id
        let generoJSON = {}
        if (idGenero == '' || idGenero == undefined || isNaN(idGenero))
            return message.ERROR_INVALID_ID
        else {
            let dadosGenero = await generoDAO.selectByIdGenero(idGenero)
            if (dadosGenero) {
                if (dadosGenero.length > 0) {
                    generoJSON.genero = dadosGenero
                    generoJSON.status_code = 200
                    return generoJSON
                } else
                    return message.ERROR_NOT_FOUND
            } else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarGeneroPeloNome = async function (nome) {
    try {
        let nomeGenero = nome
        let generosJSON = {}
        if (nomeGenero == '' || nomeGenero == undefined || !isNaN(nomeGenero))
            return message.ERROR_INVALID_ID
        else {
            let dadosGenero = await generoDAO.selectByNomeGenero(nomeGenero)
            if (dadosGenero) {
                if (dadosGenero.length > 0) {
                    generosJSON.generos = dadosGenero
                    generosJSON.status_code = 200
                    return generosJSON
                } else
                    return message.ERROR_NOT_FOUND
            }
            else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

module.exports = {
    setInserirNovoGenero,
    setAtualizarGenero,
    setExcluirGenero,
    getBuscarGeneroPeloID,
    getBuscarGeneroPeloNome,
    getListarGeneros
}