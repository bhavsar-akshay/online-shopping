import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { ProductsRoutingModule } from './products-routing.module';

import { ProductsComponent } from './products.component';
import { ProductFilterComponent } from './product-filter/product-filter.component';
import { ProductStartComponent } from './product-start/product-start.component';
import { ProductLayoutComponent } from './product-layout/product-layout.component';
import { ProductCardComponent } from './product-layout/product-card/product-card.component';

@NgModule({
	declarations: [
		ProductsComponent,
		ProductCardComponent,
		ProductFilterComponent,
		ProductStartComponent,
		ProductLayoutComponent
	],
	imports: [
		SharedModule,
		RouterModule,
		ReactiveFormsModule,
		ProductsRoutingModule
	]
})

export class ProductsModule { }