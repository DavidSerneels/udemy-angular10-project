import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


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
    RecipeStartComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule
  ],
  providers: [ShoppingListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
