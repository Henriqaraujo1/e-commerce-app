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
/*
  Test Get all users Route
*/
describe("/GET email", () => {
  it("Buscar um email de um usuario no Banco", (done) => {
    chai
      .request("http://localhost:4005")
      .get("/users/allusers")
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});

/*
  Test /GET/:id Route
*/
describe("/GET users", () => {
  it("Buscar usuario pelo id", (done) => {
    let user = new UsersModels({
      email: "henriqaraujo1@gmail.com",
      password: "guarana",
    });
    user.getUserById((err, user) => {
      chai
        .request("http://localhost:4005")
        .get("/users/" + user.id_user)
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
        });
    });
  });
});

