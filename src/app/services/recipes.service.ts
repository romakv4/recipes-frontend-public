import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  url: string = environment.apiUrl;

  constructor( private http: HttpClient ) { }

  getRecipes() {
    return this.http.get(`${this.url}/recipes`);
  }

  getRecipesByCategory(category: string) {
    return this.http.get(`${this.url}/recipes?category=${category}`);
  }
}
