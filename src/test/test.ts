// process.env.NODE_ENV = 'test';
// var chai = require('chai');
// var chaiHttp = require('chai-http');
// import app from "../dataset"

// chai.should();

// chai.use(chaiHttp)

// describe('Page not found',()=>{
//     it('page not found',(done)=>{
//         chai.request(app)
//             .get('/')
//             .end((err: any, result: any) => {
//                 result.should.have.status(404);
//                 result.body.should.be.a("object");
//                 result.body.should.have.property('error_code').eql("Page Not Found");
//                 done();
//               });

//     })
// })


// //get all records
// describe('Retrieved all the records', () => {
//     it('it should GET all the records', (done) => {
//         chai.request(app)
//             .get('/dataset1')
//             .end((err: any, response: any) => {    
//                 response.should.have.status(200);
//                 response.body.should.be.a('array');
//                 response.body.length.should.not.be.eql(0);
//                 done();
//             })
//     })
// })

// describe('/GET/:id', () => {
//     it("Record found", (done) => {
//         //let id = 100
//       chai.request(app)
//         .get('/dataset1/get/100')
//         .end((err: any, result: any) => {
//           result.should.have.status(200);
//           result.body.should.be.a("array");
//           done();
//         });
//     });

//     it("Record not found", (done) => {
//         let id = "1001"
//       chai.request(app)
//         .get('/dataset1/get/:id')
//         .end((err: any, result: any) => {
//           result.should.have.status(404);
//           result.body.should.be.a("object");
//           result.body.should.have.property('error_code').eql("Not_found");
//           done();
//         });
//     });
//   });

//   describe('Delete Method', () => {
//     it("Record deleted", (done) => {
//         //let id = 100
//       chai.request(app)
//         .delete('/dataset1/delete/107')
//         .end((err: any, result: any) => {
//           result.should.have.status(200);
//           result.body.should.be.a('object');
//           result.body.should.have.property('success_message').eql("The record is deleted");
//           done();
//         });
//     });

//     it("Record not found", (done) => {
//       chai.request(app)
//         .delete('/dataset1/delete/200')
//         .end((err: any, result: any) => {
//           result.should.have.status(404);
//           result.body.should.be.a("object");
//           result.body.should.have.property('error_code').eql("Not_found");
//           done(err);
//         });
//     });
//   });


// describe('Post method', () => {
//     it('Data Insufficient', (done) => {
//         let record = {
//             "data_schema": {
//                 "name": "JohndoeI",
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
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('error_code').eql("Bad Request");
//             done();
//           });
//     });
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

//     it('Existing Record', (done) => {
//         let record = {
//             "id": "100",
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
//           .post('/dataset1/create')
//           .send(record)
//           .end((err:any, res:any) => {
                
//                 res.should.have.status(409);
//                 // res.body.should.be.a('object');
//             done();
//           });
//     });

// });

// describe('Put method', () => {
//     it('Updating record', (done) => {
//         let record = {
//             "data_schema": {
//                 "name":"JohndoeI", 
//                 "mail":"jdoe1@gmail.com",
//                 "age":20
//                 },
//             "router_config": {
//                "Ip_address": "192.158.1.03"
//             },
//             "status": "Active",
//             "updated_by": "Madhusudhan"
//         }
//       chai.request(app)
//         .put('/dataset1/update/103')
//         .send(record)
//         .end((err:any, res:any) => {               
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('success_message').eql("The record is successfully updated");
//             done();
//           });
//     });
//     it('Updating record -id not found', (done) => {
//         let record = {
//             "data_schema": {
//                 "name":"JohndoeI", 
//                 "mail":"jdoe1@gmail.com",
//                 "age":20
//                 },
//             "router_config": {
//                "Ip_address": "192.158.1.03"
//             },
//             "status": "Active",
//             "updated_by": "Madhusudhan"
//         }
//       chai.request(app)
//         .put('/dataset1/update/200')
//         .send(record)
//         .end((err:any, res:any) => {               
//                 res.should.have.status(404);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('error_code').eql("Not_found");
//             done();
//           });
//     });
//     it('Updating record -Null values found', (done) => {
//         let record = {
//             "data_schema": {
//                 "name":"JohndoeI", 
//                 "mail":"jdoe1@gmail.com",
//                 "age":20
//                 },
//             "status": "Active",
//             "updated_by": "Madhusudhan"
//         }
//       chai.request(app)
//         .put('/dataset1/update/103')
//         .send(record)
//         .end((err:any, res:any) => {               
//                 res.should.have.status(400);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('error_code').eql("Bad Request");
//             done();
//           });
//     });


// })

// describe('Patch method', () => {
//     it('Updating record', (done) => {
//         let record = {
//             "data_schema": {
//                 "name":"JohndoeI", 
//                 "mail":"jdoe1@gmail.com",
//                 "age":20
//                 },
//             "status": "Active",
//             "updated_by": "Madhusudhan"
//         }
//       chai.request(app)
//         .patch('/dataset1/partupdate/103')
//         .send(record)
//         .end((err:any, res:any) => {               
//                 res.should.have.status(200);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('success_message').eql("The record is successfully updated");
//             done();
//           });
//     });
//     it('Updating record -id not found', (done) => {
//         let record = {
//             "data_schema": {
//                 "name":"JohndoeI", 
//                 "mail":"jdoe1@gmail.com",
//                 "age":20
//                 },
//             "router_config": {
//                "Ip_address": "192.158.1.03"
//             },
//             "status": "Active",
//             "updated_by": "Madhusudhan"
//         }
//       chai.request(app)
//         .patch('/dataset1/partupdate/200')
//         .send(record)
//         .end((err:any, res:any) => {               
//                 res.should.have.status(404);
//                 res.body.should.be.a('object');
//                 res.body.should.have.property('error_code').eql("Not_found");
//             done();
//           });
//     });
// })