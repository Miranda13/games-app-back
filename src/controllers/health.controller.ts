/**
 * @swagger
 * tags:
 *   - name: Health
 *     description: Health check endpoints
 */

import { Request, Response } from 'express'

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Check the health status of the API.
 *     tags: 
 *       - Health
 *     responses:
 *       200:
 *         description: The API is working correctly.
 */

const getHealth = async (req: Request, res: Response) => {
  return res.status(200).send('It is working')
}

export {
  getHealth
}
