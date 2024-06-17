import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
interface type {
  img: string,
  title: string,
  titleUrl: string,
  price: number,
  priceDic: number
}
@Component({
  selector: 'app-shop-sidebar',
  templateUrl: './shop-sidebar.component.html',
  styleUrls: ['./shop-sidebar.component.css']
})
export class ShopSidebarComponent {
  productData: any[] = [];
  category: string | null = null;

  banner : any = {
		pagetitle: "Shop Grid 3 Side Bar",
		bg_image: "assets/images/banner/bnr5.jpg",
		title: "Shop Grid 3 Side Bar",
	}

  constructor(private route: ActivatedRoute, private productService: ProductService){}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);
      this.category = params['category'] || null;
      this.getProducts();
    });
    
  }
  getProducts(): void {
    console.log('category', this.category);
    if (this.category) {
      this.productService.getProductsByCategory(this.category).subscribe(products => {
        console.log('Filtered Products:', products);
        this.productData = products;
      });
    }else {
      this.productService.getProducts().subscribe(products => {
        console.log('All Products:', products);
        this.productData = products;
      });
    }
  }
}
