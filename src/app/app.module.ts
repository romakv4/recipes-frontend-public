import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';

import { MaterialModule } from './material.module';
import { AppComponent } from './app.component';
import { RecipesContainerComponent } from './recipes-container/recipes-container.component';
import { RecipeComponent } from './recipe/recipe.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    RecipesContainerComponent,
    RecipeComponent,
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    AppRoutingModule,
    NgxSkeletonLoaderModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production, scope: "./" }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
