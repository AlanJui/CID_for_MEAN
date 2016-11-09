'use strict';

angular.module('myApp', [
  'ngResource'
]);

angular.module('myApp')
  .controller('MainCtrl', function ($resource, Jobs) {
    var vm = this;

    vm.jobs = $resource('/api/jobs').query();

    vm.submit = function () {
      var job = {
        title: vm.title,
        description: vm.description
      };
      Jobs.save(job);
      vm.jobs.push(job);
    };
  });
