import http from 'http'
import { v4 as uuidv4 } from 'uuid'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (url === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' })
    res.end('Hello, World!')
  }

  // Example route for fetching items
  else if (url === '/items' && method === 'GET') {
    const items = [
      { id: uuidv4(), name: 'Item 1' },
      { id: uuidv4(), name: 'Item 2' },
    ]
    res.writeHead(200, { 'Content-Type': 'application/json' })
    res.end(JSON.stringify(items))
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('404 Not Found')
  }
})

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

console.log(uuidv4())
