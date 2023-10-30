const express = require("express");
const router = require("./src/routes");

const app = express();

const port = 8000;

router(app);

app.listen(port, () => {
    console.log(`Servidor rodando na porta: ${port}`);
})
