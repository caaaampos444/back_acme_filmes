const classificacaoDAO = require('../model/dao/classificacao.js')
const message = require('../module/config.js')

const setInserirNovaClassificacao = async function (dadosClassificacao, contentType) {
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let novaClassificacaoJSON = {}
            let ultimoID
            if (dadosClassificacao.faixa_etaria == ''||dadosClassificacao.classificacao==''||dadosClassificacao.caracteristica==''||dadosClassificacao.icone=='')
                return message.ERROR_REQUIRED_FIELDS
            else {
                let novoGenero = await classificacaoDAO.insertClassificacao(dadosClassificacao)
                if (novoGenero) {
                    novaClassificacaoJSON.genero = dadosClassificacao
                    novaClassificacaoJSON.status = message.SUCCESS_CREATED_ITEM.status
                    novaClassificacaoJSON.status_code = message.SUCCESS_CREATED_ITEM.status_code
                    novaClassificacaoJSON.message = message.SUCCESS_CREATED_ITEM.message
                    ultimoID = await classificacaoDAO.selectLastID()
                    dadosClassificacao.id = ultimoID[0].id
                    return novaClassificacaoJSON
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

const setAtualizarClassificacao = async function (id, dadosClassificacao, contentType) { 
    try {
        if (String(contentType).toLowerCase() == 'application/json') {
            let idClassificacao = id
            if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao))
                return message.ERROR_INVALID_ID
            else {
                let classificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao)
                if (classificacao) {
                    let classificacaoAtualizadaJSON = {}
                    let classificacaoAtualizada = await classificacaoDAO.updateClassificacao(idClassificacao, dadosClassificacao)
                    if (classificacaoAtualizada) {
                        classificacaoAtualizadaJSON.classificacao = dadosClassificacao
                        classificacaoAtualizadaJSON.status = message.SUCCES_UPDATED_ITEM.status
                        classificacaoAtualizadaJSON.status_code = message.SUCCES_UPDATED_ITEM.status_code
                        classificacaoAtualizadaJSON.message = message.SUCCES_UPDATED_ITEM.message
                        return classificacaoAtualizadaJSON
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
        console.log(error)
        return message.ERROR_INTERNAL_SERVER
    }
}

const setExcluirClassificacao = async function (id) {
    try {
        let idClassificacao = id
        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao))
            return message.ERROR_INVALID_ID
        else {
            let comando = await classificacaoDAO.deleteClassificacao(idClassificacao)
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

const getListarClassificacoes = async function () {
    try {
        let classificacoesJSON = {}
        let dadosClassificacaos = await classificacaoDAO.selectAllClassificacoes()
        if (dadosClassificacaos) {
            if (dadosClassificacaos.length > 0) {
                classificacoesJSON.classificacoes = dadosClassificacaos
                classificacoesJSON.quantidade = dadosClassificacaos.length
                classificacoesJSON.status_code = 200
                return classificacoesJSON
            } else
                return message.ERROR_NOT_FOUND
        } else
            return message.ERROR_INTERNAL_SERVER_DB
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarClassificacaoPeloID = async function (id) {
    try {
        let idClassificacao = id
        let classificacaoJSON = {}
        if (idClassificacao == '' || idClassificacao == undefined || isNaN(idClassificacao))
            return message.ERROR_INVALID_ID
        else {
            let dadosClassificacao = await classificacaoDAO.selectByIdClassificacao(idClassificacao)
            if (dadosClassificacao) {
                if (dadosClassificacao.length > 0) {
                    classificacaoJSON.classificacao = dadosClassificacao
                    classificacaoJSON.status_code = 200
                    return classificacaoJSON
                } else
                    return message.ERROR_NOT_FOUND
            } else
                return message.ERROR_INTERNAL_SERVER_DB
        }
    } catch (error) {
        return message.ERROR_INTERNAL_SERVER
    }
}

const getBuscarClassificacaoPelaFaixaEtaria = async function (faixa_etaria) {
    try {
        let faixaEtaria = faixa_etaria
        let classificacoesJSON = {}
        if (faixaEtaria == '' || faixaEtaria == undefined || !isNaN(faixaEtaria))
            return message.ERROR_INVALID_ID
        else {
            let dadosClassificacao = await classificacaoDAO.selectByFaixaEtariaClassificacao(faixaEtaria)
            if (dadosClassificacao) {
                if (dadosClassificacao.length > 0) {
                    classificacoesJSON.classificacoes = dadosClassificacao
                    classificacoesJSON.status_code = 200
                    return classificacoesJSON
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
    setInserirNovaClassificacao,
    setAtualizarClassificacao,
    setExcluirClassificacao,
    getBuscarClassificacaoPeloID,
    getBuscarClassificacaoPelaFaixaEtaria,
    getListarClassificacoes
}