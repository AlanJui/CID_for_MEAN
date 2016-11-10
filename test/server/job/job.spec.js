const assert = require('assert');
const expect = require('chai').expect;
const sinon = require('sinon');
const Promise = require('bluebird');

const mongoose = require('mongoose');
const dbCtrl = require('../../../server/dbController');

mongoose.Promise = Promise;

// const Job = require('../../../api/job/job.model');
const jobCtrl = require('../../../server/api/job/job.controller');

describe.skip('Job Controller Test:', () => {

  let jobs;

  describe('POST /api/jobs:', () => {
    it('should not allow an empty title on post', () => {
      const spy = sinon.spy(jobCtrl, 'findJobs');

      const req = {
        body: {
          description: 'You will be making bagels'
        }
      };

      jobCtrl.findJobs();

      sinon.assert.calledOnce(spy);

      // saveSpy.restore();

    });
  });

});
