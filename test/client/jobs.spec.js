describe('POST /api/jobs', function () {

  var postRequestJob;
  const newJob = {
    title: 'test title',
    description: 'test description'
  };

  // Load App Module
  beforeEach(module('myApp'));

  it('should post a job to DB and saved', inject(function ($httpBackend, Jobs) {

    $httpBackend.whenPOST('/api/jobs', function(data) {
      postRequestJob = JSON.parse(data);
      expect(postRequestJob).to.not.be.empty;
      return true;
    }).respond(200);

    Jobs.save(newJob);
    $httpBackend.flush();
  }));
});
