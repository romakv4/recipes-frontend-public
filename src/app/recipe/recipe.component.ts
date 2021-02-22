import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {

  @Input() recipe;

  fullRecipeVisibility = false;

  constructor() { }

  toggleFDVisibility() {
    this.fullRecipeVisibility = !this.fullRecipeVisibility;
  }
}
