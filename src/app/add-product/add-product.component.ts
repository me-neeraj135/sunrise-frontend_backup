import { Component } from '@angular/core'
import { ProductService } from '../services/product.service'
// import Products from '../../assets/data/product.json'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Router } from '@angular/router'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent {
  addProductForm: FormGroup
  images: string[] = []
  user: any

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
  ) {
    this.addProductForm = this.fb.group({
      productId: ['', Validators.required],
      title: ['', Validators.required],
      img: [null, Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      priceDisc: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser')

    if (userData) {
      this.user = JSON.parse(userData)
    }
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          this.images.push(e.target.result)
        }
        reader.readAsDataURL(files[i])
      }
    }
  }

  onSubmit() {
    const product: any = {
      ...this.addProductForm.value,
      images: this.images,
    }

    this.productService.addProduct(product).subscribe(
      (response) => {
        console.log('Product added successfully!', response)
        setTimeout(() => {
          this.router.navigate(['/addProduct'])
        }, 2000)
      },
      (error) => {
        console.error('Error adding product', error)
      },
    )
  }
}
