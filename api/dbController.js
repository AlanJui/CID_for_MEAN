const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const JobModel = require('./job/job.model');

const LOCAL_MONGODB_URI = `mongodb://localhost/jobfinder`;
const mongodbUri = process.env.MONGODB_URI || LOCAL_MONGODB_URI;

const connectDB = Promise.promisify(mongoose.connect, {
  context: mongoose
});

const createJob = Promise.promisify(JobModel.create, {
  context: JobModel
});

const findJobs = (query) => {
  if (query) {
    return Promise.cast(JobModel.find(query).exec());
  }
  else {
    return Promise.cast(JobModel.find({}).exec());
  }
};

exports.connectDB = () => {
  return connectDB(mongodbUri);
};

exports.closeConnection = () => {
  mongoose.connection.close();
};

exports.findJobs = findJobs;

exports.saveJob = (job) => {
  return createJob(job);
};

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
        return createJob(job);
      });
    }
  });
};

exports.resetJobs = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.collections['jobs'].drop(resolve, reject);
  });
};

