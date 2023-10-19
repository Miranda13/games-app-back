import { Request, Response } from 'express'

import * as gamesService from '../services/games.services'
import { Game } from '../../interfaces/games.interface'

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

const getAll = async (req: Request, res: Response) => {
  try {
    const dataResponse = await gamesService.getAll()

    res.status(dataResponse.request.status).send(dataResponse.data)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

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
