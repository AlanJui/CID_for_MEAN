angular.module('myApp', [
  'ngResource'
]);

angular.module('myApp')
  .controller('testCtrl', function ($resource, jobs) {
    var vm = this;

    vm.jobs = $resource('/api/jobs').query();

    jobs.save({
      title: 'test title',
      description: 'test description'
    });
  });
