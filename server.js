const { createServer } = require('http')
const { parse } = require('url')
const next = require('next')

// В production режиме используем кастомный сервер
const dev = false
const hostname = process.env.HOSTNAME || process.env.HOST || '127.0.0.1'
const port = parseInt(process.env.PORT || '4000', 10)

const app = next({ dev, hostname, port })
const handle = app.getRequestHandler()

// Обработка необработанных исключений
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err)
  // Не завершаем процесс, позволяем PM2 перезапустить
})

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason)
  // Не завершаем процесс, позволяем PM2 перезапустить
})

// Graceful shutdown
let server = null

const shutdown = (signal) => {
  console.log(`Received ${signal}, shutting down gracefully...`)
  if (server) {
    server.close(() => {
      console.log('Server closed')
      process.exit(0)
    })
    // Принудительное завершение через 10 секунд
    setTimeout(() => {
      console.error('Forced shutdown')
      process.exit(1)
    }, 10000)
  } else {
    process.exit(0)
  }
}

process.on('SIGTERM', () => shutdown('SIGTERM'))
process.on('SIGINT', () => shutdown('SIGINT'))

app.prepare().then(() => {
  server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true)
      await handle(req, res, parsedUrl)
    } catch (err) {
      console.error('Error occurred handling', req.url, err)
      if (!res.headersSent) {
        res.statusCode = 500
        res.end('internal server error')
      }
    }
  })

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      console.error(`Port ${port} is already in use`)
      process.exit(1)
    } else {
      console.error('Server error:', err)
    }
  })

  server.listen(port, hostname, (err) => {
    if (err) {
      console.error('Failed to start server:', err)
      process.exit(1)
    }
    console.log(`> Ready on http://${hostname}:${port}`)
    // Сигнал PM2, что сервер готов
    if (process.send) {
      process.send('ready')
    }
  })
}).catch((err) => {
  console.error('Failed to prepare Next.js app:', err)
  process.exit(1)
})

