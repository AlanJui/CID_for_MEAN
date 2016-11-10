const expect = require('chai').expect;
const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const dbCtrl = require('../../server/dbController');

describe.skip('DB Controller', () => {

  describe('Initial Test Data', () => {

    let jobs;

    before((done) => {
      dbCtrl.connectDB()
        .then(dbCtrl.resetJobs)
        .then(dbCtrl.seedJobs)
        .then(dbCtrl.findJobs)
        .then((collection) => {
          jobs = collection;
          done();
        });
    });

    after(() => {
      dbCtrl.closeConnection();
    });

    it('should never be empty since jobs are seeded', () => {
      expect(jobs.length).to.be.at.least(1);
    });

    it('should have a job with a title', () => {
      expect(jobs[0].title).to.not.be.empty;
    });

    it('should have a job with a description', () => {
      expect(jobs[0].description).to.not.be.empty;
    });

  });

  describe('Save Job', () => {

    const job = {
      title: 'Cook',
      description: 'you will be making bagels'
    };
    let jobs;

    function saveTestJob() {
      return dbCtrl.saveJob(job);
    }

    before((done) => {
      dbCtrl.connectDB()
        .then(dbCtrl.resetJobs)
        .then(saveTestJob)
        .then(dbCtrl.findJobs)
        .then((collection) => {
          jobs = collection;
          done();
        });
    });

    after(() => {
      dbCtrl.closeConnection();
    });

    it('should have one job after saving one job', () => {
      expect(jobs).to.have.length(1);
    });

  });

});

