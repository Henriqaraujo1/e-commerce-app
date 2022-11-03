process.env.NODE_ENV = "test";

let UsersRoute = require("../routes/users");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index");
const should = chai.should();

chai.use(chaiHttp);

describe("/GET email", () => {
  it("Buscar um email no Banco", (done) => {
    chai
      .request(server)
      .get("/users/allusers")
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a("array");
        res.body.length.should.be.eql(0);
        done();
      });
  });
});
