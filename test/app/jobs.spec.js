describe('Posting Jobs', function () {

  let postRequestJob;
  const newJob = {
    title: 'test title',
    description: 'test description'
  };

  beforeEach(module('myApp'));

  it('should call POST /api/jobs with job data', inject(function ($httpBackend, jobs) {

    $httpBackend.whenPOST('/api/jobs', function(data) {
      postRequestJob = JSON.parse(data);
      expect(postRequestJob).to.not.be.empty;
      return true;
    }).respond(200);

    jobs.save(newJob);
    $httpBackend.flush();
  }));
});
