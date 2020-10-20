import {Ingredient} from '../../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {
  ingredientsChanged = new EventEmitter<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Rice', 100),
    new Ingredient('Egg', 2)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(...ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.emit(this.getIngredients());
  }

}
