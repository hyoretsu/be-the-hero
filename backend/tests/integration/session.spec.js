const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Session', () => {
 let ongId;
 beforeAll(async () => {
  await connection.migrate.latest();

  const { id } = await connection('ongs')
   .select('id')
   .first();
  ongId = id;
 });

 afterAll(async () => {
  await connection.destroy();
 });

 it('should successfully log in to an ONG', async () => {
  const response = await request(app)
   .post('/sessions')
   .send({
    id: `${ongId}`
   });

  expect(response.body).toHaveProperty('name');
 });
});
