import express, { Express } from 'express'
import cors from 'cors'
import 'dotenv/config'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'

import * as middleware from './middlewares'

import { routerTeams, routerLocations, routerGames, routerHealth} from './routers'

const swaggerOptions = {
  swaggerDefinition: {
    servers: [
      {
        url: 'http://localhost:8000',
        description: 'Local Development Server',
      },
      {
        url: 'https://games-app-5o2l.onrender.com',
        description: 'Production Server',
      },
    ],
    info: {
      title: 'API to management football games',
      description: 'API to test job',
      version: '1.0.0',
    }
  },
  apis: ['**/*.ts']
}

const swaggerSpec = swaggerJsdoc(swaggerOptions)
const PORT = process.env.PORT || 8080
const ENV = process.env.NODE_ENV || 'production'

const app: Express = express()

app.use(cors())

app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, { explorer: true }))
app.use('/games', routerGames)
app.use('/locations', routerLocations)
app.use('/teams', routerTeams)
app.use('/health', routerHealth)

app.use(middleware.errorHandler)

app.use(middleware.notFoundHandler)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV} environment`)
})

export { app as default, server }
