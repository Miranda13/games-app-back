import { Request, Response } from 'express'

const getHealth = async (req: Request, res: Response) => {
  return res.status(200).send('It is working')
}

export {
  getHealth
}
