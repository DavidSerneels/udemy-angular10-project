import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {RecipesComponent} from './body/recipes/recipes.component';
import {ShoppingListComponent} from './body/shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './body/shopping-list/shopping-edit/shopping-edit.component';
import {RecipeStartComponent} from './body/recipes/recipe-start/recipe-start.component';
import {RecipeDetailComponent} from './body/recipes/recipe-detail/recipe-detail.component';
import {RecipeEditComponent} from './body/recipes/recipe-edit/recipe-edit.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'recipes', component: RecipesComponent, children: [
      { path: '', component: RecipeStartComponent },
      { path: 'new', component: RecipeEditComponent },
      { path: ':id', component: RecipeDetailComponent },
      { path: ':id/edit', component: RecipeEditComponent },
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
