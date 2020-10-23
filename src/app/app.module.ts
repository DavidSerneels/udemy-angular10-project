import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { ShoppingListComponent } from './body/shopping-list/shopping-list.component';
import { ShoppingEditComponent } from './body/shopping-list/shopping-edit/shopping-edit.component';
import { RecipesComponent } from './body/recipes/recipes.component';
import { RecipeDetailComponent } from './body/recipes/recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './body/recipes/recipe-list/recipe-item/recipe-item.component';
import { RecipeListComponent } from './body/recipes/recipe-list/recipe-list.component';
import { DropdownDirective } from './shared/dropdown-directive';
import { ShoppingListService } from './body/shopping-list/shopping-list.service';
import {AppRoutingModule} from './app-routing.module';
import { RecipeStartComponent } from './body/recipes/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './body/recipes/recipe-edit/recipe-edit.component';
import {RecipeService} from './body/recipes/recipe-service';
import {AuthComponent} from './auth/auth.component';
import {LoadingSpinnerComponent} from './shared/loading-spinner/loading-spinner.component';
import {AuthInterceptorService} from './auth/auth-interceptor.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ShoppingListComponent,
    ShoppingEditComponent,
    RecipesComponent,
    RecipeDetailComponent,
    RecipeItemComponent,
    RecipeListComponent,
    DropdownDirective,
    RecipeStartComponent,
    RecipeEditComponent,
    AuthComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
