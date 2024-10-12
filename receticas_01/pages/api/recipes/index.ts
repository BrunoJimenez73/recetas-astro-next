import { PrismaClient } from '@prisma/client'
import { NextApiRequest, NextApiResponse } from 'next'

const prisma = new PrismaClient()

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const recipes = await prisma.recipe.findMany()
      res.status(200).json(recipes)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching recipes' })
    }
  } else if (req.method === 'POST') {
    try {
      const recipe = await prisma.recipe.create({
        data: req.body,
      })
      res.status(201).json(recipe)
    } catch (error) {
      res.status(500).json({ error: 'Error creating recipe' })
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
}