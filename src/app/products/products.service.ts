import { Product } from './products.model';
import { Subject } from 'rxjs';

export class ProductsService {
  productsChanged = new Subject<Product[]>();
  products: Product[] = [];
  sortedProducts: Product[] = [];
  categories: string[] = [];

  storedProducts: Product[] = [
    new Product(
      'vegetables',
      'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/270/270609/spinach.jpg?w=1155&h=1533',
      25,
      'Spinach'
    ),
    new Product(
      'bread',
      'https://previews.123rf.com/images/scorpp/scorpp1509/scorpp150900064/45325357-fresh-bread-and-wheat-on-the-wooden.jpg',
      30,
      'Freshly Baked Bread'
    ),
    new Product(
      'fruits',
      'https://www.bbcgoodfood.com/sites/default/files/guide/guide-image/2017/01/avocado.jpg',
      175,
      'Avacado'
    ),
    new Product(
      'vegetables',
      'https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/AN_images/tomatoes-1296x728-feature.jpg?w=1155&h=1528',
      25,
      'Tomato'
    ),
    new Product(
      'vegetables',
      'https://upload.wikimedia.org/wikipedia/commons/7/7f/Lettuce_Mini_Heads_%287331119710%29.jpg',
      10,
      'Lettuce'
    ),
    new Product(
      'vegetables',
      'https://i0.wp.com/cdn-prod.medicalnewstoday.com/content/images/articles/282/282844/cauliflower-is-rich-in-nutrients-and-fiber.jpg?w=1155&h=1541',
      175,
      'Cauliflower'
    ),
    new Product(
      'fruits',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bananas.jpg/1024px-Bananas.jpg',
      125,
      'Banana'
    ),
    new Product(
      'fruits',
      'https://upload.wikimedia.org/wikipedia/commons/c/c4/Orange-Fruit-Pieces.jpg',
      170,
      'Orange'
    ),
    new Product(
      'fruits',
      'https://upload.wikimedia.org/wikipedia/commons/1/15/Red_Apple.jpg',
      200,
      'Apple'
    ),
    new Product(
      'fruits',
      'https://upload.wikimedia.org/wikipedia/commons/3/36/Kyoho-grape.jpg',
      120,
      'Grape'
    ),
    new Product(
      'fruits',
      'https://upload.wikimedia.org/wikipedia/commons/9/9e/Autumn_Red_peaches.jpg',
      200,
      'Peach'
    ),
    new Product(
      'seasonings',
      'https://upload.wikimedia.org/wikipedia/commons/8/8c/Cinnamon-other.jpg',
      50,
      'Cinnamon Sticks'
    ),
    new Product(
      'seasonings',
      'https://upload.wikimedia.org/wikipedia/commons/4/48/Saffron_Crop.JPG',
      30,
      'Saffron'
    ),
    new Product(
      'seasonings',
      'http://maxpixel.freegreatpicture.com/static/photo/1x/Seasoning-Powder-Curry-Spice-Ingredient-Turmeric-2344157.jpg',
      75,
      'Ground Turmeric'
    ),
    new Product(
      'seasonings',
      'http://maxpixel.freegreatpicture.com/static/photo/1x/Ingredient-Herb-Seasoning-Seeds-Food-Coriander-390015.jpg',
      50,
      'Coriander Seeds'
    ),
    new Product(
      'bread',
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/43/Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg/1280px-Fabrication_du_lavash_%C3%A0_Noravank_%286%29.jpg',
      15,
      'Lavash Bread'
    ),
    new Product(
      'bread',
      'https://upload.wikimedia.org/wikipedia/commons/1/1d/Bagel-Plain-Alt.jpg',
      10,
      'Bagel Bread'
    ),
    new Product(
      'fruits',
      'https://upload.wikimedia.org/wikipedia/commons/e/e1/Strawberries.jpg',
      195,
      'Strawberry'
    ),
    new Product(
      'bread',
      'https://bakerbettie.com/wp-content/uploads/2018/02/how-to-make-french-baguette-3-720x540.jpg',
      125,
      'Baguette Bread'
    ),
    new Product(
      'dairy',
      'http://s3.amazonaws.com/files.wdaily.ca/styles/content_primary_image/s3/butter.jpg?itok=chXTKqM9',
      300,
      'Butter'
    ),
    new Product(
      'dairy',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQym-6fCDbN3SDUhNHd7COQp2HvEgYb3NvQrgdI0gD-V2AtvMH2',
      200,
      'ButterMilk'
    ),
    new Product(
      'dairy',
      'https://sc01.alicdn.com/kf/UTB8DYfMX3QydeJk43PUq6AyQpXaL/Mozzarella-cheese-for-Pizza-mozzarella-cheese-Block.jpg',
      180,
      'Cheese'
    ),
    new Product(
      'vegetables',
      'https://www.economist.com/sites/default/files/20180929_BLP506.jpg',
      27,
      'Carrot'
    )
  ];

  constructor() { }

  setProducts(products: Product[]) {
    this.products = products;
    this.getAllCategories();
    this.productsChanged.next(this.products.slice());
  }

  getAllCategories() {
    this.products.forEach(element => {
      if (this.categories.indexOf(element.category) === -1) {
        this.categories.push(element.category);
      }
    });
  }

  getSortedProducts(filterString: string) {
    if(filterString === 'all') {
      return this.products.slice();
    }
    this.sortedProducts = [];

    this.products.forEach(element => {
      if (element.category === filterString) {
        this.sortedProducts.push(element);
      }
    });

    return this.sortedProducts;
  }

  getAllProducts() {
    return this.products.slice();
  }

  getProduct(index: number) {
    return this.products[index];
  }
}
