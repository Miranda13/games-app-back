import express from 'express'

import * as locationsController from '../controllers/locations.controller'

const routerLocations = express.Router()

routerLocations.get('/', locationsController.getAll)

routerLocations.get('/:id', locationsController.getById)

routerLocations.post('/', locationsController.createLocation)

routerLocations.delete('/:id', locationsController.deleteLocation)

routerLocations.put('/:id', locationsController.updateLocation)

export { routerLocations as default }
