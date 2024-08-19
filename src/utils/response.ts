import { Response } from 'express'

export const successResponse = (res: Response, data: any) => {
  res.status(200).json(data)
}

export const errorResponse = (res: Response, error: any) => {
  res.status(500).json({ error: error.message || 'An error occurred' })
}
