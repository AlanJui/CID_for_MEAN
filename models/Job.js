const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
  title: {type: String},
  description: {type: String}
});

// exports.seedJobs = () => {
jobSchema.statics.seedJobs = () => {
  Job.find({}).exec((err, collection) => {
    if (collection.length === 0) {
      const jobs = [
        {title: 'Cook', description: 'You will be making bagels'},
        {title: 'Waiter', description: 'You will be putting food on peoples table'},
        {title: 'Programmer', description: 'You will be mindlessly typing for money'},
        {title: 'Axe Maker', description: 'We need many axes made.. so many..'}
      ];

      Job.create(jobs);
    }
  });
};

const Job = mongoose.model('Job', jobSchema);
module.exports = Job;
