const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server.js')
const seedData = require('../db/seeds/seedData')

process.env.NODE_ENV = 'test'
const environment = 'test'
const configuration = require('../knexfile')[environment]
const database = require('knex')(configuration)

chai.use(chaiHttp)

describe('client routes', () => {
  it('should return homepage', (done) => {
    chai.request(server).get('/')
    .end((err, response) => {
      response.should.have.status(200)
      response.should.be.html
      done()
    })
  })

  it('should return a 404 for a route that does not exist', (done) => {
    chai.request(server)
    .get('/secretOfLife')
    .end((err, response) => {
      response.should.have.status(404)
      done()
    })
  })
})

describe('API Routes', () => {

  beforeEach((done) => {
    database.migrate.latest()
    .then(() => {
      return database.seed.run()
      .then(() => {
        done()
      })
    })
  })

  afterEach((done) => {
    database.migrate.rollback()
    .then(() => {
      done()
    })
  });

    // Would normally run run your seed(s), which includes clearing all records
    // from each of the tables
  //   server.locals.links = seedData;
  //   done();
  // });

  describe('GET /api/v1/links', () => {
    it('should return all links in db', (done) => {
      chai.request(server)
      .get('/api/v1/links')
      .end((err, response) => {
        // console.log(response.body);
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(4);
        response.body[0].should.have.property('url');
        response.body[0].url.should.equal('http://www.yahoo.com');
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('localhost:3000/B1B6WMmEb');
        response.body[0].should.have.property('folder');
        response.body[0].folder.should.equal("google");
        done();
      });
    });

    // it('should redirect to long link when provided with short link', (done) => {
    //   chai.request(server)
    //   .get('/Syr9bm7E-')
    //   .end((err, response) => {
    //     // console.log(response.body);
    //     response.should.have.status(301);
    //     // response.should.be.json
    //     // response.body.should.be.a('array')
    //     // response.body.length.should.equal(1)
    //     done()
    //   })
    // })

    it('should return 404 if link does not exist', (done) => {
      chai.request(server)
      .get('/localhost:3000/idontknow')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })
  });

  describe('/api/v1/links/', () => {
    it('should recieve a response of 200 when incrementing clicks', (done) => {
      chai.request(server)
      .get('/api/v1/links/click/52')
      .end((err, response) => {
        response.should.have.status(200)
        done()
      })
    })
  })

  describe('POST /api/v1/links', () => {
    it('should insert new folder into database', (done) => {
      chai.request(server)
      .post('/api/v1/links')
      .send({
        url: 'http://www.warwick.com',
        name: 'http://www.warwick.com',
        folder: 'guitars',
        clicks: 0
      })
      .end((err, response) => {
        response.should.have.status(201)
        response.body[0].should.equal(5) //id in server
        done()
      })
    })
  })
});
