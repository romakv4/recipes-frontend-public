import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipesContainerComponent } from './recipes-container/recipes-container.component';

const routes: Routes = [
  { path: '', component: RecipesContainerComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
