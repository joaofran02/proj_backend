const {
    cadastrarEstoque,
    atualizarEstoque
} = require('../services/estoque.service')

async function cadastrar(req, res) {

    try{

        const valores = req.body
        const resultado = await cadastrarEstoque(valores)

        return res.status(201).json({message: 'Estoque cadastrado com sucesso', resultado})
    }catch(err){

        console.error('Erro no controller de cadastro:', err)
        return res.status(500).json({mensage: 'Erro ao cadastrar produto no estoque', err})
    }
}

async function atualizar(req, res) {

    try{

        const { idProduto } = req.params
        const { movimentacao, tipo } = req.body

        if(!movimentacao || !tipo){
            return res.status(400).json({error: 'Movimentação e tipo são obrigatórios'})
        }

        const estoqueAtualizado = await atualizarEstoque(idProduto, parseInt(movimentacao), tipo)

        return res.status(200).json({
            message: 'Estoque atualizado com sucesso',
            estoque: estoqueAtualizado
        })
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

module.exports = {
    cadastrar,
    atualizar
}
