import UsersModel from '../models/usersModel'
import { HttpMethod, UrlUsers, HttpCode } from '../interface/interface'
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
                default:
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
            const result = await this.command.createUser(JSON.parse(body));
            response.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify(result.body))
        });
        request.on('error', (error) => {
            response.writeHead(HttpCode.BAD_REQUEST, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ error: error.message }))
        })
    }
}

const userControllers = new UserControllers()
export default userControllers
