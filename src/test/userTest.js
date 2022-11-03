process.env.NODE_ENV = "test";

let UsersService = require("../services/UsersService");

const chai = require("chai");
const chaiHttp = require("chai-http");
const server = require("../../../index");
const should = chai.should();

chai.use(chaiHttp);

describe('/GET email', () => {
    it('Buscar um email ')
})

