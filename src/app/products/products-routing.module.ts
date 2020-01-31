import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../auth/auth-guard';
import { ProductsResolverService } from './products-resolver.service';

import { ProductsComponent } from './products.component';
import { ProductStartComponent } from './product-start/product-start.component';
import { ProductLayoutComponent } from './product-layout/product-layout.component';

const productRoutes: Routes = [
	{
		path: '',
		component: ProductsComponent,
		canActivate: [AuthGuard],
		children: [
			{ path: '', component: ProductStartComponent },
			{
				path: ':category',
				component: ProductLayoutComponent,
				resolve: [ProductsResolverService]
			}
		]
	}
];

@NgModule({
	imports: [RouterModule.forChild(productRoutes)],
	exports: [RouterModule]
})

export class ProductsRoutingModule { }