import http from 'http'
import dotenv from 'dotenv';
import userControllers from './controllers/userControllers'

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
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
