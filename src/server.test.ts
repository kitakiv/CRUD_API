import server from './index';
import request from 'supertest';

afterAll(() => {
    server.close();
});

describe('server', () => {
    it('Get all records with a GET api/users request', async () => {
        const response = await request(server).get('/api/users');
        expect(response.statusCode).toBe(200);
        expect(response.headers['content-type']).toBe('application/json');
        expect(response.body).toEqual([])
    })

    it('A new object is created by a POST api/users request', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({ username: 'john', age: 20, hobbies: ['reading', 'swimming'] })
            .set('Content-type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(201);

        expect(response.body).toEqual({
            id: expect.any(String),
            username: 'john',
            age: expect.any(Number),
            hobbies: expect.any(Array),
        });
    });

    it('With a GET api/user/{userId} request, we try to get the created record by its id ', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({ username: 'john', age: 20, hobbies: ['reading', 'swimming'] })
        const id = response.body.id
        const response2 = await request(server).get(`/api/users/${id}`)
        expect(response2.statusCode).toBe(200);
        expect(response2.headers['content-type']).toBe('application/json');
        expect(response2.body).toEqual({
            id,
            username: 'john',
            age: 20,
            hobbies: ['reading', 'swimming'],
        });
    });

    it('We try to update the created record with a PUT api/users/{userId}request ', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({ username: 'john', age: 20, hobbies: ['reading', 'swimming'] })
        const id = response.body.id
        const response2 = await request(server)
            .put(`/api/users/${id}`)
            .send({ username: 'kate', age: 21, hobbies: ['reading', 'swimming', 'running'] })
            .set('Content-type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200);
        expect(response2.body).toEqual({
            id,
            username: 'kate',
            age: 21,
            hobbies: ['reading', 'swimming', 'running'],
        });
    })

    it('With a DELETE api/users/{userId} request, we delete the created object by id', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({ username: 'john', age: 20, hobbies: ['reading', 'swimming'] })
        const id = response.body.id
        await request(server)
            .delete(`/api/users/${id}`)
            .set('Content-type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(204);
    });

    it('With a GET api/users/{userId} request, we are trying to get a deleted object by id', async () => {
        const response = await request(server)
            .post('/api/users')
            .send({ username: 'john', age: 20, hobbies: ['reading', 'swimming'] })
        const id = response.body.id
        await request(server)
            .delete(`/api/users/${id}`)
            .set('Content-type', 'application/json')
            .expect('Content-Type', /json/)
            .expect(204);
        const response2 = await request(server).get(`/api/users/${id}`)
        expect(response2.statusCode).toBe(404);
        expect(response2.body).toEqual({ error: 'User not found' });
    })
})