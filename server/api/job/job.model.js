const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Job title required']
  },
  description: {type: String}
});

module.exports = mongoose.model('Job', jobSchema);
