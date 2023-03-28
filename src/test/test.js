"use strict";
exports.__esModule = true;
process.env.NODE_ENV = 'test';
var chai = require('chai');
var chaiHttp = require('chai-http');
var dataset_1 = require("../dataset");
chai.should();
chai.use(chaiHttp);
//get all records
describe('Retrieved all the records', function () {
    it('it should GET all the records', function (done) {
        chai.request(dataset_1["default"])
            .get('/dataset1')
            .end(function (err, response) {
            response.should.have.status(200);
            response.body.should.be.a('array');
            response.body.length.should.not.be.eql(0);
            done();
        });
    });
});
describe('/GET/:id', function () {
    it("Record found", function (done) {
        //let id = 100
        chai.request(dataset_1["default"])
            .get('/dataset1/get/100')
            .end(function (err, result) {
            result.should.have.status(200);
            result.body.should.be.a("array");
            done();
        });
    });
    it("Record not found", function (done) {
        var id = "1001";
        chai.request(dataset_1["default"])
            .get('/dataset1/get/:id')
            .end(function (err, result) {
            result.should.have.status(404);
            result.body.should.be.a("object");
            result.body.should.have.property('error_code').eql("Not_found");
            done(err);
        });
    });
});
describe('Post method', function () {
    it('Data Insufficient', function (done) {
        var record = {
            "data_schema": {
                "name": "JohndoeI",
                "mail": "jdoe1@gmail.com",
                "age": 20
            },
            "router_config": {
                "Ip_address": "192.158.1.03"
            },
            "status": "Active",
            "created_by": "System",
            "updated_by": "Madhusudhan"
        };
        chai.request(dataset_1["default"])
            .post('/dataset1/create')
            .send(record)
            .end(function (err, res) {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error_code').eql("Bad Request");
            done();
        });
    });
    //     it('Record created ', (done) => {
    //         let record = {
    //             "id": "107",
    //             "name": "JohndoeI",
    //             "data_schema": {
    //                 "mail": "jdoe1@gmail.com",
    //                 "age": 20
    //             },
    //             "router_config": {
    //                 "Ip_address": "192.158.1.03"
    //             },
    //             "status": "Active",
    //             "created_by": "System",
    //             "updated_by": "Madhusudhan"
    //         }
    //       chai.request(app)
    //         .post('/dataset1/create')
    //         .send(record)
    //         .end((err:any, res:any) => {
    //                 res.should.have.status(201);
    //                 res.body.should.have.property('success_message').eql("The record is successfully created");
    //             done();
    //           });
    //     });
    it('Existing Record', function (done) {
        var record = {
            "id": "100",
            "name": "JohndoeI",
            "data_schema": {
                "mail": "jdoe1@gmail.com",
                "age": 20
            },
            "router_config": {
                "Ip_address": "192.158.1.03"
            },
            "status": "Active",
            "created_by": "System",
            "updated_by": "Madhusudhan"
        };
        chai.request(dataset_1["default"])
            .post('/dataset1/create')
            .send(record)
            .end(function (err, res) {
            res.should.have.status(409);
            // res.body.should.be.a('object');
            done();
        });
    });
});
describe('Put method', function () {
    it('Updating record', function (done) {
        var record = {
            "data_schema": {
                "name": "JohndoeI",
                "mail": "jdoe1@gmail.com",
                "age": 20
            },
            "router_config": {
                "Ip_address": "192.158.1.03"
            },
            "status": "Active",
            "updated_by": "Madhusudhan"
        };
        chai.request(dataset_1["default"])
            .put('/dataset1/update/103')
            .send(record)
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success_message').eql("The record is successfully updated");
            done();
        });
    });
    it('Updating record -id not found', function (done) {
        var record = {
            "data_schema": {
                "name": "JohndoeI",
                "mail": "jdoe1@gmail.com",
                "age": 20
            },
            "router_config": {
                "Ip_address": "192.158.1.03"
            },
            "status": "Active",
            "updated_by": "Madhusudhan"
        };
        chai.request(dataset_1["default"])
            .put('/dataset1/update/200')
            .send(record)
            .end(function (err, res) {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error_code').eql("Not_found");
            done();
        });
    });
    it('Updating record -Null values found', function (done) {
        var record = {
            "data_schema": {
                "name": "JohndoeI",
                "mail": "jdoe1@gmail.com",
                "age": 20
            },
            "status": "Active",
            "updated_by": "Madhusudhan"
        };
        chai.request(dataset_1["default"])
            .put('/dataset1/update/103')
            .send(record)
            .end(function (err, res) {
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error_code').eql("Bad Request");
            done();
        });
    });
});
describe('Patch method', function () {
    it('Updating record', function (done) {
        var record = {
            "data_schema": {
                "name": "JohndoeI",
                "mail": "jdoe1@gmail.com",
                "age": 20
            },
            "status": "Active",
            "updated_by": "Madhusudhan"
        };
        chai.request(dataset_1["default"])
            .patch('/dataset1/partupdate/103')
            .send(record)
            .end(function (err, res) {
            res.should.have.status(200);
            res.body.should.be.a('object');
            res.body.should.have.property('success_message').eql("The record is successfully updated");
            done();
        });
    });
    it('Updating record -id not found', function (done) {
        var record = {
            "data_schema": {
                "name": "JohndoeI",
                "mail": "jdoe1@gmail.com",
                "age": 20
            },
            "router_config": {
                "Ip_address": "192.158.1.03"
            },
            "status": "Active",
            "updated_by": "Madhusudhan"
        };
        chai.request(dataset_1["default"])
            .patch('/dataset1/partupdate/200')
            .send(record)
            .end(function (err, res) {
            res.should.have.status(404);
            res.body.should.be.a('object');
            res.body.should.have.property('error_code').eql("Not_found");
            done();
        });
    });
});
describe('Delete Method', function () {
    // it("Record deleted", (done) => {
    //     //let id = 100
    //   chai.request(app)
    //     .delete('/dataset1/delete/106')
    //     .end((err: any, result: any) => {
    //       result.should.have.status(200);
    //       result.body.should.be.a('object');
    //       result.body.should.have.property('success_message').eql("The record is deleted");
    //       done();
    //     });
    // });
    it("Record not found", function (done) {
        chai.request(dataset_1["default"])["delete"]('/dataset1/delete/200')
            .end(function (err, result) {
            result.should.have.status(404);
            result.body.should.be.a("object");
            result.body.should.have.property('error_code').eql("Not_found");
            done(err);
        });
    });
});
