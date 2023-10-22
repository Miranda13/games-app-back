import express from 'express'

import { getHealth } from '../controllers/health.controller'

const routerHealth = express.Router()

routerHealth.get('/', getHealth)

export { routerHealth as default }