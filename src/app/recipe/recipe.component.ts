import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {

  @Input() recipe;

  isShareSupported: boolean = false;
  fullRecipeVisibility = false;

  constructor() {
    this.isShareSupported = navigator.share != undefined;
  }

  toggleFDVisibility() {
    this.fullRecipeVisibility = !this.fullRecipeVisibility;
  }

  async shareRecipe() {
    const text = this.getRecipeTextPresentationForSharing();
    await navigator.share({text});
  }

  getRecipeTextPresentationForSharing() {
    let recipeFullDescriptionRepresentation = "";
    this.recipe.fullDescription.forEach((step, index) => {
      if (index !== this.recipe.fullDescription.length - 1) {
        recipeFullDescriptionRepresentation += `${index + 1}) ${step}\n`;
      } else {
        recipeFullDescriptionRepresentation += `${index + 1}) ${step}`;
      }
    });
    return `${this.recipe.name}\n${this.recipe.category}\n${this.recipe.cookingTime}\n${recipeFullDescriptionRepresentation}`;
  }
}
