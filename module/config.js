//MENSAGENS DE ERRO
const ERROR_INVALID_ID={status: false, status_code: 400, message: 'O ID ou filtro encaminhado na requisição não é válido.'}
const ERROR_NOT_FOUND={status: false, status_code: 404, message: 'Não foram encontrados itens na requisição.'}
const ERROR_INTERNAL_SERVER_DB={status: false, status_code: 500, message: 'Não foi possível processar a requisição devido ao problema na comunicação com o banco de dados. Contate o administrador da API.'}
const ERROR_REQUIRED_FIELDS={status: false, status_code: 400, message: 'Existem campos requeridos que não foram preenchidos, ou não atendem aos critérios de digitação.'}
const ERROR_CONTENT_TYPE={status: false, status_code:415, message: 'O content-type encaminhado na requisição não é permitido pelo servidor da API. Deve-se utilizar somente application/json.'}
const ERROR_INTERNAL_SERVER={status: false, status_code:500, message: 'Não foi possível processar a requisição devido a um problema na camada de negócios/controle do projeto. Contate o administrador da API.'}
//MENSAGENS DE SUCESSO
const SUCCESS_CREATED_ITEM={status: true, status_code: 201, message: 'Item criado com sucesso.'}
const SUCCESS_DELETED_ITEM={status: true, status_code: 200, message: 'Item deletado com sucesso.'}

module.exports={
    ERROR_INVALID_ID,
    ERROR_NOT_FOUND,
    ERROR_INTERNAL_SERVER_DB,
    ERROR_REQUIRED_FIELDS,
    ERROR_CONTENT_TYPE,
    ERROR_INTERNAL_SERVER,
    SUCCESS_CREATED_ITEM,
    SUCCESS_DELETED_ITEM
}