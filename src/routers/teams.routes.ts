import express from 'express'

import * as teamsController from '../controllers/teams.controller'

const routerTeams = express.Router()

routerTeams.get('/', teamsController.getAll)

routerTeams.get('/:id', teamsController.getById)

routerTeams.post('/', teamsController.createTeam)

routerTeams.delete('/:id', teamsController.deleteTeam)

routerTeams.put('/:id', teamsController.updateTeam)

export { routerTeams as default }