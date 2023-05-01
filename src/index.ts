import { app } from './app'
import { env } from './shared/env'

app
  .listen({
    host: '0.0.0.0',
    port: env.PORT,
  })

  .then(() => {
    console.log(`🚀 HTTP Server is running in 'http://localhost:${env.PORT}'`)
  })
