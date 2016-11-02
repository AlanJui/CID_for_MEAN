angular.module('myApp', [
  'ngResource'
]);

angular.module('myApp')
  .controller('testCtrl', function ($resource, jobs) {
    var vm = this;

    vm.jobs = $resource('/api/jobs').query();

    vm.submit = function () {
      var job = {
        title: vm.title,
        description: vm.description
      };
      jobs.save(job);
      vm.jobs.push(job);
    };
  });
