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
    it('should return all links in db', (done) => {
      chai.request(server)
      .get('/api/v1/links')
      .end((err, response) => {
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

    it('should redirect to long link when provided with short link', (done) => {
      chai.request(server)
      .get('/localhost:3000/r1Akmf74-')
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
    it('should create a new link', (done) => {
      chai.request(server)
      .post('/api/v1/links')
      .send({
        lastname: 'Knuth',
        program: 'FE',
        enrolled: true
      })
      .end((err, response) => {
        response.should.have.status(201);
        response.body.should.be.a('object');
        response.body.should.have.property('lastname');
        response.body.lastname.should.equal('Knuth');
        response.body.should.have.property('program');
        response.body.program.should.equal('FE');
        response.body.should.have.property('enrolled');
        response.body.enrolled.should.equal(true);
        chai.request(server)
        .get('/api/v1/students')
        .end((err, response) => {
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(4);
          response.body[3].should.have.property('lastname');
          response.body[3].lastname.should.equal('Knuth');
          response.body[3].should.have.property('program');
          response.body[3].program.should.equal('FE');
          response.body[3].should.have.property('enrolled');
          response.body[3].enrolled.should.equal(true);
          done();
        });
      });
    });

    it('should not create a record with missing data', (done) => {
      chai.request(server)
      .post('/api/v1/students')
      .send({
        lastname: 'Knuth',
        program: 'FE'
      })
      .end((err, response) => {
        response.should.have.status(422);
        response.body.error.should.equal('You are missing data!');
        done();
      });
    });
  });
});
