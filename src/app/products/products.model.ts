export class Product {
	public category: string;
	public imageUrl: string;
	public price: number;
	public title: string;

	constructor(category: string, imageUrl: string, price: number, title: string) {
		this.category = category;
		this.imageUrl = imageUrl;
		this.price = price;
		this.title = title;
	}
}