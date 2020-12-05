import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { RecipesContainerComponent } from './recipes-container/recipes-container.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddRecipeFormComponent } from './add-recipe-form/add-recipe-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RecipesContainerComponent,
    RecipeComponent,
    AddRecipeFormComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
