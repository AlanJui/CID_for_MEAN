'use strict';

module.exports = (app) => {

  // API routes below
  app.use('/api/jobs', require('./api/job'));

  // All other routes should redirect to the index.html
  app.route('/*')
    .get((req, res) => {
      res.sendFile(`${rootPath}/public/index.html`);
    });

};
