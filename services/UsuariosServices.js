const { hash } = require("bcryptjs");
const db = require("../models");

class UsuariosServices {

    async cadastrar(dto) {

        const usuario = await db.usuarios.findOne({
            where: {email: dto.email}
        })

        const senhaHash = await hash(dto.senha, 8);

        if(usuario) {
            throw new Error("Usuario ja existente!");
        }

        try {
            const cadastrar = await db.usuarios.create({
                nome: dto.nome,
                email: dto.email,
                senha: senhaHash
            })

            return cadastrar;
        } catch (error) {
            throw new Error("Não foi possivel realizar o cadastro", error);
        }
    }

    async usuarioPoId(dto) {

        const usuario = await db.usuarios.findOne({
            where: {id: dto.id}
        })

        if(!usuario) {
            throw new Error("Usuario inexistente");
        }
        
        return usuario;
        
    }

    async listar() {

        const usuarios = await db.usuarios.findAll({
            order: [
                ["id", "DESC"]
            ]
        });

        return usuarios;
    }

    async deletar(dto) {

       const usuario = await db.usuarios.findOne({
        where: {id: dto.id}
    })

    if(!usuario) {
        throw new Error("Usuario inexistente")
    }
    if(Number(dto.usuarioId) !== Number(usuario.dataValues.id)) {
        throw new Error("Você não pode exclir esse usuario!");
    } 

        try {
            const delet = await db.usuarios.destroy({
                where: {id: dto.id}})
            return delet;
        } catch (error) {
            throw new Error("Não foi possivel realizar a deleção");
        }
        
    }

    async editarUsuario(dto) {

        const usuario = await db.usuarios.findOne({
            where: {id: dto.id}
        });
        
        if(Number(dto.usuarioId) !== Number(usuario.dataValues.id)) {
            throw new Error("Você não pode editar esse usuario!");
        } 

        try {
            usuario.nome = dto.nome;
            usuario.email = dto.email

            await usuario.save();

            return usuario;

        } catch (error) {
            throw new Error('Erro ao editar usuario!')
        }

    }

}

module.exports = UsuariosServices;