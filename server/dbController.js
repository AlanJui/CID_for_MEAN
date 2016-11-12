const jsonPatch = require('fast-json-patch');
const Promise = require('bluebird');
const mongoose = require('mongoose');
mongoose.Promise = Promise;

const JobModel = require('./api/job/job.model.js');

const LOCAL_MONGODB_URI = `mongodb://localhost/jobfinder`;
const mongodbUri = process.env.MONGODB_URI || LOCAL_MONGODB_URI;

//----------------------------------------------------------

const connectDB = Promise.promisify(mongoose.connect, {
  context: mongoose
});

const createJob = Promise.promisify(JobModel.create, {
  context: JobModel
});

//----------------------------------------------------------

exports.handleError = (res, statusCode) => {
  statusCode = statusCode || 500;
  return (err) => {
    res.status(statusCode).send(err);
  };
};

exports.handleEntityNotFound = (res) => {
  return (entity) => {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
};

exports.respondWithResult = (res, statusCode) => {
  statusCode = statusCode || 200;
  return (entity) => {
    if (entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
};

exports.patchUpdates = (patches) => {
  return (entity) => {
    try {
      jsonPatch.apply(entity, patches, /* validate */ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  }
};

exports.removeEntity = (res) => {
  return (entity) => {
    if (entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  }
};

//----------------------------------------------------------

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

//=================================================

const jobs = [
  {title: 'Cook', description: 'You will be making bagels'},
  {title: 'Waiter', description: 'You will be putting food on peoples table'},
  {title: 'Programmer', description: 'You will be mindlessly typing for money'},
  {title: 'Axe Maker', description: 'We need many axes made.. so many..'}
];

exports.seedJobs = () => {
  return findJobs({}).then((collection) => {
    if (collection.length === 0) {
      return Promise.map(jobs, (job) => {
        return createJob(job);
      });
    }
  });
};

exports.batchSeedJobs = () => {
  return new Promise((resolve, reject) => {
    JobModel.create(jobs, resolve);
  });
};

exports.resetJobs = () => {
  return new Promise((resolve, reject) => {
    mongoose.connection.collections['jobs'].drop(resolve, reject);
  });
};

