const request = require('supertest');
const app = require('../server');
const { ObjectId } = require('mongodb');

// Mock the database module
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

describe('review API', () => {
  test('GET /reviews returns an array', async () => {
    const res = await request(app).get('/reviews');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /reviews/:id returns 400 for invalid ID', async () => {
    const res = await request(app).get('/reviews/INVALID_ID');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
