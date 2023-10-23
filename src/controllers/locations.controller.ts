/**
 * @swagger
 * tags:
 *   - name: Locations
 *     description: Location management endpoints
 */

import { Request, Response } from 'express'

import * as locationsService from '../services/locations.services'
import { Location } from '../../interfaces/locations.interface'

/**
 * @swagger
 * /locations:
 *   post:
 *     summary: Create a new location.
 *     tags: 
 *       - Locations
 *     parameters:
 *       - in: body
 *         name: location
 *         description: Data of the location to be created.
 *         schema:
 *           type: object
 *           properties:
 *             name_stadium:
 *               type: string
 *               description: Stadium name.
 *             city:
 *               type: string
 *               description: City where the stadium is located.
 *     responses:
 *       200:
 *         description: Location created successfully.
 */

const createLocation = async (req: Request, res: Response) => {
  try {
    const { name_stadium, city } = req.body

    if ( !name_stadium || !city ) {
      return res.status(400).send('Parameters bad configurated')
    }

    const newLocation: Location = {
      name_stadium,
      city
    }

    const dataResponse = await locationsService.createLocation(newLocation)

    return res.status(dataResponse.request.status)?.send(dataResponse.request.error)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
}

/**
 * @swagger
 * /locations/{id}:
 *   delete:
 *     summary: Delete a location by its ID.
 *     tags: 
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the location to be deleted.
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Location deleted successfully.
 */

const deleteLocation = async (req: Request, res: Response) => {
  try {
    const idLocation: number = +req.params?.id
    
    if (!idLocation) {
      return res.status(400).send('Bad request')
    }

    const dataResponse = await locationsService.deleteLocation(idLocation)

    return res.status(dataResponse.request.status)?.send(dataResponse.request.error)

  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

/**
 * @swagger
 * /locations:
 *   get:
 *     summary: Get the list of locations.
 *     tags: 
 *       - Locations
 *     responses:
 *       200:
 *         description: List of locations obtained successfully.
 */

const getAll = async (req: Request, res: Response) => {
  try {
    const dataResponse = await locationsService.getAll()

    res.status(dataResponse.request.status).send(dataResponse.data)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

/**
 * @swagger
 * /locations/{id}:
 *   get:
 *     summary: Get a location by its ID.
 *     tags: 
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the location to be obtained.
 *         required: true
 *         type: number
 *     responses:
 *       200:
 *         description: Location obtained successfully.
 */

const getById = async (req: Request, res: Response) => {
  const idLocation: number = +req.params?.id
    
  if (!idLocation) {
    return res.status(400).send('Bad request')
  }

  try {
    const dataResponse = await locationsService.getById(idLocation)

    res.status(dataResponse.request.status).send(dataResponse.data)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

/**
 * @swagger
 * /locations/{id}:
 *   put:
 *     summary: Update a location by its ID.
 *     tags: 
 *       - Locations
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the location to be updated.
 *         required: true
 *         type: number
 *       - in: body
 *         name: location
 *         description: Data of the updated location.
 *         schema:
 *           type: object
 *           properties:
 *             name_stadium:
 *               type: string
 *               description: Stadium name.
 *             city:
 *               type: string
 *               description: City where the stadium is located.
 *     responses:
 *       200:
 *         description: Location updated successfully.
 */

const updateLocation = async (req: Request, res: Response) => {
  try {
    const { name_stadium, city } = req.body
    const idLocation: number = +req.params?.id
    
    if (!idLocation) {
      return res.status(400).send('Bad request')
    }

    if (!name_stadium || !city) {
      return res.status(400).send('Parameters bad configurated')
    }

    const newLocation: Location = {
      name_stadium,
      city
    }

    const dataResponse = await locationsService.updateLocation(newLocation, idLocation)

    return res.status(dataResponse.request.status)?.send(dataResponse.request.error)
  } catch (e: any) {
    return res.status(500).send(e.message)
  }
}

export {
  createLocation,
  deleteLocation,
  getAll,
  getById,
  updateLocation
}
