const ProdutosServices = require("../services/ProdutosServices");
const produtosServices = new ProdutosServices();

class ProdutosControllers {

    static async listar(req, res) {

        try {
            const listar = await produtosServices.listar();
            res.status(200).json(listar);
        } catch (error) {
            res.status(401).json({ message: error.message })
            return
        }
    }

    static async cadastrar(req, res) {

        const { nome, quantidade, valor } = req.body;
        const usuarioId = req.usuarioId

        try {
            const cadastrar = await produtosServices.cadastrarProduto({
                nome, quantidade, valor, usuarioId
            })

            res.status(201).json(cadastrar);
        } catch (error) {
            res.status(401).json({ message: error.message });
            return
        }
    }

    static async produtoId(req, res) {

        const { id } = req.params;

        try {
            const produto = await produtosServices.produtoPorId({ id });
            res.status(200).json(produto);
        } catch (error) {
            res.status(401).json({ message: error.message });

        }

    }

    static async atualizar(req, res) {
        const { id } = req.params;
        const { nome, quantidade, valor } = req.body;
        const usuarioId = req.usuarioId

        try {
            const atualizar = await produtosServices.atualizar({
                id, nome, quantidade, valor, usuarioId
            })

            res.status(200).json({
                message: "Produto atualizado com sucesso!",
                atualizar,
            });
        } catch (error) {
            res.status(401).json({message: error.message});
            return;
        }

    }

    static async deletar(req, res) {

        const {id} = req.params;
        const usuarioId = req.usuarioId

        try {
            await produtosServices.deletar({id,usuarioId});
            res.status(200).json({message: "Produto deletado com sucesso"});
        } catch (error) {
            res.status(401).json({message: error.message});
            return;
        }
        
    }

}

module.exports = ProdutosControllers;