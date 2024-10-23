import http from 'http'
import dotenv from 'dotenv';
import userControllers from './controllers/userControllers';
import { ErrorUser, HttpCode } from './interface/interface';
import cluster from 'node:cluster';
import { availableParallelism } from 'node:os';
import process from 'node:process';

dotenv.config()

const numCPUs = availableParallelism();
const PORT = process.env.PORT || 3000

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);

  for (let i = 0; i < numCPUs; i++) {
    const worker = parseInt(PORT as string) + i
    cluster.fork({
      worker_port: worker,
    });
  }

  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died`);
  });
} else {
    const port = process.env.worker_port || 3000
    const server = http.createServer((req, res) => {
        try {
          const { url } = req
          const urlPath = url || ''
          if (urlPath === '/') {
            res.writeHead(200, { 'Content-Type': 'text/plain' })
            res.end('Hello, World!')
          } else if (urlPath.startsWith('/api/users')) {
            userControllers.switchMethodUrl(req, res);
          } else if (urlPath !== '/' && !urlPath.startsWith('/api/users')) {
            res.writeHead(HttpCode.NOT_FOUND, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ error: ErrorUser.INCORRECT_ROUTE }))
          }
        } catch (error) {
          res.writeHead(HttpCode.INTERNAL_SERVER_ERROR, { 'Content-Type': 'application/json' })
          res.end(JSON.stringify({ error: (error as Error).message }))
          console.log(error)
        }
      })
      server.listen(port, () => {
        console.log(`Server is running on port ${port}`)
      })
}