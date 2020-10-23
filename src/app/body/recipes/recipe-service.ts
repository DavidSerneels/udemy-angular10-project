import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [];
  /*private recipes: Recipe[] = [
    new Recipe('Egg fried rice',
    'Uncle Roger\'s glorious egg fried rice',
    'https://upload.wikimedia.org/wikipedia/commons/7/71/Fried_rice_with_chicken_%2817234644521%29.jpg',
      [
        new Ingredient('Rice', 100),
        new Ingredient('Egg', 2),
      ]),
    new Recipe('Friet met stoofvlees',
    'Dikke frieten met een grote hoop stoofvlees',
    'https://upload.wikimedia.org/wikipedia/commons/f/f2/Stoofvlees.jpg',
      [
        new Ingredient('Frieten', 30),
        new Ingredient('Stoofvlees', 1),
      ])
  ];*/

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredient(...ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesChanged.next(this.getRecipes());
  }
}
