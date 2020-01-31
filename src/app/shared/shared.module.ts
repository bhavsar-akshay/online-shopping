import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { LoadingSpinnerComponent } from '../loading-spinner/loading-spinner.component';
import { AlertBoxComponent } from './alert-box/alert-box.component';
import { DropdownDirective } from './dropdown.directive';
import { PlaceholderDirective } from './placeholder.directive';


@NgModule({
	declarations: [
		LoadingSpinnerComponent,
		AlertBoxComponent,
		DropdownDirective,
		PlaceholderDirective
	],
	imports: [
		CommonModule
	],
	exports: [
		CommonModule,
		LoadingSpinnerComponent,
		AlertBoxComponent,
		DropdownDirective,
		PlaceholderDirective
	],
	entryComponents: [
		AlertBoxComponent
	  ]
})

export class SharedModule { }