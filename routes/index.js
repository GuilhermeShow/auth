const bodyParser = require("body-parser");
const usuario = require("./usuarioRoutes");
const login = require("./loginRoutes");
const produtos = require("./produtosRoutes");

module.exports = app => {
    app.use(
        bodyParser.json(),
        usuario,
        login,
        produtos,
    )
}