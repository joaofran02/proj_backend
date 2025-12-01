const Estoque = require('../models/Estoque')

async function cadastrarEstoque(dados){


}

async function atualizarEstoque(idProduto, movimentacao, tipo){

    // Buscar o estoque do produto
    const estoque = await Estoque.findOne({
        where: { idProduto: idProduto }
    })

    if (!estoque) {
        throw new Error('Estoque não encontrado para este produto')
    }

    let novaQuantidade = estoque.quantidade

    if(tipo === 'ENTRADA'){
        novaQuantidade += movimentacao
    }else if(tipo === 'SAIDA'){
        novaQuantidade -= movimentacao
        if(novaQuantidade < 0){
            throw new Error('Quantidade insuficiente em estoque')
        }
    }

    // Atualizar quantidade e movimentacao
    await estoque.update({
        quantidade: novaQuantidade,
        movimentacao: movimentacao
    })

    return estoque
}

module.exports = {
    cadastrarEstoque,
    atualizarEstoque
}