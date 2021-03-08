import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../types/Recipe';
import { map, startWith } from 'rxjs/operators';
import { MatDialog } from '@angular/material/dialog';
import { AlphabetSelectModalComponent } from '../alphabet-select-modal/alphabet-select-modal.component';
import { RecipesWithAlphabet } from '../types/RecipesWithAlphabet';

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

  searchControl = new FormControl();
  recipeNames: Array<string> = [];
  filteredRecipeNames: Observable<Array<string>> = of(this.recipeNames);

  alphabet: Array<String> = [];
  alphabetSelectorApplied = false;

  constructor(
    private recipesService: RecipesService,
    public dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.getRecipes();
    this.filteredRecipeNames = this.searchControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.recipeNames.filter(name => name.toLowerCase().includes(filterValue));
  }

  fetchRecipesIfConnected() {
    window.navigator.onLine ? this.getRecipes() : this.currentFilteredData = this.recipes;
    this.selectedCategoryIndex = null;
  }

  onSelectName(event) {
    this.currentFilteredData = this.currentFilteredData.filter(recipe => recipe.name === event.option.value);
  }

  getRecipes() {
    this.selectedCategoryIndex = null;
    this.recipesService.getRecipes().subscribe(
      (data: RecipesWithAlphabet) => {
        const { recipes, alphabet } = data;
        this.recipes = recipes;
        this.currentFilteredData = recipes;
        this.recipeNames = [];
        recipes.forEach(recipe => this.recipeNames.push(recipe.name));
        this.alphabet = alphabet;
      },
      error => {
        console.log(error);
      }
    )
  }

  selectCategory(index: number) {
    this.selectedCategoryIndex = index;
    this.searchControl.setValue('');
    if (window.navigator.onLine) {
      this.recipesService.getRecipesByCategory(this.categories[index]).subscribe(
        (data: RecipesWithAlphabet) => {
          const { recipes, alphabet } = data;
          this.currentFilteredData = recipes;
          this.recipeNames = [];
          recipes.forEach(recipe => this.recipeNames.push(recipe.name));
          this.alphabet = alphabet;
        },
        error => {
          console.log(error);
        }
      )
    } else {
      this.currentFilteredData = this.recipes.filter(recipe => recipe.category == this.categories[index]);
      this.recipeNames = [];
      this.currentFilteredData.forEach(recipe => this.recipeNames.push(recipe.name));
    }
  }

  openAlphabetModal() {
    const dialogRef = this.dialog.open(AlphabetSelectModalComponent, { autoFocus: false, data: this.alphabet });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const filtered = this.currentFilteredData.filter(recipe => recipe.name.toLocaleLowerCase().startsWith(result));
        if (filtered.length !== 0) {
          this.currentFilteredData = filtered;
          this.alphabetSelectorApplied = true;
        }
      }
      this.recipeNames = [];
      this.currentFilteredData.forEach(recipe => this.recipeNames.push(recipe.name));
    });
  }

  resetAlphabetFilter() {
    this.currentFilteredData = this.recipes;
    this.alphabetSelectorApplied = false;
  }
}
