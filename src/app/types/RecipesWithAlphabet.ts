import { Recipe } from './Recipe';

export type RecipesWithAlphabet = {
    recipes: Array<Recipe>,
    alphabet: Array<string>
}