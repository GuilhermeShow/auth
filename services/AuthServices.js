const { compare } = require("bcryptjs");
const db = require("../models");
const { sign } = require("jsonwebtoken");
const jsonSecret = require("../config/jsonSecret");

class AuthServices {

    async login(dto) {

        const usuario = await db.usuarios.findOne({
            attributes: ["id", "email", "senha"],
            where: {email: dto.email}
        })

        if(!usuario) {
            throw new Error("Usuario não encontrado!");
        }

        const senhaIguais = await compare(dto.senha, usuario.senha);

        if(!senhaIguais) {
            throw new Error("Usuario ou senha incorreta");
        }

        try {
            
            const accessToken = sign({
                id: usuario.id,
                email: usuario.email
            }, jsonSecret.secret, {
                expiresIn: 86400
            })

            return {accessToken}

        } catch (error) {
            
        }

    }

}

module.exports = AuthServices;