
var chai = require('chai');
var chaiHttp = require('chai-http');
import { should } from 'chai';
import app from '../dataset';
import * as dataset2 from '../datasetqueries';
import { query } from 'express';
import { log } from 'console';
var spies = require('chai-spies');
let expect = chai.expect;
chai.use(spies)
chai.use(chaiHttp)
chai.should()
chai.use(should)

describe('Page not found', () => {
it("page not found found", (done) => {
  chai.spy.on(dataset2.pool, "query", () => {
    return { "rows": [{}] };
  });
  chai
    .request(app)
    .post("/dataset1/creat")
    .end((err: any, response: any) => {  
      response.status.should.be.equal(404);
      response.body.should.be.an("object");
      chai.spy.restore(dataset2.pool, "query");
      done();
    });
});
})


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

  it('empty table', (done) => {
    chai.spy.on(dataset2.pool, 'query', () => {
      return { "rows": [] }
    })

    chai.request(app)
      .get('/dataset1')
      .end((err: any, response: any) => {
        expect(response.status).to.equal(400);
        expect(response.body).to.be.an("object");
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
        response.should.have.status(200);
        response.body.should.be.a('array');
        response.body.length.should.not.be.eql(0);
        chai.spy.restore(dataset2.pool, 'query')
        done();
      })
  })
  it('records not found', (done) => {
    chai.spy.on(dataset2.pool, 'query', () => {
      return { "rows": [] }
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


describe("create new dataset", () => {
  it("should Post datasets", (done) => {
    chai.spy.on(dataset2.pool, "query", () => {
      return Promise.resolve({ "rows": [] });
    });

    chai
      .request(app)
      .get("/dataset1/get/45")
      .end((err: any, response: any) => {
        if (response.status == 404) {
          chai
            .request(app)
            .post('/dataset1/create')
            .end((err: any, response: any) => {
              response.should.have.status(200);
              response.body.should.be.an("object");
              chai.spy.restore(dataset2.pool, "query");
              done();
            });
        }
      });
  });

  //   it('Data Insufficient', (done) => {
  //     let record = {
  //         "data_schema": {
  //             "name": "JohndoeI",
  //             "mail": "jdoe1@gmail.com",
  //             "age": 20
  //         },
  //         "router_config": {
  //             "Ip_address": "192.158.1.03"
  //         },
  //         "status": "Active",
  //         "created_by": "System",
  //         "updated_by": "Madhusudhan"
  //     }
  //   chai.request(app)
  //     .post('/dataset1/create')
  //     .send(record)
  //     .end((err:any, res:any) => {               
  //             res.should.have.status(400);
  //             res.body.should.be.a('object');
  //             res.body.should.have.property('error_code').eql("Bad Request");
  //         done();
  //       });
  // });

  // it("error", (done) => {
  //   chai.spy.on(dataset2.pool, "query", () => {
  //   return Promise.resolve({ "rows": [] });
  //   });

  //   chai
  //     .request(app)
  //     .get("/dataset1/get/45")
  //     .end((err: any, response: any) => {
  //       if (response.status == 404) {
  //         chai
  //           .request(app)
  //           .post('/dataset1/create')
  //           .end((err: any, response: any) => {
  //             response.should.have.status(200);
  //             response.body.should.be.an("object");
  //             chai.spy.restore(dataset2.pool, "query");
  //             done();
  //           });}
  //       })
  //     });

  it("duplicate found", (done) => {
    chai.spy.on(dataset2.pool, "query", () => {
      return { "rows": [{}] };
    });
    chai
      .request(app)
      .post("/dataset1/create")
      .end((err: any, response: any) => {
        response.status.should.be.equal(409);
        response.body.should.be.an("object");
        chai.spy.restore(dataset2.pool, "query");
        done();
      });
  });
})

describe("delete record", () => {
  it("should delete a record if id is present", (done) => {
    chai.spy.on(dataset2.pool, "query", () => {
      return { "rows": [{}] };
    });

    chai
      .request(app)
      .delete('/dataset1/delete/107')
      .end((err: any, response: any) => {
        response.should.have.status(200);
        response.body.should.be.an("object");
        chai.spy.restore(dataset2.pool, "query");
        done();
      });

  });

  it("id not found if id is not present", (done) => {
    chai.spy.on(dataset2.pool, "query", () => {
      return { "rows": [] };
    });
    chai
      .request(app)
      .delete('/dataset1/delete/107')
      .end((err: any, response: any) => {
        response.should.have.status(404);
        response.body.should.be.an("object");
        chai.spy.restore(dataset2.pool, "query");
        done();
      });
  });
});

describe("update record", () => {
  it("should update the record for given id if present", (done) => {
    chai.spy.on(dataset2.pool, "query", () => {
      return Promise.resolve({ rowCount: 1 });
    });
    chai
      .request(app)
      .put('/dataset1/update/100')
      .end((err: any, response: any) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an("object");
        chai.spy.restore(dataset2.pool, "query");
        done();
      });
  });

  

  it('Updating record -Null values found', (done) => {
    let record = {
        "data_schema": {
            "name":"JohndoeI", 
            "mail":"jdoe1@gmail.com",
            "age":20
            },
        "status": "Active",
        "updated_by": "Madhusudhan"
    }
  chai.request(app)
    .put('/dataset1/update/103')
    .send(record)
    .end((err:any, res:any) => {               
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error_code').eql("Bad Request");
        done();
      });
    })
  it("is not present", (done) => {
    chai.spy.on(dataset2.pool, "query", () => {
      return Promise.resolve({ rowCount: 0 });
    });
    chai
      .request(app)
      .put('/dataset1/update/100')
      .end((err: any, response: any) => {
        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.an("object");
        chai.spy.restore(dataset2.pool, "query");
        done();
      });
  });

  
})

describe("partial update record", () => {
  it("should update the record for given id if present", (done) => {
    chai.spy.on(dataset2.pool, "query", () => {
      return { "rows": [{}] };
    });
    chai
      .request(app)
      .patch("/dataset1/partupdate/100")
      .end((err: any, response: any) => {
        expect(response.status).to.be.equal(200);
        expect(response.body).to.be.an("object");
        chai.spy.restore(dataset2.pool, "query");
        done();
      });
  });

  it('Updating record -invalid type found', (done) => {
    let wrecord = {
        
    "data_schema": "abc",
    "status": "InActive",
    "updated_by": "Madhusudhan"
}
    
  chai.request(app)
    .patch('/dataset1/partupdate/103')
    .send(wrecord)
    .end((err:any, res:any) => {               
            res.should.have.status(400);
            res.body.should.be.a('object');
            res.body.should.have.property('error_code').eql("Bad Request");
        done();
      });
});

  it("should return id not exists ", (done) => {
    chai.spy.on(dataset2.pool, "query", () => {
      return { "rows": [] };
    });
    chai
      .request(app)
      .patch("/dataset1/partupdate/100")
      .end((err: any, response: any) => {
        expect(response.status).to.be.equal(404);
        expect(response.body).to.be.an("object");
        chai.spy.restore(dataset2.pool, "query");
        done();
      });
  });
});


