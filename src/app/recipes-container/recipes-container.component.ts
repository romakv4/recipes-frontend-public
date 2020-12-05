import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../types/Recipe';

@Component({
  selector: 'app-recipes-container',
  templateUrl: './recipes-container.component.html',
  styleUrls: ['./recipes-container.component.css']
})
export class RecipesContainerComponent implements OnInit {

  recipes: Array<Recipe> = [];
  categories: string[] = [ 'Основные блюда', 'Супы', 'Выпечка', 'Десерты', 'Закуски', 'Салаты', 'Напитки', 'Соусы' ];
  selectedCategoryIndex: number = null;

  constructor(
    private recipesService: RecipesService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getRecipes()
  }

  toAddForm(category: string) {
    if (category == null) {
      this.router.navigate(['add']);
    } else {
      this.router.navigate(['add'], { queryParams: { initialCategory: category }} );
    }
    
  }

  getRecipes() {
    this.selectedCategoryIndex = null;
    this.recipesService.getRecipes().subscribe(
      (data: Array<Recipe>) => {
        this.recipes = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  selectCategory(index: number) {
    this.selectedCategoryIndex = index;
    this.recipesService.getRecipesByCategory(this.categories[index]).subscribe(
      (data: Array<Recipe>) => {
        this.recipes = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  onDeleteRecipe() {
    this.getRecipes();
  }

}
