import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './body/recipes/recipes.component';
import {ShoppingListComponent} from './body/shopping-list/shopping-list.component';
import {RecipeListComponent} from './body/recipes/recipe-list/recipe-list.component';
import {RecipeDetailComponent} from './body/recipes/recipe-detail/recipe-detail.component';
import {ShoppingEditComponent} from './body/shopping-list/shopping-edit/shopping-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
      { path: 'list', component: RecipeListComponent },
      { path: 'detail', component: RecipeDetailComponent },
    ] },
  { path: 'shopping-list', component: ShoppingListComponent, children: [
      { path: 'edit', component: ShoppingEditComponent},
    ] },
  { path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
