const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('Incident', () => {
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

 it('should successfully create an incident', async () => {
  const response = await request(app)
   .post('/incidents')
   .set('Authorization', `${ongId}`)
   .send({
    title: 'Caso teste',
    description: 'Detalhes do caso',
    value: 120
   });

  console.log(response.body);

  expect(response.body).toHaveProperty('id');
 });
 it('should successfully list all incidents', async () => {
  const response = await request(app)
   .get('/incidents')
   .expect('Content-Type', /json/);

  expect(response.body).not.toHaveLength(0);
 });

 it('should successfully delete incident created (and create a new one for posterior tests)', async () => {
  await request(app)
   .delete('/incidents/1')
   .set('Authorization', `${ongId}`);

  await request(app)
   .post('/incidents')
   .set('Authorization', `${ongId}`)
   .send({
    title: 'Caso teste',
    description: 'Detalhes do caso',
    value: 120
   });
 });
});
