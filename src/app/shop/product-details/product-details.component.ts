import { Component } from '@angular/core'
import { ActivatedRoute } from '@angular/router'
import { ProductService } from 'src/app/services/product.service'
import { UserService } from 'src/app/services/user.service'
declare var jQuery: any
declare var handleowlCarousel: any
declare var handleStarRating: any
@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent {
  productId: any
  productData: any
  user: any

  banner: any = {
    pagetitle: 'Product Details',
    bg_image: 'assets/images/banner/bnr2.jpg',
    title: 'Product Details',
  }

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private userService: UserService,
  ) {}

  ngOnInit(): void {
    this.getProductAndDetailsById()
    const userData = localStorage.getItem('currentUser')
    console.log('uddd', userData)
    if (userData) {
      this.user = JSON.parse(userData)
    }
  }

  getProductAndDetailsById(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'))
    this.productService
      .getProductAndDetailsById(this.productId)
      .subscribe((data: any) => {
        console.log('data', data)
        this.productData = data
        this.initializeJQueryFunctions()
      })
  }

  initializeJQueryFunctions(): void {
    ;(function ($) {
      handleowlCarousel()
      handleStarRating()
    })(jQuery)
  }

  getFormattedSizes(values: any): string {
    return values.join(', ').replace(/, ([^,]*)$/, ' & $1')
  }
}
