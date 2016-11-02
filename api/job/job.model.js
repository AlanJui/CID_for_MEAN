const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: {type: String},
  description: {type: String}
});

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
