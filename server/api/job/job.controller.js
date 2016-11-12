const dbCtrl = require('../../dbController');
const Model = require('./job.model');

// Get a list of Jobs
exports.index = (req, res) => {
  return Model.find().exec()
    .then(dbCtrl.respondWithResult(res))
    .catch(dbCtrl.handleError(res));
};

// Get a single Job from the DB
exports.retrieve = (req, res) => {
  return Model.findById(req.params.id).exec()
    .then(dbCtrl.handleEntityNotFound(res))
    .then(dbCtrl.respondWithResult(res))
    .catch(dbCtrl.handleError(res));

  // Model.findById(req.params.id, (err, doc) => {
  //   if (err) {
  //     return res.status(500).end();
  //   };
  //
  //   if (!doc) {
  //     res.status(404).end();
  //   } else {
  //     res.status(200).json(doc);
  //   }
  // });
};

// Create a single Job in the DB
exports.create = (req, res) => {
  return Model.create(req.body)
    .then(dbCtrl.respondWithResult(res, 201))
    .catch(dbCtrl.handleError(res));

  // Model.create(req.body, (err, doc) => {
  //   if (err) return res.status(500).send(err);
  //
  //   res.status(201).json(doc);
  // });
};

// Update the given Job in the DB at the specified ID
exports.update = (req, res) => {
  if (req.body._id) {
    delete req.body._id;
  }

  return Model.findOneAndUpdate({_id: req.params.id}, req.body, {
    upseert: true,
    setDefaultsOnInsert: true,
    runValidators: true
  }).exec()
    .then(dbCtrl.respondWithResult(res))
    .catch(dbCtrl.handleError(res));

  // if (req.body._id) delete req.body._id;
  //
  // Model.findOneAndUpdate({_id: req.params.id}, req.body, {
  //   upsert: true,
  //   setDefaultsOnInsert: true,
  //   runValidators: true
  // }, (err, doc) => {
  //   if (err) return res.status(500).end();
  //
  //   if (!doc) {
  //     res.status(404).end();
  //   } else {
  //     res.status(200).json(doc);
  //   }
  // });
};

// Updates an exissting Job in the DB
exports.patch = (req, res) => {
  Model.findById(req.params.id, (err, doc) => {
    // Handel error
    if (err) return res.status(500).send(err);

    // Handle entity not found
    if (!doc) return res.status(404).end();

    // Patch updates
    if (doc._id) delete doc._id;
    for (let property in req.body) {
      doc[property] = req.body[property];
    }
    doc.save((err) => {
      // Handle error
      if (err) return res.status(500).send(err);

      // Respond with result
      res.json(doc);
    });
  });

  // if (req.body._id) delete req.body._id;
  //
  // return Model.findById(req.params.id).exec()
  //   .then(dbCtrl.handleEntityNotFound(res))
  //   .then(dbCtrl.patchUpdates(req.body))
  //   .then(dbCtrl.respondWithResult(res))
  //   .catch(dbCtrl.handleError(res));

};

// Delete a Job from the DB
exports.delete = (req, res) => {
  return Model.findById(req.params.id).exec()
    .then(dbCtrl.handleEntityNotFound(res))
    .then(dbCtrl.removeEntity(res))
    .catch(dbCtrl.handleError(res));
};
