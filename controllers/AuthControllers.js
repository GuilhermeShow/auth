const AuthServices = require("../services/AuthServices");
const authServices = new AuthServices();

class AuthControllers {

    static async login(req, res) {

        const { email, senha } = req.body;

        try {
            const login = await authServices.login({email, senha});
            res.status(201).json(login)
        } catch (error) {
            res.status(400).json({message: error.message});
        }

    }

}

module.exports = AuthControllers;