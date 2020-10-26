import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ShoppingListComponent} from './body/shopping-list/shopping-list.component';
import {ShoppingEditComponent} from './body/shopping-list/shopping-edit/shopping-edit.component';
import {AuthComponent} from './auth/auth.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  { path: 'shopping-list', component: ShoppingListComponent, children: [{ path: 'edit', component: ShoppingEditComponent}]},
  { path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
