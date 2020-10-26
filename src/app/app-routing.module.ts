import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule'},
  { path: 'recipes', loadChildren: './body/recipes/recipes.module#RecipesModule'},
  // { path: 'recipes', loadChildren: () => import('./body/recipes/recipes.module').then(module => module.RecipesModule)},
  { path: 'shopping-list', loadChildren: './body/shopping-list/shopping-list.module#ShoppingListModule'},
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
