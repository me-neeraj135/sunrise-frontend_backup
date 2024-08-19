import { Component, OnInit } from '@angular/core'
import { ProductService } from '../../services/product.service'
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
  FormArray,
} from '@angular/forms'
import { Router } from '@angular/router'
import { MatDialog } from '@angular/material/dialog'
import { SuccessDialogComponent } from 'src/app/util/success-dialog/success-dialog.component'
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  productForm: FormGroup
  user: any
  images: string[] = []
  additionalImagesPreview: string[] = []
  videoPreview: string | ArrayBuffer | null = null
  videoError: string | null = null

  banner: any = {
    pagetitle: 'Add New PRODUCT',
    bg_image: 'assets/images/banner/bnr5.jpg',
    title: 'Add New Product',
  }

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router,
    private dialog: MatDialog,
  ) {
    this.productForm = this.fb.group({
      title: ['', Validators.required],
      additionalImages: this.fb.array([null]),
      availability: ['', Validators.required],
      category: ['', Validators.required],
      color: ['', Validators.required],
      currency: ['', Validators.required],
      deliveryTime: ['', Validators.required],
      description: ['', Validators.required],
      features: this.fb.array([]),
      img: [null],

      price: ['', [Validators.required, this.priceValidator]],
      priceDiscount: ['', this.priceValidator],
      rating: ['', this.ratingValidator],
      returnPolicy: [''],
      shipping_Cost: ['', [Validators.required, this.priceValidator]],
      size: this.fb.array([]),
      specifications: this.fb.group({
        dimensions: ['', Validators.required],
        material: ['', Validators.required],
        weight: ['', Validators.required],
      }),
      stock: ['', [Validators.required, this.numberValidator]],
      vendorContact: ['', [Validators.required, Validators.email]],
      vendorId: ['', Validators.required],
      vendorName: ['', Validators.required],
      video: [null],
      isActive: 1,
    })
  }

  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser')
    if (userData) {
      this.user = JSON.parse(userData)
    }
    console.log('pdf--', this.productForm.valid)
  }

  getControl(value: string): AbstractControl | null {
    return this.productForm.get(value)
  }

  // Handle additional image file changes
  onAdditionalImagesChange(event: any) {
    // this.additionalImagesPreview = [] // Reset additional images preview

    if (event.target.files.length > 0) {
      // this.additionalImages.clear() // Clear form array

      const file = event.target.files[0]
      console.log('adImage-change--', file)
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = (e: any) => {
        this.additionalImagesPreview.push(e.target.result) // Preview additional image
        this.productForm.patchValue({
          additionalImages: reader.result,
        })
        // this.additionalImages.push(this.fb.control(reader.result)) // Add file to form array
      }
      // for (let file of files) {
      //   const reader = new FileReader()
      //   reader.readAsDataURL(file)

      //   // this.additionalImages.push(this.fb.control(reader.result)) // Add file to form array
      //   reader.onload = (e: any) => {
      //     console.log('forfile--', file, 'result--', reader.result)
      //     this.additionalImagesPreview.push(e.target.result) // Preview additional image
      //     this.additionalImages.push(this.fb.control(reader.result)) // Add file to form array
      //   }
      //   reader.readAsDataURL(file)
      // }
    } else {
      this.productForm.patchValue({ addAdditionalImages: null }) // Clear the form control if no files
    }
  }

  // Handle single image file change
  onFileChange(event: any) {
    const file = event.target.files[0]
    console.log('main image-change--', file)
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: any) => {
        // this.images = [e.target.result] // Preview main Product image
        this.images.push(e.target.result)
        this.productForm.patchValue({ img: reader.result }) // Set image file to form
      }
    } else {
      this.images = []
      this.productForm.patchValue({ img: null })
    }
  }

  // Handle video file change

  onVideoChange(event: any) {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = (e: any) => {
        this.videoPreview = e.target.result // Set video preview
        this.productForm.patchValue({ video: reader.result })
      }

      // Update form control value and clear error
      this.videoError = null
    } else {
      this.videoPreview = null
      this.productForm.patchValue({ video: null })
      this.videoError = null
    }

    // Trigger validation manually
    this.productForm.get('video')?.updateValueAndValidity()
  }

  // Getters for FormArrays to easily manage adding/removing items
  get additionalImages(): FormArray {
    return this.productForm.get('additionalImages') as FormArray
  }

  get features(): FormArray {
    return this.productForm.get('features') as FormArray
  }

  get size(): FormArray {
    return this.productForm.get('size') as FormArray
  }

  // Methods to add/remove items from arrays
  addAdditionalImage() {
    this.additionalImages.push(this.fb.control('', Validators.required))
  }

  removeAdditionalImage(index: number) {
    this.additionalImages.removeAt(index)
    this.additionalImagesPreview.splice(index, 1) // Remove preview
  }

  addFeature() {
    this.features.push(this.fb.control('', Validators.required))
  }

  removeFeature(index: number) {
    this.features.removeAt(index)
  }

  addSize() {
    this.size.push(this.fb.control('', Validators.required))
  }

  removeSize(index: number) {
    this.size.removeAt(index)
  }

  onSubmit(event: Event) {
    event.preventDefault() // Prevent the default form submission
    event.stopPropagation() // Stop event propagation

    if (this.productForm.valid) {
      console.log('addProduct-form', this.productForm.value)

      const product: any = {
        ...this.productForm.value,
        img: this.images,
        additionalImages: this.additionalImages.value,
        video: this.productForm.value.video,
      }
      console.log('addProduct-valid', product)

      this.productService.addProduct(product).subscribe(
        (response) => {
          console.log('Product added successfully!', response)
          this.openSuccessDialog('Product is saved successfully!')
        },
        (error) => {
          console.error('Error adding product', error)
          this.openSuccessDialog('Failed to save product. Please try again.')
        },
      )
    } else {
      console.log('product form invalid')
      this.productForm.markAllAsTouched()
    }
  }
  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: {
        message,
        callback: () => this.clearForm(), // Pass the callback to clear the form
      },
    })
  }

  clearForm(): void {
    this.productForm.reset({
      title: '',
      additionalImages: '',
      availability: '',
      category: '',
      color: '',
      currency: '',
      deliveryTime: '',
      description: '',
      features: '',
      img: '',
      isActive: '',
      price: '',
      priceDiscount: '',
      rating: '',
      returnPolicy: '',
      shipping_Cost: '',
      size: this.fb.array([]),
      specifications: this.fb.group({
        dimensions: '',
        material: '',
        weight: '',
      }),
      stock: '',
      vendorContact: '',
      vendorId: '',
      vendorName: '',
      video: '',
    })
  }

  // Custom file validator to check for file presence and types
  fileValidator(control: AbstractControl): ValidationErrors | null {
    const files = control.value
    if (!files || files.length === 0) {
      return { required: true } // Required error
    }

    const validExtensions = ['image/jpeg', 'image/png', 'image/gif'] // Allowed file types
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!validExtensions.includes(file.type)) {
        return { invalidFileType: true } // Invalid file type error
      }
    }

    return null // No errors
  }

  // Validator for price fields
  priceValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    const regex = /^\d+(\.\d{1,2})?$/ // Match a number with up to 2 decimal places
    if (value && !regex.test(value)) {
      return { invalidPrice: true }
    }
    return null
  }

  // Validator for rating field
  ratingValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    const rating = parseFloat(value)
    if (value && (isNaN(rating) || rating < 0 || rating > 5)) {
      return { invalidRating: true }
    }
    return null
  }

  // Validator for numeric fields
  numberValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value
    if (value && isNaN(value)) {
      return { invalidNumber: true }
    }
    return null
  }

  // validator for video files
  videoValidator(control: AbstractControl): ValidationErrors | null {
    const file = control.value
    if (file) {
      const validTypes = ['video/mp4', 'video/webm', 'video/ogg']
      const maxSize = 10 * 1024 * 1024 // 10 MB
      if (!validTypes.includes(file.type)) {
        return { invalidFileType: true }
      }
      if (file.size > maxSize) {
        return { invalidFileSize: true }
      }
    }
    return null
  }

  // Method to get form control errors for video
  getVideoError(): string | null {
    const control = this.productForm.get('video')
    if (control?.hasError('invalidFileType')) {
      return 'Invalid file type. Only MP4, WebM, and Ogg are allowed.'
    }
    if (control?.hasError('invalidFileSize')) {
      return 'File size exceeds 10 MB.'
    }
    return null
  }
}
