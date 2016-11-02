const bodyParser = require('body-parser');

module.exports = (db, app) => {
  app.use(bodyParser.json());

  app.get('/api/jobs', (req, res) => {
    db.findJobs().then((collection) => {
      res.send(collection);
    });
  });

  app.post('/api/jobs', (req, res) => {
    db.saveJob(req.body);
    res.end();
  });
};

