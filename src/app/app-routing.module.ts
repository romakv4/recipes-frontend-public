import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddRecipeFormComponent } from './add-recipe-form/add-recipe-form.component';
import { RecipesContainerComponent } from './recipes-container/recipes-container.component';

const routes: Routes = [
  { path: '', component: RecipesContainerComponent },
  { path: 'add', component: AddRecipeFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
