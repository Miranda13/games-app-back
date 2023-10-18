import express from 'express'

import * as gamesController from '../controllers/games.controller'

const router = express.Router()

router.get('/', gamesController.getAll)

router.get('/:id', gamesController.getById)

router.post('/', gamesController.createGame)

router.delete('/:id', gamesController.deleteGame)

router.put('/:id', gamesController.updateGame)

export { router as default }
