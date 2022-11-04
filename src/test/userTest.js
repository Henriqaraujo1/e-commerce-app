process.env.NODE_ENV = "test";
require("dotenv").config({ path: "./src/configs/example.env" });

let UsersModels = require("../models/user");

let chai = require("chai");
let chaiHttp = require("chai-http");
let server = require("../../index");
let should = chai.should();

chai.use(chaiHttp);
describe("Users", () => {
  beforeEach((done) => {
    //Antes de cada teste limpamos o Banco
    UsersModels.remove({}, (err) => {
      done();
    });
  });
});

describe("/GET email", () => {
  it("Buscar um email de um usuario no Banco", (done) => {
    chai
      .request('http://localhost:4005')
      .get("/users/allusers")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
