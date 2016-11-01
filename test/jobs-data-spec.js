const expect = require('chai').expect;
const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const JobModel = require('../models/Job');

const LOCAL_MONGODB_URI = `mongodb://localhost/jobfinder`;
const mongodbUri = process.env.MONGODB_URI || LOCAL_MONGODB_URI;
const connectDB = Promise.promisify(mongoose.connect, {
  context: mongoose
});

function resetDB() {
  return new Promise((resolve, reject) => {
    mongoose.connection.collections['jobs'].drop(resolve, reject);
  });
}

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

function findJobs(query) {
  return Promise.cast(JobModel.find(query).exec());
}

describe('Get Jobs', () => {
  it('should never be empty since jobs are seeded', (done) => {
    connectDB(mongodbUri)
      .then(resetDB())
      .then(importTestData())
      .then(findJobs)
      .then((jobs) => {
        expect(jobs.length).to.be.at.least(1);
        done();
      });
  });
});
