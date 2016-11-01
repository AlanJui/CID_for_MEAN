const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const JobModel = require('./models/Job');

const createSeeds = Promise.promisify(JobModel.create, {
  context: JobModel
});

const findJobs = (query) => {
  return Promise.cast(JobModel.find(query).exec());
};

exports.connectDB = Promise.promisify(mongoose.connect, {
  context: mongoose
});

exports.seedJobs = () => {
  const jobs = [
    {title: 'Cook', description: 'You will be making bagels'},
    {title: 'Waiter', description: 'You will be putting food on peoples table'},
    {title: 'Programmer', description: 'You will be mindlessly typing for money'},
    {title: 'Axe Maker', description: 'We need many axes made.. so many..'}
  ];

  return findJobs({}).then((collection) => {
    if (collection.length === 0) {
      return Promise.map(jobs, (job) => {
        return JobModel.create(job);
      });
    }
  });
};

exports.findJobs = findJobs;

