import express from 'express'

import * as teamsController from '../controllers/teams.controller'

const router = express.Router()

router.get('/', teamsController.getAll)

router.get('/:id', teamsController.getById)

router.post('/', teamsController.createTeam)

router.delete('/:id', teamsController.deleteTeam)

router.put('/:id', teamsController.updateTeam)

export { router as default }