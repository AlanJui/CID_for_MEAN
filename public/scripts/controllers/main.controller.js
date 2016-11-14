'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:JobCtrl
 * @description
 * # JobCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MainCtrl', function (Job) {

      var self = this;
      var editItem, editIndex;

      // Load data from DB by RESTful API
      // Job.query().then(function (jobs) {
      //   self.jobs = jobs;
      // });
      self.jobs = Job.query();

      var getItemIndex = function (item, list) {
        var index = list.indexOf(item);
        return index;
      };

      self.submit = function () {
        if (editItem) {
          Job.update({id: editItem._id}, self.job);
          var item = Object.create(self.job);
          self.jobs[editIndex] = item;
        } else {
          Job.save(self.job);
          self.jobs.push(self.job);
        }
        self.job = {};
      };

      self.deleteItem = function (job) {
        Job.delete({id: job._id});
        var index = getItemIndex(job, self.jobs);
        self.jobs.splice(index, 1);
      };

      self.showItem = function (job) {
        editIndex = getItemIndex(job, self.jobs);
        console.log('editIndex = ' + editIndex);
        editItem = Object.create(job);
        self.job = editItem;
      };
  });
