'use strict';

var API_URL = 'http://localhost:3000/api/jobs';
var jobList = [
  {title: 'Cook', description: 'You will be making bagels'},
  {title: 'Waiter', description: 'You will be putting food on peoples table'},
  {title: 'Programmer', description: 'You will be mindlessly typing for money'},
  {title: 'Axe Maker', description: 'We need many axes made.. so many..'}
];

function indexOfList(list, item) {
  var len = list.length;

  for (var i = 0; i < len; i++) {
    var keys = Object.keys(list[i]);
    var flg = true;
    for (var j = 0; j < keys.length; j++) {
      var value = list[i][keys[j]];
      if (item[keys[j]] !== value) {
        flg = false;
      }
    }
    if (flg == true) {
      return i;
    }
  }
  return -1;
}

describe('MainCtrl', function () {
  beforeEach(module('myApp'));

  var mockService;
  var ctrl;

  beforeEach(module(function ($provide) {
    var list = jobList;

    mockService = {
      query: function () {
        return list;
      },
      save: function (item) {
        list.push(item);
        return item;
      },
      get: function (item) {
        return indexOfList(list, item);
      }
    };

    $provide.value('Job', mockService);
  }));

  // instantiate service
  beforeEach(inject(function ($controller) {
    ctrl = $controller('MainCtrl');
  }));

  describe('Get job list', function () {

    it('should have a MainCtrl instance', function () {
      // expect(!!ctrl).toBe(true);
      expect(ctrl).toBeDefined();
    });

    it('should get jobs from DB', function () {
      expect(ctrl.jobs).toEqual(jobList);
    });
  });

  describe('POST /api/jobs', function () {

    var newJob = {
      title: 'test title',
      description: 'test description'
    };

    it('should post a job to DB and saved', function () {
      ctrl.editItem = false;
      ctrl.job = newJob;
      ctrl.submit();

      var index = jobList.length - 1;
      expect(jobList[index].title).toEqual(newJob.title);
    });

    it('should update a job to DB and saved', inject(function (Job) {
      var updatedJob = {
        title: '[Updated]test title',
        description: '[Updated]test description'
      };

      ctrl.editItem = true;
      ctrl.job = updatedJob;
      ctrl.submit();

      var index = Job.get(updatedJob);
      expect(jobList[index].title).toEqual(updatedJob.title);
    }));
  });

});

