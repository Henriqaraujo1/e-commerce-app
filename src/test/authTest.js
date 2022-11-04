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

describe("/POST users", () => {
  it("Criar novo usuario no banco", (done) => {
    let user = {
      email: "henriqaraujo1@gmail.com",
      password: "guarana",
    };
    chai
      .request("http://localhost:4005")
      .post("/auth/register")
      .send(user)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("object");
        res.body.should.have.property("errors");
        res.body.errors.should.have.property("pages");
        res.body.errors.pages.should.have.property("kind").eql("required");
        done();
      });
  });
});

describe("/POST users", () => {
    it("Login no sistema buscando dados no Banco", (done) => {
        let userLogin = {
            email: "henriqaraujo1@gmail.com",
            password: "guarana"
        }
        chai
            .request("http://localhost:4005")
            .post('/auth/login')
            .send(userLogin)
            .end((err, res) => {
                res.should.have.status(200)
                res.body.should.be.a('object')
                res.body.should.have.property('error')
                done()
            })
    })
})
