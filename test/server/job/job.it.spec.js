const request = require('supertest');
const assert = require('assert');
const expect = require('chai').expect;

const app = require('../../../server/server');

describe('Job API:', () => {

  describe('GET /api/jobs', () => {

    it('should give a json list of jobs', (done) => {
      request(app).get('/api/jobs')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.a('Array');
          done();
        });
    });

  });

  describe('POST /api/jobs', () => {

    let newJob = {
      title: 'Cooker',
      description: 'Making Vegan food'
    };
    let dataSavedJob;

    describe('Happy Path:', () => {

      beforeEach((done) => {
        request(app)
          .post('/api/jobs')
          .send(newJob)
          .expect(201)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            dataSavedJob = res.body;
            done();
          });
      });

      it('should create a new job', () => {
        assert.equal(dataSavedJob.title, 'Cooker');
        assert.equal(dataSavedJob.description, 'Making Vegan food');

        // assert.deepEqual(dataSavedJob, newJob, 'Data content should be equal');
      });

    });

    describe('Sad Path:', () => {

      let error;
      let response;

      beforeEach((done) => {
        request(app)
          .post('/api/jobs')
          .send({
            description: 'Making Vegan food'
          })
          .expect(500)
          .end((err, res) => {
            if (err) {
              error = err;
              return done(err);
            }
            response = res;
            done();
          });
      });

      it('should be rejected when title is empty', () => {
        assert.equal(response.statusCode, 500);
        assert.equal(response.body.message, 'Job validation failed');
      });

    });

  });

});

