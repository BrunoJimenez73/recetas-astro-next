import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    try {
      const recipe = await prisma.recipe.findUnique({
        where: { id: Number(id) },
      })
      if (recipe) {
        res.status(200).json(recipe)
      } else {
        res.status(404).json({ error: 'Recipe not found' })
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipe' })
    }
  } else if (req.method === 'PUT') {
    try {
      const recipe = await prisma.recipe.update({
        where: { id: Number(id) },
        data: req.body,
      })
      res.status(200).json(recipe)
    } catch (error) {
      res.status(500).json({ error: 'Error updating recipe' })
    }
  } else if (req.method === 'DELETE') {
    try {
      await prisma.recipe.delete({
        where: { id: Number(id) },
      })
      res.status(204).end()
    } catch (error) {
      res.status(500).json({ error: 'Error deleting recipe' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}