'use strict';

/**
 * @ngdoc function
 * @name myApp.controller:JobCtrl
 * @description
 * # JobCtrl
 * Controller of the myApp
 */
angular.module('myApp')
  .controller('MainCtrl', function ($state, $resource, Job, API_URL) {
    var vm = this;
    var editItem, editIndex;

    vm.jobs = $resource(API_URL + '/jobs').query();

    var getItemIndex = function (item, list) {
      var index = list.indexOf(item);
      return index;
    };

    vm.submit = function () {
      if (editItem) {
        Job.update({id: editItem._id}, vm.job);
        var item = Object.create(vm.job);
        vm.jobs[editIndex] = item;
      } else {
        Job.save(vm.job);
        vm.jobs.push(vm.job);
      }
      vm.job = {};
    };

    vm.deleteItem = function (job) {
      Job.delete({id: job._id});
      var index = getItemIndex(job, vm.jobs);
      vm.jobs.splice(index, 1);
    };

    vm.showItem = function (job) {
      editIndex = getItemIndex(job, vm.jobs);
      console.log('editIndex = ' + editIndex);
      editItem = Object.create(job);
      vm.job = editItem;
    };
  });
