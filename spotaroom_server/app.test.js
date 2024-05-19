const request = require('supertest');
const app = require('./server');

describe('GET /api/flats', () => {
  it('responds with JSON', async () => {
    const response = await request(app).get('/api/flats');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});

describe('GET /api/flats/:id', () => {
  it('responds with JSON', async () => {
    const response = await request(app).get('/api/flats/1');
    expect(response.statusCode).toBe(200);
    expect(response.headers['content-type']).toMatch(/json/);
  });
});