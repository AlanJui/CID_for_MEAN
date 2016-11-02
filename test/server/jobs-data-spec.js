const expect = require('chai').expect;
const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const JobModel = require('../../api/job/job.model');
const dbCtrl = require('../../api/dbController');

describe('DB Service for Job', () => {

  describe('Get Jobs', () => {

    let jobs;

    before((done) => {
      dbCtrl.connectDB()
        .then(dbCtrl.resetJobs)
        // .then(importTestData())
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

  describe('Save Jobs', () => {

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
    })

  });

});

//==================================================

function importTestData() {
  const jobs = [
    {title: 'Cook', description: 'You will be making bagels'},
    {title: 'Waiter', description: 'You will be putting food on peoples table'},
    {title: 'Programmer', description: 'You will be mindlessly typing for money'},
    {title: 'Axe Maker', description: 'We need many axes made.. so many..'}
  ];

  return new Promise((resolve, reject) => {
    JobModel.create(jobs, resolve);
  });
}

