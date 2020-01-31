import { NgModule } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { ShoppingListService } from './shopping-list/shopping-list.service';
import { RecipeService } from './recipes/recipe.service';
import { AuthInterceptorService } from './auth/auth-interceptor';
import { ProductsService } from './products/products.service';

@NgModule({
	providers: [ShoppingListService, RecipeService, ProductsService,
		{
		  provide: HTTP_INTERCEPTORS,
		  useClass: AuthInterceptorService,
		  multi: true
		}],
})

export class CoreModule { }