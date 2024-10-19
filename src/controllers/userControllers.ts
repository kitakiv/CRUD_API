import UsersModel from '../models/usersModel'
import { HttpMethod, UrlUsers, HttpCode, ErrorUser } from '../interface/interface'
import * as http from 'http';

class UserControllers {
    private command: UsersModel

    constructor() {
        this.command = new UsersModel()
    }

    public switchMethodUrl(request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
        const url = request.url || ''
        if (url.startsWith(UrlUsers.ALL)) {
            switch (request.method) {
                case HttpMethod.GET:
                    this.methodGet(request, response)
                    break
                case HttpMethod.POST:
                    this.methodPost(request, response)
                    break
                case HttpMethod.PUT:
                    this.methodPut(request, response)
                    break
                case HttpMethod.DELETE:
                    this.methodDelete(request, response)
                    break
                default:
                    this.defaultMethod(request, response)
                    break
            }
        }
    }

    private async methodGet(request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
        const url = request.url || ''
        if (url === UrlUsers.ALL || url === UrlUsers.ALL_ID) {
            const result = await this.command.getAllUsers();
            response.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(result.body))
        } else if (url.startsWith(UrlUsers.ALL_ID)) {
            const result = await this.command.getUserById(url.split('/')[3]);
            response.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(result.body))
        }
    }

    private async methodPost(request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        })
        request.on('end', async () => {
            const id = request.url?.split('/')[3] || '';
            if (id !== '') {
                response.writeHead(HttpCode.BAD_REQUEST, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify({ error: ErrorUser.INCORRECT_ID }))
            }
            const result = await this.command.createUser(JSON.parse(body));
            response.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(result.body))
        });
    }

    private async methodPut(request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
        let body = '';
        request.on('data', (chunk) => {
            body += chunk.toString();
        })
        request.on('end', async () => {
            const userId = request.url?.split('/')[3] || ''
            const result = await this.command.updateUser(userId, JSON.parse(body));
            response.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(result.body))
        });
        request.on('error', (error) => {
            response.writeHead(HttpCode.BAD_REQUEST, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ error: error.message }))
        })
    }

    private async methodDelete(request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
        const userId = request.url?.split('/')[3] || ''
        const result = await this.command.deleteUser(userId);
        response.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify(result.body))
    }

    private defaultMethod(request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
        response.writeHead(HttpCode.BAD_REQUEST, { 'Content-Type': 'application/json' })
        response.end(JSON.stringify({ error: ErrorUser.INCORRECT_METHOD }))
    }
}

const userControllers = new UserControllers()
export default userControllers
