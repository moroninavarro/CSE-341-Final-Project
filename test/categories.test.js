const request = require('supertest');
const app = require('../server');
const { ObjectId } = require('mongodb');
jest.mock('../data/database', () => ({
  getDatabase: () => ({
    db: () => ({
      collection: () => ({
        find: () => ({ toArray: async () => [] }),
        findOne: async () => null,
      }),
    }),
  }),
}));

describe('Categories API', () => {
  test('GET /categories returns an array', async () => {
    const res = await request(app).get('/categories');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /categories/:id returns 400 for invalid ID', async () => {
    const res = await request(app).get('/categories/INVALID_ID');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
