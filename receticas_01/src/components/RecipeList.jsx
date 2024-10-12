import React, { useState, useEffect, useRef } from 'react';
import './RecipeList.css';

const RecipeList = ({ recipes }) => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [filteredRecipes, setFilteredRecipes] = useState(recipes);
  const recipeListRef = useRef(null);

  useEffect(() => {
    const handleCategoryChange = () => {
      if (recipeListRef.current) {
        const newCategory = recipeListRef.current.getAttribute(
          'data-selected-category'
        );
        setSelectedCategory(newCategory || '');
      }
    };

    const observer = new MutationObserver(handleCategoryChange);

    if (recipeListRef.current) {
      observer.observe(recipeListRef.current, {
        attributes: true,
        attributeFilter: ['data-selected-category'],
      });
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    setFilteredRecipes(
      selectedCategory
        ? recipes.filter((recipe) => recipe.category === selectedCategory)
        : recipes
    );
  }, [selectedCategory, recipes]);

  return (
    <div className="recipe-list" ref={recipeListRef}>
      {filteredRecipes.map((recipe) => (
        <div key={recipe.id} className="recipe-card">
          <img src={recipe.image} alt={recipe.title} className="recipe-image" />
          <div className="recipe-content">
            <h2>{recipe.title}</h2>
            <p>
              <strong>Categoría:</strong> {recipe.category}
            </p>
            <p>
              <strong>Dificultad:</strong> {recipe.difficulty}
            </p>
            <p>
              <strong>Autor:</strong> {recipe.author}
            </p>
            <p>
              <strong>Tiempo de preparación:</strong> {recipe.prepTime}
            </p>
            <p>
              <strong>Ingredientes:</strong> {recipe.ingredients}
            </p>
            <a href={`/recipes/${recipe.id}`} className="view-recipe">
              Ver receta completa
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeList;
