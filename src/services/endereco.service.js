const Endereco = require('../models/Endereco')

const axios = require('axios')

async function criarEndereco(dados, idUsuario){

    const { cep, numero, complemento, apelido, is_principal } = dados

    if (!cep || !numero) {
        throw new Error('CEP e número são obrigatórios')
    }

    const endereco = await Endereco.findOne({where: {cep: cep, idUsuario}})
    if(endereco){

        throw new Error('CEP já cadastrado para este usuário!')
    }
    // Buscar dados do ViaCEP
    const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
    const viaCepData = viaCepResponse.data

    if (viaCepData.erro) {
        throw new Error('CEP inválido')
    }

    // Se is_principal, desmarcar outros endereços principais
    if (is_principal) {
        await Endereco.update(
            { is_principal: false },
            { where: { idUsuario } }
        )
    }

    const novoEndereco = await Endereco.create({
        idUsuario,
        cep,
        logradouro: viaCepData.logradouro,
        complemento: complemento || '',
        bairro: viaCepData.bairro,
        localidade: viaCepData.localidade,
        uf: viaCepData.uf,
        numero,
        apelido: apelido || '',
        is_principal: is_principal || false
    })

    return novoEndereco
}

async function listarEnderecos(idUsuario){

    const enderecos = await Endereco.findAll({
        where: { idUsuario },
        order: [['is_principal', 'DESC'], ['createdAt', 'DESC']]
    })
    return enderecos
}

async function atualizarEndereco(id, dados, idUsuario){

    const endereco = await Endereco.findOne({
        where: { codEndereco: id, idUsuario }
    })

    if (!endereco) {
        throw new Error('Endereço não encontrado')
    }

    const { cep, numero, complemento, apelido, is_principal } = dados

    let updateData = { numero, complemento, apelido }

    // Se CEP mudou, buscar novos dados
    if (cep && cep !== endereco.cep) {
        const viaCepResponse = await axios.get(`https://viacep.com.br/ws/${cep}/json/`)
        const viaCepData = viaCepResponse.data

        if (viaCepData.erro) {
            throw new Error('CEP inválido')
        }

        updateData = {
            ...updateData,
            cep,
            logradouro: viaCepData.logradouro,
            bairro: viaCepData.bairro,
            localidade: viaCepData.localidade,
            uf: viaCepData.uf
        }
    }

    // Se is_principal, desmarcar outros
    if (is_principal) {
        await Endereco.update(
            { is_principal: false },
            { where: { idUsuario } }
        )
        updateData.is_principal = true
    }

    await endereco.update(updateData)
    return endereco
}

async function apagarEndereco(id, idUsuario){

    const endereco = await Endereco.findOne({
        where: { codEndereco: id, idUsuario }
    })

    if (!endereco) {
        throw new Error('Endereço não encontrado')
    }

    await endereco.destroy()
    return true
}

module.exports = {
    criarEndereco,
    listarEnderecos,
    atualizarEndereco,
    apagarEndereco
}