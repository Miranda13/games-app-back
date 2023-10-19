import express from 'express'

import * as gamesController from '../controllers/games.controller'

const routerGames = express.Router()

routerGames.get('/', gamesController.getAll)

routerGames.get('/:id', gamesController.getById)

routerGames.post('/', gamesController.createGame)

routerGames.delete('/:id', gamesController.deleteGame)

routerGames.put('/:id', gamesController.updateGame)

export { routerGames as default }
