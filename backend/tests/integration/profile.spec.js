const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Profile', () => {
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

 it('should successfully see cases for an ONG', async () => {
  await request(app)
   .get('/profile')
   .set('Authorization', `${ongId}`)
   .expect('Content-Type', /json/);
 });
});
