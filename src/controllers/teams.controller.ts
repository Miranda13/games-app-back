import { Request, Response } from 'express'

import * as teamsService from '../services/teams.services'
import { Team } from '../../interfaces/teams.interface'

const createTeam = async (req: Request, res: Response) => {
  try {
    const { name, url_flag_image } = req.body

    if ( !name || !url_flag_image ) {
      return res.status(400).send('Parameters bad configurated')
    }

    const newTeam: Team = {
      name,
      url_flag_image
    }

    const dataResponse = await teamsService.createTeam(newTeam)

    return res.status(dataResponse.request.status)?.send(dataResponse.request.error)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
}

const deleteTeam = async (req: Request, res: Response) => {
  try {
    const idTeam: number = +req.params?.id
    
    if (!idTeam) {
      return res.status(400).send('Bad request')
    }

    const dataResponse = await teamsService.deleteTeam(idTeam)

    return res.status(dataResponse.request.status)?.send(dataResponse.request.error)

  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

const getAll = async (req: Request, res: Response) => {
  try {
    const dataResponse = await teamsService.getAll()

    res.status(dataResponse.request.status).send(dataResponse.data)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

const getById = async (req: Request, res: Response) => {
  const idTeam: number = +req.params?.id
    
  if (!idTeam) {
    return res.status(400).send('Bad request')
  }

  try {
    const dataResponse = await teamsService.getById(idTeam)

    res.status(dataResponse.request.status).send(dataResponse.data)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

const updateTeam = async (req: Request, res: Response) => {
  try {
    const { name, url_flag_image } = req.body
    const idTeam: number = +req.params?.id
    
    if (!idTeam) {
      return res.status(400).send('Bad request')
    }

    if (!name || !url_flag_image) {
      return res.status(400).send('Parameters bad configurated')
    }

    const newTeam: Team = {
      name,
      url_flag_image
    }

    const dataResponse = await teamsService.updateTeam(newTeam, idTeam)

    return res.status(dataResponse.request.status)?.send(dataResponse.request.error)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
}

export {
  createTeam,
  deleteTeam,
  getAll,
  getById,
  updateTeam
}
