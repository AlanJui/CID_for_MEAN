'use strict';

var API_URL = 'http://localhost:3000/api/jobs';
var newJob = {
  title: 'test title',
  description: 'test description'
};

describe('$ngResource: Job', function () {
  // load the service's module
  beforeEach(module('myApp'));

  var Job, $httpBackend;
  var response;

  // instantiate service
  beforeEach(inject(function (_Job_, _$httpBackend_) {
    Job = _Job_;
    $httpBackend = _$httpBackend_;
  }));

  describe('Get job list', function () {
    it('should get jobs from DB', function () {
      $httpBackend.expect('GET', API_URL)
        .respond([
          {title: 'Cook', description: 'You will be making bagels'},
          {title: 'Waiter', description: 'You will be putting food on peoples table'},
          {title: 'Programmer', description: 'You will be mindlessly typing for money'},
          {title: 'Axe Maker', description: 'We need many axes made.. so many..'}
        ]);

      var jobs = Job.query();
      $httpBackend.flush();

      expect(jobs[0].title).toEqual('Cook');
      expect(jobs[0].description).toEqual('You will be making bagels');

      var job = jobs[jobs.length - 1];
      expect(job.title).toEqual('Axe Maker');
      expect(job.description).toEqual('We need many axes made.. so many..');
    });
  });

  // describe('Save a job', function () {
  //
  //   it('should call POST /api/jobs with job data', inject(function ($httpBackend) {
  //     $httpBackend
  //       .whenPOST(API_URL, function(data) {
  //         response = JSON.parse(data);
  //         expect(response).to.not.be.empty;
  //         return true;
  //       })
  //       .respond(200);
  //
  //     Job.save(newJob);
  //     $httpBackend.flush();
  //   }));
  // });
});
