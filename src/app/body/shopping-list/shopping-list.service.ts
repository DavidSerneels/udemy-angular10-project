import {Ingredient} from '../../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService {
  ingredientsChanged = new Subject<Ingredient[]>();

  private ingredients: Ingredient[] = [
    new Ingredient('Rice', 100),
    new Ingredient('Egg', 2)
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  addIngredient(...ingredients: Ingredient[]) {
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.getIngredients());
  }

}
