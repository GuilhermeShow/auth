const { Router } = require("express");
const ProdutosControllers = require("../controllers/ProdutosControllers");
const autenticado = require("../middlewares/autenticado")

const router = Router();

router.use(autenticado);

router.get("/produtos", ProdutosControllers.listar);
router.get("/produtos/:id", ProdutosControllers.produtoId);
router.put("/produtos/:id", ProdutosControllers.atualizar);
router.delete("/produtos/:id", ProdutosControllers.deletar);
router.post("/produtos", ProdutosControllers.cadastrar);

module.exports = router;