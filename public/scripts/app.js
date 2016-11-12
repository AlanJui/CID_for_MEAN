'use strict';

angular.module('myApp', [
  'ngResource'
]);

angular.module('myApp')

  .constant('API_URL', 'http://localhost:3000/api')

  .controller('MainCtrl', function ($resource, Jobs, API_URL) {
    var vm = this;

    vm.jobs = $resource(API_URL + '/jobs').query();

    vm.submit = function () {
      var job = {
        title: vm.title,
        description: vm.description
      };
      Jobs.save(job);
      vm.jobs.push(job);
    };
  });
