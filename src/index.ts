import express, { Express } from 'express'
import cors from 'cors'
import 'dotenv/config'

import gamesRoutes from './routers/games.routes'
import locationsRoutes from './routers/locations.routes'
import teamsRoutes from './routers/teams.routes'

const PORT = process.env.PORT || 8080
const ENV = process.env.NODE_ENV || 'production'

const app: Express = express()

app.use(cors())

app.use(express.json())

app.use('/games', gamesRoutes)
app.use('/locations', locationsRoutes)
app.use('/teams', teamsRoutes)

const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT} in ${ENV} environment`)
})

export { app as default, server }
