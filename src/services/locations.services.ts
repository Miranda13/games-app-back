import { ServiceAPIResponse } from '../../interfaces/service-response.interface'
import { Location } from '../../interfaces/locations.interface'
import { deleteLocationById, getAllLocations, getLocationById, insertLocation, updateLocationById } from '../repositories/locations.rep'
import { ILocation } from '../models/location.model'

const getAll = async (): Promise<ServiceAPIResponse<ILocation[]>> => {
  const locations = await getAllLocations()
  
  return {
    request:{ 
      status: 200
    },
    data: locations
  }
}

const getById = async (id: number): Promise<ServiceAPIResponse<ILocation>> => {
  const location = await getLocationById(id)

  if (!location) {
    return {
      request:{ 
        status: 404,
        error: {
          message: 'Not found'
        }
      }
    }
  }
  
  return {
    request:{ 
      status: 200
    },
    data: location
  }
}

const createLocation = async (location: Location): Promise<ServiceAPIResponse<number>> => {
  
  const idLocation = await insertLocation(location)

  if(!idLocation) {
    return {
      request:{ 
        status: 400,
        error: {
          message: 'Bad types sent'
        }
      }
    }
  }

  return {
    request:{ 
      status: 201
    }
  }
}

const updateLocation = async (location: Location, id: number): Promise<ServiceAPIResponse<number>> => {
  const countRows = await updateLocationById(location, id)

  if(!countRows) {
    return {
      request:{ 
        status: 404,
        error: {
          message: 'Resource not found'
        }
      }
    }
  }

  return {
    request:{ 
      status: 200
    }
  }
}

const deleteLocation = async (id: number): Promise<ServiceAPIResponse<Location>> => {
  const countRows = await deleteLocationById(id)

  if(!countRows) {
    return {
      request:{ 
        status: 404,
        error: {
          message: 'Resource not found'
        }
      }
    }
  }
  return {
    request:{ 
      status: 200
    }
  }
}

export {
  getAll,
  getById,
  createLocation,
  deleteLocation,
  updateLocation
}
