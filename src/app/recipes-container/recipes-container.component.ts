import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';
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

  updateAvailable = false;

  constructor(
    private recipesService: RecipesService,
    private updates: SwUpdate,
  ) { }

  ngOnInit(): void {
    this.getRecipes();
    this.checkUpdates();
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
    if (window.navigator.onLine) {
      this.recipesService.getRecipesByCategory(this.categories[index]).subscribe(
        (data: Array<Recipe>) => {
          this.currentFilteredData = data;
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.currentFilteredData = this.recipes.filter(recipe => recipe.category == this.categories[index]);
    }
  }

  checkUpdates() {
    if (!window.navigator.onLine || !this.updates.isEnabled) {
      this.updateAvailable = false;
      return;
    }
    this.updates.available.subscribe(event => {
      this.updateAvailable = true;
    });
  }

  updateApp() {
    this.updates.activateUpdate().then(() => document.location.reload());
  }

}
