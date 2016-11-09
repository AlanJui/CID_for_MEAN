const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');

const dbCtrl = require('./api/dbController');

const app = express();

app.set('port', (process.env.PORT || 3000));
app.set('ip', (process.env.IP || '127.0.0.1'));

const rootPath = path.normalize(`${__dirname}/..`)
app.set('appPath', path.join(rootPath, 'public'));
app.use(express.static(app.get('appPath')));
app.use(morgan('dev'));

app.set('views', `${rootPath}/server/views`);
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//===========================================================

/**
 * API
 */

// app.get('/api/jobs', (req, res) => {
//   dbCtrl.findJobs()
//     .then((jobs) => {
//       res.send(jobs);
//     });
// });

require('./api/job/jobs-service')(dbCtrl, app);

/**
 * Serve Web Page
 */
// app.get('*', (req, res) => {
//  res.render('./views/index');
// });
app.route('/*')
  .get((req, res) => {
    res.sendFile(`${rootPath}/public/index.html`);
  });

//===========================================================

/**
 * Connect to DB Server
 * Heroku => MONGODB_URI = `mongodb://heroku_n2gj9bh5:of89mtqo97mebfdt5a5k7v7iih@ds139327.mlab.com:39327/heroku_n2gj9bh5`;
 */
// const LOCAL_MONGODB_URI = `mongodb://localhost/jobfinder`;
// const mongodbUri = process.env.MONGODB_URI || LOCAL_MONGODB_URI;
// dbCtrl.connectDB(mongodbUri)
//   .then(() => {
//     console.log('Connected to MongoDB successfully!');
//     dbCtrl.seedJobs();
//   });
dbCtrl.connectDB()
  .then(() => {
    console.log('Connected to MongoDB successfully!');
    dbCtrl.seedJobs();
  });

/**
 * Connect to Web/API Server
 */
const port = app.get('port');
const ip = app.get('ip');
app.listen(port, function () {
  console.log(`Server is listening on http://${ip}:${port}`);
});

// Expose app
module.exports = app;
