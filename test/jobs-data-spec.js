const expect = require('chai').expect;
const mongoose = require('mongoose');

mongoose.Promise = require('bluebird');

const JobModel = require('../models/Job');

function dbConnect(callback) {
  const LOCAL_MONGODB_URI = `mongodb://localhost/jobfinder`;
  const mongodbUri = process.env.MONGODB_URI || LOCAL_MONGODB_URI;
  mongoose.connect(mongodbUri, callback);
}

function resetDB(callback) {
  mongoose.connection.collections['jobs'].drop(callback);
}

function importTestData(callback) {
  const jobs = [
    {title: 'Cook', description: 'You will be making bagels'},
    {title: 'Waiter', description: 'You will be putting food on peoples table'},
    {title: 'Programmer', description: 'You will be mindlessly typing for money'},
    {title: 'Axe Maker', description: 'We need many axes made.. so many..'}
  ];

  JobModel.create(jobs,callback);
}

describe('Get Jobs', () => {
  it('should never be empty since jobs are seeded', (done) => {
    dbConnect(() => {
      resetDB(() => {
        importTestData(() => {
          JobModel.find({})
            .exec((err, jobs) => {
              expect(jobs.length).to.be.at.least(1);
              done();
            });
        });
      });
    });

  });
});
