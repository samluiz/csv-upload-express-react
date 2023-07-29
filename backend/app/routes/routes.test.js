const request = require('supertest');
const express = require('express');
const router = require('./users');

jest.mock('../db/prisma', () => ({
  user: {
    findMany: jest.fn(),
    create: jest.fn(),
  },
}));

jest.mock('csvtojson', () => () => ({
  fromFile: jest.fn(() => [
    { name: 'User 1', country: "New Zealand" },
    { name: 'User 2', country: "Australia" },
  ]),
}));

const app = express();
app.use(express.json());
app.use(router);

describe('GET /', () => {
  it('should return a list of users', async () => {
    const mockUsers = [{ id: 1, name: 'Samuel Luiz', country: "Brazil" }];
    require('../db/prisma').user.findMany.mockResolvedValue(mockUsers);

    const response = await request(app).get('/');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockUsers);
  });

  it('should handle errors', async () => {
    require('../db/prisma').user.findMany.mockRejectedValue(new Error('Database error'));

    const response = await request(app).get('/');

    expect(response.status).toBe(500);
    expect(response.body).toEqual({ error: 'Database error' });
  });
});