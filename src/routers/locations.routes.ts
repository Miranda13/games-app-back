import express from 'express'

import * as locationsController from '../controllers/locations.controller'

const router = express.Router()

router.get('/', locationsController.getAll)

router.get('/:id', locationsController.getById)

router.post('/', locationsController.createLocation)

router.delete('/:id', locationsController.deleteLocation)

router.put('/:id', locationsController.updateLocation)

export { router as default }
