const express = require('express')
const app = express()
require("dotenv").config({ path: "./src/configs/example.env" });
const controllers = require('./src/controllers/index')

const { PORT } = require("./src/configs/config");

async function startServer() {
 controllers(app);

 app.listen(PORT, () => {
    console.log(`S   rvidor está rodando na PORTA ${PORT}`)
 })
}
startServer();
