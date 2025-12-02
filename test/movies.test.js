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

describe('Movies API', () => {
  test('GET /movies returns an array', async () => {
    const res = await request(app).get('/movies');

    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('GET /movies/:id returns 400 for invalid ID', async () => {
    const res = await request(app).get('/movies/INVALID_ID');

    expect(res.status).toBe(400);
    expect(res.body).toHaveProperty('error');
  });
});
