import { GetServerSideProps } from 'next'
import { PrismaClient } from '@prisma/client'
import Link from 'next/link'

const prisma = new PrismaClient()

export const getServerSideProps: GetServerSideProps = async () => {
  const recipes = await prisma.recipe.findMany()
  return {
    props: {
      recipes: JSON.parse(JSON.stringify(recipes)),
    },
  }
}

export default function Home({ recipes }) {
  return (
    <div>
      <h1>Recipe Website</h1>
      <Link href="/submit">Submit a Recipe</Link>
      <h2>Recipes</h2>
      <ul>
        {recipes.map((recipe) => (
          <li key={recipe.id}>
            <Link href={`/recipes/${recipe.id}`}>{recipe.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}