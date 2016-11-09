'use strict';

angular.module('myApp')
  .factory('Jobs', [
    '$resource',
    function ($resource) {
      return $resource('/api/jobs');
    }]);
