import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../services/recipes.service';
import { Recipe } from '../types/Recipe';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-recipe-form',
  templateUrl: './add-recipe-form.component.html',
  styleUrls: ['./add-recipe-form.component.css']
})
export class AddRecipeFormComponent implements OnInit {

  addRecipeForm: FormGroup;

  ingredients: {
    id: number;
  }[];

  recipeSteps: {
    id: number;
  }[];

  @Input() visibilityCallback;

  categories: string[] = [ 'Основные блюда', 'Супы', 'Выпечка', 'Десерты', 'Закуски', 'Салаты', 'Напитки', 'Соусы' ];

  constructor(
    private formBuilder: FormBuilder,
    private recipesService: RecipesService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.ingredients = [{id: 1}]
    this.recipeSteps = [{id: 1}]

    this.addRecipeForm = this.formBuilder.group({
      category: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.minLength(2)]],
      cookingTime: ['', [Validators.required]],
      shortDescription: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(80)]],
      ingredients: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.minLength(3)]),
      ]),
      fullDescription: this.formBuilder.array([
        this.formBuilder.control('', [Validators.required, Validators.minLength(10)]),
      ]),
    });

    this.route.queryParams.subscribe(params => {
      this.categoryControl.patchValue(params['initialCategory']);
    });
  }

  get categoryControl() {
    return this.addRecipeForm.controls.category as FormControl;
  }
  get nameControl() {
    return this.addRecipeForm.controls.name as FormControl;
  }
  get cookingTimeControl() {
    return this.addRecipeForm.controls.cookingTime as FormControl;
  }
  get shortDescriptionControl() {
    return this.addRecipeForm.controls.shortDescription as FormControl;
  }
  get ingredientsControl() {
    return this.addRecipeForm.controls.ingredients as FormArray;
  }
  get fullDescriptionControl() {
    return this.addRecipeForm.controls.fullDescription as FormArray;
  }

  ingredientControlInvalidity(index) {
    return this.ingredientsControl.controls[index].invalid;
  }

  stepControlInvalidity(index) {
    return this.fullDescriptionControl.controls[index].invalid;
  }

  addRecipe() {
    if (this.addRecipeForm.valid) {
      this.recipesService.addRecipe(this.addRecipeForm.value as Recipe).subscribe(
        () => {
          this.snackBar.open('Рецепт успешно добавлен!', ':)', {
            panelClass: ['primary-snackbar'],
            duration: 3000,
          });
        },
        () => {
          this.snackBar.open('Произошла ошибка, повторите позже...', ':(', {
            panelClass: ['warn-snackbar'],
            duration: 5000,
          });
        }
      )
    }
  }

  addIngredient($event, newId) {
    $event.preventDefault();
    this.ingredients.push({id: newId});
    this.ingredientsControl.push(this.formBuilder.control('', [Validators.required, Validators.minLength(3)]));
  }

  deleteLastIngredient($event) {
    $event.preventDefault();
    if (this.ingredients.length !== 1) {
      this.ingredients.pop();
      this.ingredientsControl.removeAt(this.ingredients.length);
    }
  }

  addRecipeStep($event, newId) {
    $event.preventDefault();
    this.recipeSteps.push({id: newId});
    this.fullDescriptionControl.push(this.formBuilder.control('', [Validators.required, Validators.minLength(10)]));
  }

  deleteLastRecipeStep($event) {
    $event.preventDefault();
    if (this.recipeSteps.length !== 1) {
      this.recipeSteps.pop();
      this.fullDescriptionControl.removeAt(this.recipeSteps.length);
    }
  }

  back() {
    this.router.navigate(['..']);
  }

}
