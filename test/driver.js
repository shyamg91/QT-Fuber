const mongoose = require("mongoose");
const Driver = require('../models/Driver');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../start');
const should = chai.should();

chai.use(chaiHttp);

describe('/GET driver', () => {
  it('it should GET all nearby drivers', (done) => {
    chai.request(server)
      .get('/driver')
      .query({ lat: -36.889528, lng: 174.693118 })
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
});
describe('/POST accept', () => {
  it('it should not POST a book without id field', (done) => {
    const request = {}
    chai.request(server)
      .post('/accept/' + request)
      .end((err, res) => {
        res.should.have.status(500);
        done();
      });
  });
});

describe('/POST accept', () => {
  it('it should POST a ride with driver id', (done) => {
    const request = {
      'id': "592c1a097bd812e6918c90cc"
    };
    chai.request(server)
      .post('/accept/' + request.id)
      .end((err, res) => {
        res.should.have.status(200);
        res.body.should.be.a('object');
        done();
      });
  });

});