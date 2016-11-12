const request = require('supertest');
const assert = require('assert');
const expect = require('chai').expect;
const should = require('chai').should();

const app = require('../../../server/server');

const inputData = {
  title: 'Cooker',
  description: 'Making Vegan food'
};
let newEntity;

describe('Job API:', () => {

  describe('GET /api/jobs', () => {

    let jobs;

    beforeEach((done) => {
      request(app)
        .get('/api/jobs')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);

          jobs = res.body;
          done();
        });
    });

    it('should give a json list of jobs', () => {
      expect(jobs).to.be.a('Array');
      jobs.should.be.instanceOf(Array);
    });

  });

  describe('POST /api/jobs', () => {

    describe('Happy Path:', () => {

      beforeEach((done) => {
        request(app)
          .post('/api/jobs')
          .send(inputData)
          .expect(201)
          .expect('Content-Type', /json/)
          .end((err, res) => {
            if (err) {
              return done(err);
            }
            newEntity = res.body;
            done();
          });
      });

      it('should create a new job', () => {
        assert.equal(newEntity.title, 'Cooker');
        assert.equal(newEntity.description, 'Making Vegan food');

        // assert.deepEqual(dataSavedJob, newEntity, 'Data content should be equal');
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

  describe('GET /api/jobs/:id', () => {

    let job;

    beforeEach((done) => {
      request(app)
        .get(`/api/jobs/${newEntity._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          job = res.body;
          done();
        });
    });

    afterEach(() => {
      job = {};
    });

    it('should respond with the requested job', () => {
      job.title.should.equal(inputData.title);
      job.description.should.equal(inputData.description);
    });

  });

  describe('PUT /api/jobs/:id', () => {

    let updatedJob;
    const updatedData = {
      title: 'Updated Job',
      description: 'This is the updated job!!!'
    };

    beforeEach((done) => {
      request(app)
        .put(`/api/jobs/${newEntity._id}`)
        .send({
          title: updatedData.title,
          description: updatedData.description
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);
          updatedJob = res.body;
          done();
        });
    });

    afterEach(() => {
      updatedJob = {};
    });

    it('should respond with the original thing', () => {
      updatedJob.title.should.equal(newEntity.title);
      updatedJob.description.should.equal(newEntity.description);
    });

    it('should respond with the updated job on a subsequent GET', (done) => {
      request(app)
        .get(`/api/jobs/${newEntity._id}`)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) done(err);

          const job = res.body;

          job.title.should.equal(updatedData.title);
          job.description.should.equal(updatedData.description);

          done();
        });
    });
  });

  describe('PATCH /api/jobs/:id', () => {
    let patchedEntity;
    const patchedData = {
      title: 'Patched Job',
      description: 'This is the patched job!!!'
    };

    beforeEach((done) => {
      request(app)
        .patch(`/api/jobs/${newEntity._id}`)
        .send({
          title: patchedData.title,
          description: patchedData.description
        })
        // .send([
        //   {
        //     op: 'replace',
        //     path: '/title',
        //     value: patchedData.title
        //   },
        //   {
        //     op: 'replace',
        //     path: '/description',
        //     value: patchedData.description
        //   }
        // ])
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) return done(err);

          patchedEntity = res.body;
          done();
        });
    });

    afterEach(() => {
      patchedEntity = {};
    });

    it('should respond with the patched job', () => {
      patchedEntity.title.should.equal(patchedData.title);
      patchedEntity.description.should.equal(patchedData.description);
    });

  });

  describe('DELETE /api/jobs/:id', () => {
    it('should respond with 204 on successful removal', (done) => {
      request(app)
        .delete(`/api/jobs/${newEntity._id}`)
        .expect(204)
        .end((err) => {
          if (err) return done(err);

          done();
        });
    });

    it('should respond with 404 when job does not exist', (done) => {
      request(app)
        .delete(`/api/jobs/${newEntity._id}`)
        .expect(404)
        .end((err) => {
          if (err) return done(err);

          done();
        })
    });

    it('should respond with 500 when job id does not exist', (done) => {
      request(app)
        .delete(`/api/jobs/1`)
        .expect(500)
        .end((err) => {
          if (err) return done(err);

          done();
        });
    });
  });

});


