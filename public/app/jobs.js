angular.module('myApp')
  .factory('jobs', [
    '$resource',
    function ($resource) {
      return $resource('/api/jobs');
    }]);
