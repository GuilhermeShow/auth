const db = require("../models");

class ProdutosServices {

    async listar() {

        const listar = await db.produtos.findAll({
            order: [["id", "DESC"]]
        });

        return listar;

    }

    async cadastrarProduto(dto) {

        try {
            const cadastrar = await db.produtos.create({
                nome: dto.nome,
                quantidade: dto.quantidade,
                valor: dto.valor,
                usuario_id: dto.usuarioId
            })

            return cadastrar;
        }catch (error) {
            throw new Error("Não foi possivel registrar produto");
        }
    }

    async produtoPorId(dto) {
        const produto = await db.produtos.findOne({
            where: {id: dto.id}
        })

        if(!produto) {
            throw new Error("Produto não encontrado!")
        }
       try {
        return produto;
       } catch (error) {
            throw new Error("Produto não encontrado!");
       }
    }

    async atualizar(dto) {

        const produto = await db.produtos.findOne({
            where: {id: dto.id}
        });

        if(!produto) {
            throw new Error("Produto não encontrado!");
        }

        if(Number(dto.usuarioId) !== Number(produto.dataValues.usuario_id)) {
            throw new Error("Você não pode atualizar esse produto")
        } 
    
        try {
            produto.nome = dto.nome;
            produto.quantidade = dto.quantidade;
            produto.valor = dto.valor;
            produto.usuario_id = dto.usuarioId

            await produto.save();

            return produto;
        } catch (error) {
            throw new Error("Erro a atualizar produto")
        }

    }

    async deletar(dto) {

        const produto = await db.produtos.findOne({
            where: {id: dto.id}
        })

        if(!produto) {
            throw new Error("Produto não encontrado");
        }

        if(Number(dto.usuarioId) !== Number(produto.dataValues.usuario_id)) {
            throw new Error("Você não pode atualizar esse produto");
        } 

        try {
            
            return await db.produtos.destroy({where: {id:dto.id}})
        } catch (error) {
            throw new Error("Não foi possivel deletar produto");
        }

    }

}

module.exports = ProdutosServices;