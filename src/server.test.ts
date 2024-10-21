import http from 'http';
import server from './index';

afterAll(() => {
    server.close();
});

const request = (options: http.RequestOptions, postData?: string) => {
    return new Promise<{ res: http.IncomingMessage, body: string }>((resolve, reject) => {
        const req = http.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => {
                body += chunk;
            });
            res.on('end', () => {
                resolve({ res, body });
            });
        });
        req.on('error', reject);
        if (postData) {
            req.write(postData);
        }
        req.end();
    });
};

describe('server', () => {
    it('Get all records with a GET api/users request', async () => {
        const { res, body } = await request({
            hostname: 'localhost',
            port: 4000,
            path: '/api/users',
            method: 'GET'
        });

        expect(res.statusCode).toBe(200);
        expect(res.headers['content-type']).toBe('application/json');
        expect(JSON.parse(body)).toEqual([]);
    });

    it('A new object is created by a POST api/users request', async () => {
        const postData = JSON.stringify({
            username: 'john',
            age: 20,
            hobbies: ['reading', 'swimming']
        });

        const { res, body } = await request({
            hostname: 'localhost',
            port: 4000,
            path: '/api/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, postData);

        expect(res.statusCode).toBe(201);
        const responseBody = JSON.parse(body);
        expect(responseBody).toEqual({
            id: expect.any(String),
            username: 'john',
            age: expect.any(Number),
            hobbies: expect.any(Array),
        });
    });

    it('With a GET api/user/{userId} request, we try to get the created record by its id', async () => {
        const postData = JSON.stringify({
            username: 'john',
            age: 20,
            hobbies: ['reading', 'swimming']
        });

        const { body } = await request({
            hostname: 'localhost',
            port: 4000,
            path: '/api/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, postData);

        const { id } = JSON.parse(body);

        const { res: getRes, body: getBody } = await request({
            hostname: 'localhost',
            port: 4000,
            path: `/api/users/${id}`,
            method: 'GET'
        });

        expect(getRes.statusCode).toBe(200);
        expect(getRes.headers['content-type']).toBe('application/json');
        expect(JSON.parse(getBody)).toEqual({
            id,
            username: 'john',
            age: 20,
            hobbies: ['reading', 'swimming'],
        });
    });

    it('We try to update the created record with a PUT api/users/{userId} request', async () => {
        const postData = JSON.stringify({
            username: 'john',
            age: 20,
            hobbies: ['reading', 'swimming']
        });

        const { body } = await request({
            hostname: 'localhost',
            port: 4000,
            path: '/api/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, postData);

        const { id } = JSON.parse(body);

        const putData = JSON.stringify({
            username: 'kate',
            age: 21,
            hobbies: ['reading', 'swimming', 'running']
        });

        const { res: putRes, body: putBody } = await request({
            hostname: 'localhost',
            port: 4000,
            path: `/api/users/${id}`,
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(putData)
            }
        }, putData);

        expect(putRes.statusCode).toBe(200);
        expect(JSON.parse(putBody)).toEqual({
            id,
            username: 'kate',
            age: 21,
            hobbies: ['reading', 'swimming', 'running'],
        });
    });

    it('With a DELETE api/users/{userId} request, we delete the created object by id', async () => {
        const postData = JSON.stringify({
            username: 'john',
            age: 20,
            hobbies: ['reading', 'swimming']
        });

        const { body } = await request({
            hostname: 'localhost',
            port: 4000,
            path: '/api/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, postData);

        const { id } = JSON.parse(body);

        const { res: delRes } = await request({
            hostname: 'localhost',
            port: 4000,
            path: `/api/users/${id}`,
            method: 'DELETE'
        });

        expect(delRes.statusCode).toBe(204);
    });

    it('With a GET api/users/{userId} request, we are trying to get a deleted object by id', async () => {
        const postData = JSON.stringify({
            username: 'john',
            age: 20,
            hobbies: ['reading', 'swimming']
        });

        const { body } = await request({
            hostname: 'localhost',
            port: 4000,
            path: '/api/users',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(postData)
            }
        }, postData);

        const { id } = JSON.parse(body);

        await request({
            hostname: 'localhost',
            port: 4000,
            path: `/api/users/${id}`,
            method: 'DELETE'
        });

        const { res: getRes, body: getBody } = await request({
            hostname: 'localhost',
            port: 4000,
            path: `/api/users/${id}`,
            method: 'GET'
        });

        expect(getRes.statusCode).toBe(404);
        expect(JSON.parse(getBody)).toEqual({ error: 'User not found' });
    });
});
