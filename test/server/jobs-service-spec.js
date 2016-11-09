const express = require('express');
const app = express();
const expect = require('chai').expect;
const request = require('supertest');
const Promise = require('bluebird');

/**
 * Mockup DB Service for Testing
 */

let dataSavedJob;
let db = {  // Mockup Database
  findJobs: () => {
    return new Promise((resolve, reject) => {
      resolve(['Hi']);
    });
  },
  saveJob: (job) => {
    dataSavedJob = job;
  }
};
const jobService = require('.././job/jobs-service')(db, app);

//==============================================================

/**
 * Test Case
 */

describe('API Service: /api/jobs', () => {

  describe('Get Jobs', () => {

    it('should give me a json list of jobs', (done) => {
      request(app).get('/api/jobs')
        .expect('Content-Type', /json/)
        .end((err, res) => {
          expect(res.body).to.be.a('Array');
          done();
        });
    });

  });

  describe('Save Jobs', () => {
    /**
     * Validate the input from user
     */
    it('should validate that title is greater than 4 characters');

    it('should validate that title is less than 40 characters');

    it('should validate that description is greater than 4 characters');

    it('should validate that description is less than 250 characters');

    /**
     * Data Model Process with DB Server
     */
    const newJob = {title: 'Cook', description: 'You will be making bagels'};

    it('should pass the job to the database save', (done) => {
      request(app).post('/api/jobs').send(newJob).end((err, res) => {

        expect(dataSavedJob).to.deep.equal(newJob);
        done();
      });
    });

    /**
     * API Process
     */
    it('should return a status of 200 to the front end if the database saved');

    it('should return a job with an ID');

    it('should return an error if the database failed');
  });

});

