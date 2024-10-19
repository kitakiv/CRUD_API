import UsersModel from '../models/usersModel'
import { HttpMethod } from '../interface/interface'
import * as http from 'http';

class UserControllers {
  private command: UsersModel

  constructor() {
    this.command = new UsersModel()
  }

  public switchMethodUrl(request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
    const url = request.url || ''
    if (url.startsWith('/api/users')) {
      switch (request.method) {
        case HttpMethod.GET:
          this.methodGet(request, response)
          break
        default:
          break
      }
    }
  }

  private async methodGet(request: http.IncomingMessage, response: http.ServerResponse<http.IncomingMessage>) {
    const url = request.url || ''
    if (url === '/api/users' || url === '/api/users/') {
      const result = await this.command.getAllUsers();
      response.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(result.body))
    } else if (url.startsWith('/api/users/')) {
      const result = await this.command.getUserById(url.split('/')[3]);
      response.writeHead(result.statusCode, { 'Content-Type': 'application/json' })
      response.end(JSON.stringify(result.body))
    }
  }
}

const userControllers = new UserControllers()
export default userControllers
