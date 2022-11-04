process.env.NODE_ENV = "test";
require("dotenv").config({ path: "./src/configs/example.env" });

<<<<<<< HEAD
let UsersRoute = require("../routes/users");
=======
let UsersModels = require("../models/user");
>>>>>>> fd4cfc507c8d8ae17e0fb15be9da3842eb9517d2

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
<<<<<<< HEAD
  it("Buscar um email no Banco", (done) => {
    chai
      .request(server)
      .get("/users/allusers")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
=======
  it("Buscar um email de um usuario no Banco", (done) => {
    chai
      .request('http://localhost:4005')
      .get("/users/allusers")
      .end((err, res) => {
        res.should.have.status(200);
>>>>>>> fd4cfc507c8d8ae17e0fb15be9da3842eb9517d2
        done();
      });
  });
});
