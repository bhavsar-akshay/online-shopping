import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ProductsService } from '../products.service';
import { Product } from '../products.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-product-layout',
  templateUrl: './product-layout.component.html',
  styleUrls: ['./product-layout.component.css']
})
export class ProductLayoutComponent implements OnInit, OnDestroy {
  subscription: Subscription;
  products: Product[] = [];

  constructor(private route: ActivatedRoute, private router: Router, private productService: ProductsService) { }

  ngOnInit() {
    this.subscription = this.productService.productsChanged
      .subscribe(
        (products: Product[]) => {
          this.products = products;
        }
      );

    this.route.params
      .subscribe(
        (params: Params) => {
          this.products = this.productService.getSortedProducts(params['category']);
        }
      );
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
