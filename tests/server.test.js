const request = require('supertest');
const app = require('../src/server');

describe('todo api', () => {
  test('GET /health returns ok', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.status).toBe('ok');
  });

  test('POST /todos creates a todo', async () => {
    const res = await request(app).post('/todos').send({ title: 'workshop prep' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('workshop prep');
  });
});
