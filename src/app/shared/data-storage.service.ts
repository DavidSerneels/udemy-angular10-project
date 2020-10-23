import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {RecipeService} from '../body/recipes/recipe-service';
import {Recipe} from '../body/recipes/recipe.model';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class DataStorageService {
  private url = 'https://ng-course-recipe-book-ds.firebaseio.com/recipes.json';

  constructor(private http: HttpClient, private recipeService: RecipeService) {}

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(this.url, recipes)
      .subscribe(response => {
        console.log(response);
      });
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(this.url)
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {...recipe, ingredients: recipe.ingredients ? recipe.ingredients : []};
          });
        })
      )
      .subscribe(recipes => {
        this.recipeService.setRecipes(recipes);
      });
  }
}
