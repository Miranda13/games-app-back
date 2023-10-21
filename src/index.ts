import express, { Express } from 'express'
import cors from 'cors'
import 'dotenv/config'

import * as middleware from './middlewares'

import { routerTeams, routerLocations, routerGames} from './routers'

const PORT = process.env.PORT || 8080
const ENV = process.env.NODE_ENV || 'production'

const app: Express = express()

app.use(cors())

app.use(express.json())

app.use('/games', routerGames)
app.use('/locations', routerLocations)
app.use('/teams', routerTeams)

app.use(middleware.errorHandler)

app.use(middleware.notFoundHandler)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV} environment`)
})

export { app as default, server }
