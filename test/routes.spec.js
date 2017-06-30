const chai = require('chai')
const should = chai.should()
const chaiHttp = require('chai-http')
const server = require('../server.js')

const homepage = require('../public/index.html')
const links = require('../public/links')
const folders = require('../public/folders')
const helpers = require('../public/helpers')

chai.use(chaiHttp)

describe('client routes', () => {
  // it('should return homepage', (done) => {
  //   chai.request(server).get('/')
  //   .end((err, response) => {
  //     response.should.have.status(200)
  //     response.should.be.html
  //     response.res.text.should.equal(homepage)
  //     done()
  //   })
  // })
  //
  // it('should return a 404 for a route that does not exist', (done) => {
  //   chai.request(server)
  //   .get('/secretOfLife')
  //   .end((err, response) => {
  //     response.should.have.status(404)
  //     done()
  //   })
  // })
})
