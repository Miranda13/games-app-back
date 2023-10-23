/**
 * @swagger
 * tags:
 *   - name: Teams
 *     description: Team management endpoints
 */

import { Request, Response } from 'express'

import * as teamsService from '../services/teams.services'
import { Team } from '../../interfaces/teams.interface'

/**
 * @swagger
 * /teams:
 *   post:
 *     summary: Create a new team.
 *     tags: 
 *       - Teams
 *     parameters:
 *       - in: body
 *         name: team
 *         description: Data of the team to be created.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Team name.
 *             url_flag_image:
 *               type: string
 *               description: URL of the team's flag image.
 *     responses:
 *       200:
 *         description: Team created successfully.
 */

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

/**
 * @swagger
 * /teams/{id}:
 *   delete:
 *     summary: Delete a team by its ID.
 *     tags: 
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team to be deleted.
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Team deleted successfully.
 */

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

/**
 * @swagger
 * /teams:
 *   get:
 *     summary: Get the list of teams.
 *     tags: 
 *       - Teams
 *     responses:
 *       200:
 *         description: List of teams obtained successfully.
 */

const getAll = async (req: Request, res: Response) => {
  try {
    const dataResponse = await teamsService.getAll()

    res.status(dataResponse.request.status).send(dataResponse.data)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

/**
 * @swagger
 * /teams/{id}:
 *   get:
 *     summary: Get a team by its ID.
 *     tags: 
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team to be obtained.
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Team obtained successfully.
 */

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

/**
 * @swagger
 * /teams/{id}:
 *   put:
 *     summary: Update a team by its ID.
 *     tags: 
 *       - Teams
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the team to be updated.
 *         required: true
 *         type: number
 *       - in: body
 *         name: team
 *         description: Data of the updated team.
 *         schema:
 *           type: object
 *           properties:
 *             name:
 *               type: string
 *               description: Team name.
 *             url_flag_image:
 *               type: string
 *               description: URL of the team's flag image.
 *     responses:
 *       200:
 *         description: Team updated successfully.
 */

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
