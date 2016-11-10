const dbCtrl = require('../../dbController');
const Job = require('./job.model');

exports.index = (req, res) => {
  return Job.find().exec()
    .then(dbCtrl.respondWithResult(res))
    .catch(dbCtrl.handleError(res));
};

exports.create = (req, res) => {
  return Job.create(req.body)
    // .then((doc) => {
    //   console.log(doc);
    // })
    .then(dbCtrl.respondWithResult(res, 201))
    .catch(dbCtrl.handleError(res));
};

