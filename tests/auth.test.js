import chai from 'chai';
import supertest from 'supertest-koa-agent';
import app from '../app.js';
import dotenv from 'dotenv';

dotenv.config({ path: './.env' });
 // Assurez-vous de remplacer avec le chemin correct vers votre fichier app
const { expect } = chai;
// tests/register.test.js
const request = supertest(app);

describe('Register Route Tests and list all the books', () => {
  it('should register a new user', async () => {
    const response = await request.post('/api/v1/users/register')
      .send({
        email: 'test@test.com',
        username: 'testuser',
        password: 'testpassword',
        role: 'user',
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('message', 'User registered successfully');
  });
  it('should not register a user with an existing username', async () => {
    const response = await request.post('/api/v1/users/register')
      .send({
        email: 'test@test.com',
        username: 'testuser',
        password: 'testpassword',
        role: 'user',});
        expect(response.status).to.equal(400);
    expect(response.body).to.have.property('error', 'Username or email already exists');
    });
    it('should connect a user', async () => {
      const response = await request.post('/api/v1/users/login')
        .send({
          username: 'testuser',
          password: 'testpassword',
        });
  
      expect(response.status).to.equal(200);
      expect(response.body).to.have.property('message', 'Login successful');
      expect(response.body).to.have.property('token');
    });
    it('should list all the books', async () => {
      const response = await request.get('/api/v1/users/list-all-books');
  
      expect(response.status).to.equal(200);
      expect(response.body).to.be.an('array');
    });
        


});
