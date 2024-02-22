const ERROR_INVALID_ID={status: false, status_code: 400, message: 'O ID ou filtro encaminhado na requisição não é válido.'}
const ERROR_NOT_FOUND={status: false, status_code: 404, message: 'Não foram encontrados itens na requisição.'}
const ERROR_INTERNAL_SERVER_DB={status: false, status_code: 500, message: 'Não foi possível processar a requisição devido ao problema na comunicação com o banco de dados. Contate o administrador da API.'}

module.exports={
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB
}