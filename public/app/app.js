angular.module('app', [
  'ngResource'
]);

angular.module('app')
  .controller('testCtrl', function ($resource) {
    var vm = this;

    vm.jobs = $resource('/api/jobs').query();
  });
