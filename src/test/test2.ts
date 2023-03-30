
var chai = require('chai');
var chaiHttp = require('chai-http');
import { should } from 'chai';
import app from '../dataset';
import * as dataset2 from '../datasetqueries';
import { query } from 'express';
var spies = require('chai-spies');
chai.use(spies)
chai.use(chaiHttp)
chai.should()
const sandbox = chai.spy.sandbox();
chai.use(should)

describe('get records', () => {
    it('should GET all the records', (done) => {
        chai.spy.on(dataset2.pool, 'query', () => {
            return { "rows": [{}] }
        })

        chai.request(app)
            .get('/dataset1')
            .end((err: any, response: any) => {
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.not.be.eql(0);
                chai.spy.restore(dataset2.pool, 'query')
                done();
            })
    })
});    

describe('get records by id', () => {
    it('should GET the records by id', (done) => {
        chai.spy.on(dataset2.pool, 'query', () => {
            return { "rows": [{}] }
        })

        chai.request(app)
            .get('/dataset1/get/100')
            .end((err: any, response: any) => {
                console.log(response.body);
                
                response.should.have.status(200);
                response.body.should.be.a('array');
                response.body.length.should.not.be.eql(0);
                chai.spy.restore(dataset2.pool, 'query')
                done();
            })
    })
    it('records not found', (done) => {
        chai.spy.on(dataset2.pool, 'query', () => {
            return { "rowsCount":0 }
        })
        chai.request(app)
            .get('/dataset1/get/200')
            .end((err: any, response: any) => {
                response.should.have.status(404);
                response.body.should.not.be.a('array');
                //response.body.length.should.be.eql(0);
                chai.spy.restore(dataset2.pool, 'query')
                done();
            })
    })
});    
