'use strict';

describe('$ngResource: Job with mock', function () {
  var API_URL = 'http://localhost:3000/api/jobs';
  var Job, $httpBackand;

  beforeEach(angular.mock.module('myApp'));
  // beforeEach(angular.module('myApp'));

  beforeEach(function () {
    angular.mock.inject(function ($injector) {
      $httpBackand = $injector.get('$httpBackend');
      Job = $injector.get('Job');
    })
  });

  describe('Job List', function () {
    it('should get jobs from DB', inject(function (Job) {
      $httpBackand.expectGET(API_URL)
        .respond([
          { title: 'Cook', description: 'You will be making bagels' },
          { title: 'Waiter', description: 'You will be putting food on peoples table' },
          { title: 'Programmer', description: 'You will be mindlessly typing for money' },
          { title: 'Axe Maker', description: 'We need many axes made.. so many..' }
        ]);

      var jobs = Job.getList();
      $httpBackand.flush();

      expect(jobs[ 0 ].title).toEqual('Cook');
      expect(jobs[ 0 ].description).toEqual('You will be making bagels');

      var job = jobs[ jobs.length - 1 ];
      expect(job.title).toEqual('Axe Maker');
      expect(job.description).toEqual('We need many axes made.. so many..');
    }));
  });
});
