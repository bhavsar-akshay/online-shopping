import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';

import { Recipe } from '../recipes/recipe.model';
import { Product } from '../products/products.model';
import { RecipeService } from '../recipes/recipe.service';
import { ProductsService } from '../products/products.service';

import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })

export class DataStorageService {
  constructor(private http: HttpClient, private recipeService: RecipeService, private productService:ProductsService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        environment.databaseRecipesURL,
        recipes
      )
      .subscribe(
        data => alert('Recipe succesfully saved')
      );
  }

  storeProducts() {
    const products = this.productService.getAllProducts();
    this.http
      .put(
        environment.databaseProductsURL,
        products
      )
      .subscribe(
        data => alert('Products succesfully saved')
      );
  }

  fetchRecipes() {
    return this.http
      .get<Recipe[]>(
        environment.databaseRecipesURL,
      )
      .pipe(
        map(recipes => {
          if (recipes === null) {
            recipes = this.recipeService.recipesStored;
          }
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ? recipe.ingredients : []
            };
          });
        }),
        tap(recipes => {
          this.recipeService.setRecipes(recipes);
        })
      );
  }

  fetchProducts() {
    return this.http
      .get<Product[]>(
        environment.databaseProductsURL,
      )
      .pipe(
        map(products => {
          if (products === null) {
            products = this.productService.storedProducts;
          }
          return products;
        }),
        tap(products => {
          this.productService.setProducts(products);
        })
      );
  }
}

