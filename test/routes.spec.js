const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server.js')
const seedData = require('../db/seeds/seedData')

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

  it.skip('should return a 404 for a route that does not exist', (done) => {
    chai.request(server)
    .get('/secretOfLife')
    .end((err, response) => {
      response.should.have.status(404)
      done()
    })
  })
})

describe('API Routes', () => {

  before((done) => {
    // Run migrations and seeds for test database
    done()
  });

  beforeEach((done) => {
    // Would normally run run your seed(s), which includes clearing all records
    // from each of the tables
    server.locals.links = seedData;
    done();
  });

  describe('GET /api/v1/links', () => {
    it.skip('should return all links in db', (done) => {
      chai.request(server)
      .get('/api/v1/links')
      .end((err, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('url');
        response.body[0].url.should.equal('http://www.google.com');
        response.body[0].should.have.property('name');
        response.body[0].name.should.equal('B1B05zdNb');
        response.body[0].should.have.property('folder');
        response.body[0].folder.should.equal("new");
        done();
      });
    });

    it.skip('should redirect to long link when provided with short link', (done) => {
      chai.request(server)
      .get('/r1Akmf74-')
      .end((err, response) => {
        response.should.have.status(301)
        // response.should.be.json
        // response.body.should.be.a('array')
        // response.body.length.should.equal(1)
        done()
      })
    })

    it('should return 404 if student does not exist', (done) => {
      chai.request(server)
      .get('/localhost:3000/idontknow')
      .end((err, response) => {
        response.should.have.status(404)
        done()
      })
    })
  });

  describe('/api/v1/links/', () => {
    it.skip('should recieve a response of 200 when incrementing clicks', (done) => {
      chai.request(server)
      .get('/api/v1/links/click/52')
      .end((err, response) => {
        response.should.have.status(200)
        done()
      })
    })
  })

});
