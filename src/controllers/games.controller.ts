/**
 * @swagger
 * tags:
 *   - name: Games
 *     description: Games management endpoints
 */

import { Request, Response } from 'express'

import * as gamesService from '../services/games.services'
import { Game } from '../../interfaces/games.interface'

/**
 * @swagger
 * /games:
 *   post:
 *     summary: Create a new game.
 *     tags: 
 *       - Games
 *     parameters:
 *       - in: body
 *         name: game
 *         description: Data of the game to be created.
 *         schema:
 *           type: object
 *           properties:
 *             hour:
 *               type: string
 *               description: Game time.
 *             date:
 *               type: string
 *               description: Game date.
 *             teams:
 *               type: array
 *               description: List of teams playing.
 *             location_id:
 *               type: number
 *               description: Location ID of the game.
 *             played:
 *               type: boolean
 *               description: Indicates whether the game has been played.
 *     responses:
 *       200:
 *         description: Game created successfully.
 */

const createGame = async (req: Request, res: Response) => {
  try {
    const { hour, date, teams, location_id, played  } = req.body

    if ( !hour || !date || !teams || !location_id || played === undefined ) {
      return res.status(400).send('Parameters bad configurated')
    }

    const newGame: Game = {
      hour,
      date,
      teams,
      location_id,
      played
    }

    const dataResponse = await gamesService.createGame(newGame)

    return res.status(dataResponse.request.status)?.send(dataResponse.request.error)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
}

/**
 * @swagger
 * /api/games/{id}:
 *   delete:
 *     summary: Delete a game by its ID.
 *     tags: 
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the game to be deleted.
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Game deleted successfully.
 */

const deleteGame = async (req: Request, res: Response) => {
  try {
    const idGame: number = +req.params?.id
    
    if (!idGame) {
      return res.status(400).send('Bad request')
    }

    const dataResponse = await gamesService.deleteGame(idGame)

    return res.status(dataResponse.request.status)?.send(dataResponse.request.error)

  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

/**
 * @swagger
 * /games:
 *   get:
 *     summary: Get the list of games.
 *     tags: 
 *       - Games
 *     responses:
 *       200:
 *         description: List of games obtained successfully.
 */

const getAll = async (req: Request, res: Response) => {
  try {
    const dataResponse = await gamesService.getAll()

    res.status(dataResponse.request.status).send(dataResponse.data)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

/**
 * @swagger
 * /games/{id}:
 *   get:
 *     summary: Get a game by its ID.
 *     tags: 
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the game to be obtained.
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Game obtained successfully.
 */

const getById = async (req: Request, res: Response) => {
  const idGame: number = +req.params?.id
    
  if (!idGame) {
    return res.status(400).send('Bad request')
  }

  try {
    const dataResponse = await gamesService.getById(idGame)

    res.status(dataResponse.request.status).send(dataResponse.data)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

/**
 * @swagger
 * /games/{id}:
 *   put:
 *     summary: Update a game by its ID.
 *     tags: 
 *       - Games
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the game to be updated.
 *         required: true
 *         type: number
 *       - in: body
 *         name: game
 *         description: Data of the updated game.
 *         schema:
 *           type: object
 *           properties:
 *             hour:
 *               type: string
 *               description: Game time.
 *             date:
 *               type: string
 *               description: Game date.
 *             teams:
 *               type: array
 *               description: List of teams playing.
 *             location_id:
 *               type: number
 *               description: Location ID of the game.
 *             played:
 *               type: boolean
 *               description: Indicates whether the game has been played.
 *     responses:
 *       200:
 *         description: Game updated successfully.
 */

const updateGame = async (req: Request, res: Response) => {
  try {
    const { hour, date, teams, location_id, played  } = req.body
    const idGame: number = +req.params?.id

    if ( !hour || !date || !teams || !location_id || played === undefined ) {
      return res.status(400).send('Parameters bad configurated')
    }
    
    if (!idGame) {
      return res.status(400).send('Bad request')
    }

    const newGame: Game = {
      hour,
      date,
      teams,
      location_id,
      played
    }

    const dataResponse = await gamesService.updateGame(newGame, idGame)

    return res.status(dataResponse.request.status)?.send(dataResponse.request.error)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
}

export {
  createGame,
  deleteGame,
  getAll,
  getById,
  updateGame
}
