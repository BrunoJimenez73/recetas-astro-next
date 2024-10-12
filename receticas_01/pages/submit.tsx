import { useState } from 'react'
import { useRouter } from 'next/router'

export default function SubmitRecipe() {
  const [recipe, setRecipe] = useState({
    title: '',
    category: '',
    difficulty: 'NORMAL',
    author: '',
    prepTime: '',
    ingredients: '',
    instructions: '',
    image: ''
  })
  const router = useRouter()

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await fetch('/api/recipes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(recipe),
      })
      if (response.ok) {
        alert('Recipe submitted successfully!')
        router.push('/')
      } else {
        alert('Error submitting recipe')
      }
    } catch (error) {
      console.error('Error:', error)
      alert('Error submitting recipe')
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit a Recipe</h1>
      <div>
        <label htmlFor="title">Title:</label>
        <input type="text" id="title" name="title" value={recipe.title} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="category">Category:</label>
        <input type="text" id="category" name="category" value={recipe.category} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="difficulty">Difficulty:</label>
        <select id="difficulty" name="difficulty" value={recipe.difficulty} onChange={handleChange} required>
          <option value="EASY">Easy</option>
          <option value="NORMAL">Normal</option>
          <option value="HARD">Hard</option>
        </select>
      </div>
      <div>
        <label htmlFor="author">Author:</label>
        <input type="text" id="author" name="author" value={recipe.author} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="prepTime">Prep Time:</label>
        <input type="text" id="prepTime" name="prepTime" value={recipe.prepTime} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="ingredients">Ingredients (comma-separated):</label>
        <textarea id="ingredients" name="ingredients" value={recipe.ingredients} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="instructions">Instructions:</label>
        <textarea id="instructions" name="instructions" value={recipe.instructions} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="image">Image URL:</label>
        <input type="url" id="image" name="image" value={recipe.image} onChange={handleChange} required />
      </div>
      <button type="submit">Submit Recipe</button>
    </form>
  )
}