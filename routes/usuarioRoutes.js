const {Router} = require("express");
const UsuariosControllers = require("../controllers/UsuariosControllers");
const autenticado = require("../middlewares/autenticado");

const router = Router();

router.post("/usuarios", UsuariosControllers.cadastrar);
router.get("/usuarios",autenticado, UsuariosControllers.listar);
router.get("/usuarios/:id",autenticado, UsuariosControllers.usuarioId);
router.delete("/usuarios/:id",autenticado, UsuariosControllers.deletar);
router.put("/usuarios/:id",autenticado, UsuariosControllers.editarUsuario);

module.exports = router;