const UsuariosServices = require("../services/UsuariosServices");
const usuarioServices = new UsuariosServices();

class UusariosControllers {

    static async cadastrar(req, res) {

        const {nome, email, senha} = req.body;

        try {
            const registrar = await usuarioServices.cadastrar({
                nome, email, senha 
            })

            res.status(201).json(registrar);
        } catch (error) {
            res.status(400).json({message: error.message})
        }

    }

    static async usuarioId(req, res) {

        const {id} = req.params;

        try {
            const usuario = await usuarioServices.usuarioPoId({id});
            res.status(200).json(usuario);
        } catch (error) {
            res.status(400).json({message: error.message})
            return;
        }

    }

    static async deletar(req, res) {

        const {id} = req.params;
        const {usuarioId} = req;

        try {
            await usuarioServices.deletar({id, usuarioId});
        res.status(200).json({message: `Usuario foi deletado com sucesso`});
        } catch (error) {
            res.status(400).json({message: error.message})
            return;
        }

    }

    static async editarUsuario(req, res) {

        const {id} = req.params;
        const {nome, email} = req.body;
        const {usuarioId} = req;

        try {
            const update = await usuarioServices.editarUsuario({
                id, nome, email, usuarioId
            })

            res.status(200).json(update);
        } catch (error) {
            res.status(400).json({message: error.message});
            return;
        }

    }

    static async listar(req, res) {

        const listar = await usuarioServices.listar();

        res.status(200).json(listar)
        
    }

}

module.exports = UusariosControllers;