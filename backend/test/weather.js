const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const fetch = require('node-fetch');

const server = require('../src/index');

chai.should();
chai.use(chaiHttp);

// node-fetch mock
sinon.stub(fetch, 'Promise').returns(Promise.resolve({
  json: () => JSON.stringify({
    list: [{ dt: 1691064000, main: { temp: 291.97 }, weather: [{ icon: '10d' }] }]
  })
}));

describe('weather api', () => {
  it('should get the weather api', async () => {
    const espooLon = 24.7434998;
    const espooLat = 60.1601125;
    chai.request(server).get(`/api/forecast?lat=${espooLat}&lon=${espooLon}`).end((err, res) => {
      if (err) {
        return;
      }
      res.should.have.status(200);
      // eslint-disable-next-line no-unused-expressions
      res.should.be.a.json;
      res.body.should.have.key('list');
      chai.assert(res.body.list.length > 0);
      chai.assert(res.body.list[0].main.temp === 291.97);
    });
  });
});
