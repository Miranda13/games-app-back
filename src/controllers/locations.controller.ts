import { Request, Response } from 'express'

import * as locationsService from '../services/locations.services'
import { Location } from '../../interfaces/locations.interface'

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

const getAll = async (req: Request, res: Response) => {
  try {
    const dataResponse = await locationsService.getAll()

    res.status(dataResponse.request.status).send(dataResponse.data)
  } catch (e: any) {
    res.status(500).send(e.message)
  }
}

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
