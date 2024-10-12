import { GetServerSideProps } from 'next'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const recipe = await prisma.recipe.findUnique({
    where: { id: Number(params.id) },
  })
  return {
    props: {
      recipe: JSON.parse(JSON.stringify(recipe)),
    },
  }
}

export default function Recipe({ recipe }) {
  if (!recipe) return <div>Recipe not found</div>

  return (
    <div>
      <h1>{recipe.title}</h1>
      <img src={recipe.image} alt={recipe.title} style={{ maxWidth: '300px' }} />
      <p><strong>Category:</strong> {recipe.category}</p>
      <p><strong>Difficulty:</strong> {recipe.difficulty}</p>
      <p><strong>Author:</strong> {recipe.author}</p>
      <p><strong>Prep Time:</strong> {recipe.prepTime}</p>
      <h2>Ingredients:</h2>
      <ul>
        {recipe.ingredients.split(',').map((ingredient, index) => (
          <li key={index}>{ingredient.trim()}</li>
        ))}
      </ul>
      <h2>Instructions:</h2>
      <p>{recipe.instructions}</p>
      <Link href="/">Back to recipes</Link>
    </div>
  )
}