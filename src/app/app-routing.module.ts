import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { ProductsComponent } from './products/products.component';


const appRoutes: Routes = [
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  //for lazy loading of recipe module
  {
    path: 'auth',
    loadChildren: './auth/auth.module#AuthModule'
  },
  {
    path: 'recipes',
    loadChildren: './recipes/recipes.module#RecipesModule'
  },
  {
    path: 'products',
    loadChildren: './products/products.module#ProductsModule'
  },
  {
    path: 'shopping-list',
    loadChildren: './shopping-list/shopping-list.module#ShoppingListModule'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
