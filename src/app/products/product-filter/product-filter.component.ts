import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})

export class ProductFilterComponent implements OnInit {
  categories: string[] = [];

  constructor(private productService: ProductsService) { }

  ngOnInit() {
    this.categories = this.productService.categories;
  }
}
