const express = require('express');
const mongoose = require('mongoose');

const JobModel = require('./models/Job');

const app = express();

app.set('port', (process.env.PORT || 3000));
app.set('ip', (process.env.IP || '127.0.0.1'));

app.set('views', __dirname);
app.set('view engine', 'jade');

app.use(express.static(`${__dirname}/public`));

//===========================================================
/**
 * API
 */
app.get('/api/jobs', (req, res) => {
  JobModel.find({})
    .exec((err, jobs) => {
      res.send(jobs);
    });
});

/**
 * Serve Web Page
 */
app.get('*', (req, res) => {
 res.render('index');
});

//===========================================================

const LOCAL_MONGODB_URI = `mongodb://localhost/jobfinder`;
const MONGODB_URI = `mongodb://heroku_n2gj9bh5:of89mtqo97mebfdt5a5k7v7iih@ds139327.mlab.com:39327/heroku_n2gj9bh5`;
// const MONGODB_URI = `mongodb://cid4mean_op:ChingHai99@ds139327.mlab.com:39327/heroku_n2gj9bh5`;

const mongodbUri = MONGODB_URI || LOCAL_MONGODB_URI;
mongoose.connect(mongodbUri);
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');
  JobModel.seedJobs();
});

const port = app.get('port');
const ip = app.get('ip');
app.listen(port, function () {
  console.log(`Server is listening on http://${ip}:${port}`);
});
