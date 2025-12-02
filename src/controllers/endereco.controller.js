const {
    criarEndereco,
    listarEnderecos,
    atualizarEndereco,
    apagarEndereco
} = require('../services/endereco.service')

async function criar(req, res) {

    try{

        const endereco = await criarEndereco(req.body, req.user.id)
        return res.status(201).json({message: 'Endereço criado com sucesso.', endereco})
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function listar(req, res) {

    try{

        const enderecos = await listarEnderecos(req.user.id)
        return res.status(200).json(enderecos)
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function atualizar(req, res) {

    try{

        const { id } = req.params
        const enderecoAtualizado = await atualizarEndereco(id, req.body, req.user.id)

        return res.status(200).json({
            message: 'Endereço atualizado com sucesso',
            endereco: enderecoAtualizado
        })
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

async function apagar(req, res) {

    try{

        const { id } = req.params
        await apagarEndereco(id, req.user.id)

        return res.status(204).json({message: 'Endereço apagado com sucesso'})
    }catch(err){

        return res.status(500).json({error: err.message})
    }
}

module.exports = {
    criar,
    listar,
    atualizar,
    apagar
}