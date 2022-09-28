const express = require("express");
const bodyParser = require("body-parser");
const { response } = require("express");
const app = express();
const { PORT } = require('./src/configs/config');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/', (req, res) => {
    response.json({info: 'E-commerce with Express and Postgres'})
})

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

startServer();
