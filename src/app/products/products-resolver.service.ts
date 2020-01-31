import { Injectable } from '@angular/core';
import { Product } from './products.model';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ProductsService } from './products.service';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable({
  providedIn: 'root'
})
export class ProductsResolverService implements Resolve<Product[]> {

  constructor(private productService: ProductsService, private dataStorageService: DataStorageService, ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const products = this.productService.getAllProducts();

    if (products.length === 0) {
      return this.dataStorageService.fetchProducts();
    } else {
      return products;
    }
  }
}

