import React, { useState } from 'react';
import './SubmitForm.css';

const SubmitForm = () => {
  const [recipe, setRecipe] = useState({
    title: '',
    category: '',
    difficulty: 'NORMAL',
    author: '',
    prepTime: '',
    ingredients: '',
    instructions: '',
    image: ''
  });

  const handleChange = (e) => {
    setRecipe({ ...recipe, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // For now, we'll just log the recipe to the console
    console.log('Submitted recipe:', recipe);
    alert('¡Receta enviada con éxito! (Nota: En este momento, la receta solo se muestra en la consola)');
    setRecipe({
      title: '',
      category: '',
      difficulty: 'NORMAL',
      author: '',
      prepTime: '',
      ingredients: '',
      instructions: '',
      image: ''
    });
  };

  return (
    <form onSubmit={handleSubmit} className="submit-form">
      <div>
        <label htmlFor="title">Título:</label>
        <input type="text" id="title" name="title" value={recipe.title} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="category">Categoría:</label>
        <input type="text" id="category" name="category" value={recipe.category} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="difficulty">Dificultad:</label>
        <select id="difficulty" name="difficulty" value={recipe.difficulty} onChange={handleChange} required>
          <option value="FACIL">Fácil</option>
          <option value="NORMAL">Normal</option>
          <option value="DIFICIL">Difícil</option>
        </select>
      </div>
      <div>
        <label htmlFor="author">Autor:</label>
        <input type="text" id="author" name="author" value={recipe.author} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="prepTime">Tiempo de preparación:</label>
        <input type="text" id="prepTime" name="prepTime" value={recipe.prepTime} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="ingredients">Ingredientes (separados por comas):</label>
        <textarea id="ingredients" name="ingredients" value={recipe.ingredients} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="instructions">Instrucciones:</label>
        <textarea id="instructions" name="instructions" value={recipe.instructions} onChange={handleChange} required />
      </div>
      <div>
        <label htmlFor="image">URL de la imagen:</label>
        <input type="url" id="image" name="image" value={recipe.image} onChange={handleChange} required />
      </div>
      <button type="submit">Enviar Receta</button>
    </form>
  );
};

export default SubmitForm;