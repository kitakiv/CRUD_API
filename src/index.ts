import http from 'http'
import dotenv from 'dotenv';
import userControllers from './controllers/userControllers';
import { ErrorUser, HttpCode } from './interface/interface';

dotenv.config()

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  const { url } = req

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World!')
  }
  else if (url?.startsWith('/api/users')) {
    userControllers.switchMethodUrl(req, res);
  } else {
    res.writeHead(HttpCode.NOT_FOUND, { 'Content-Type': 'text/plain' })
    res.end({error: ErrorUser.INCORRECT_ROUTE})
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
