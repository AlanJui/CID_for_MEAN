'use strict';

/**
 * @ngdoc service
 * @name myApp.job
 * @description
 * # job
 * Factory in the myApp.
 */
angular.module('myApp')
  .factory('Job', function ($resource) {
    var resource =  $resource('http://localhost:3000/api/jobs/:id', null, {
      'update': { method: 'PUT' }
    });

    resource.getList = function (successCallback) {
      return resource.query(successCallback);
    };

    return resource;
  });
