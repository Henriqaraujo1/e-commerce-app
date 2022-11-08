process.env.NODE_ENV = "test";

require("dotenv").config({ path: "./src/configs/example.env"})

let cartModels = require("../models/cart")

let chai = require('chai')
let chaiHttp = require('chai-http')
let server = "http://localhost:4005";
let should = chai.should();

// chai.use(chaiHttp);
// describe('Carts', () => {
//     beforeEach((done) => {
//         c
//     })
// })

/**
 * Test Get Carts
 */
describe('/GET Carts', () => {
    it("Buscar carrinho de compras no banco de dados", (done) => {
        chai
            .request(server)
            .get("/carts/mine")
            .end((err, res) => {
                res.should.have.status(200)
                done()
            })
    })
})

