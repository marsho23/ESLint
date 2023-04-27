const chai = require('chai');
const chaiHttp = require('chai-http');
const { describe } = require('mocha');

chai.use(chaiHttp);
const mongoose = require('mongoose');
const server = require('../index');
const { catModel } = require('../db');

describe('API Tests', () => {
  let testCat;
  // eslint-disable-next-line no-undef
  beforeEach(async () => {
    await catModel.deleteMany({});
    testCat = await catModel.create({
      name: 'Sergent paws',
      colour: 'Cat brown',
      evil: false,
    });
    testCat = JSON.parse(JSON.stringify(testCat));
  });
  //   console.log({ testCat });
  // eslint-disable-next-line no-undef
  it('should create a cat', (done) => {
    chai
      .request(server)
      .post('/cats/create')
      .send({ name: 'Major whiskers', colour: 'green', evil: true })
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.include({
          name: 'Major whiskers',
          colour: 'green',
          evil: true,
        });
        chai.expect(res.status).to.equal(201);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it('Show all cats', (done) => {
    chai
      .request(server)
      .get('/cats/getAll')
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.deep.include(testCat);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it('Deletes cat', (done) => {
    chai
      .request(server)
      // eslint-disable-next-line no-underscore-dangle
      .delete(`/cats/remove/${testCat._id}`)
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.deep.include(testCat);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  it('updates cat', (done) => {
    chai
      .request(server)
      // eslint-disable-next-line no-underscore-dangle
      .patch(`/cats/update/${testCat._id}`)
      .query({ name: 'spidey', colour: 'white', evil: false })
      .end((err, res) => {
        // eslint-disable-next-line no-unused-expressions
        chai.expect(err).to.be.null;
        chai.expect(res.body).to.deep.include({ name: 'spidey', colour: 'white', evil: false });
        chai.expect(res.status).to.equal(201);
        done();
      });
  });

  // eslint-disable-next-line no-undef
  after(async () => {
    await mongoose.disconnect();
  });
});
