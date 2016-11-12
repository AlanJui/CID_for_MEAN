'use strict';

/**
 * @ngdoc service
 * @name myApp.job
 * @description
 * # job
 * Factory in the myApp.
 */
angular.module('myApp')
  .factory('Job', [
    '$resource',
    'API_URL',
    function ($resource, API_URL) {
      return $resource(API_URL + '/jobs/:id', null, {
        'update': { method: 'PUT' }
      });
    }]);
