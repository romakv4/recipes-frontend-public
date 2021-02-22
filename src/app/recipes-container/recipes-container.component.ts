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

  recipes: Array<Recipe> = null;
  currentFilteredData: Array<Recipe> = null;
  categories: string[] = [ 'Основные блюда', 'Супы', 'Выпечка', 'Десерты', 'Закуски', 'Салаты', 'Напитки', 'Соусы' ];
  selectedCategoryIndex: number = null;

  constructor(
    private recipesService: RecipesService,
    private router: Router,
  ) {}

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

  fetchRecipesIfConnected() {
    window.navigator.onLine ? this.getRecipes() : this.currentFilteredData = this.recipes;
    this.selectedCategoryIndex = null;
  }

  getRecipes() {
    this.selectedCategoryIndex = null;
    this.recipesService.getRecipes().subscribe(
      (data: Array<Recipe>) => {
        this.recipes = data;
        this.currentFilteredData = data;
      },
      error => {
        console.log(error);
      }
    )
  }

  selectCategory(index: number) {
    this.selectedCategoryIndex = index;
    this.currentFilteredData = this.recipes.filter(recipe => recipe.category == this.categories[index]);
  }

}
