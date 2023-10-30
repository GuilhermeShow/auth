const { Router } = require("express");
const AuthControllers = require("../controllers/AuthControllers");

const router = Router();

router.post("/auth/login", AuthControllers.login);

module.exports = router