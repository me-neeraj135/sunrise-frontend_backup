import { Component } from '@angular/core'
import { ClassServiceService } from 'src/app/services/class-service.service'
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'
import { MatDialog } from '@angular/material/dialog'
import { SuccessDialogComponent } from 'src/app/util/success-dialog/success-dialog.component'
@Component({
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
})
export class AddClassComponent {
  classForm: FormGroup
  user: any
  images: string[] = []

  banner: any = {
    pagetitle: 'Add New Class',
    bg_image: 'assets/images/banner/bnr5.jpg',
    title: 'Add New Class',
  }

  // Custom file validator to check for file presence and types
  fileValidator(control: AbstractControl): ValidationErrors | null {
    const files = control.value
    console.log('files-v-', files)
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
  constructor(
    private fb: FormBuilder,
    private class_Service: ClassServiceService,
    private dialog: MatDialog,
  ) {
    this.classForm = this.fb.group({
      className: ['', Validators.required],
      classStudent: ['', Validators.required],
      classSubject: ['', Validators.required],
      aboutClass: ['', Validators.required],
      classImage: [null],
      isActive: [1],
    })
  }

  getControl(value: any) {
    return this.classForm.get(value)
  }

  onFileChange(event: any) {
    // Reset images array

    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      // Set the form control value to the selected files
      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = (e: any) => {
        this.images.push(e.target.result) // Preview image
        this.classForm.patchValue({ classImage: reader.result })
      }
    } else {
      this.classForm.patchValue({ classImage: null }) // Clear the form control if no files
    }
  }

  onSubmit() {
    if (this.classForm.valid) {
      console.log('Form Submit-value!', this.classForm.value)

      this.class_Service.addClass(this.classForm.value).subscribe(
        (response) => {
          console.log('class added successfully!', response)
          this.openSuccessDialog('class is saved successfully!')
        },
        (error) => {
          console.error('Error adding class:', error)
          this.openSuccessDialog('Failed to save class. Please try again.')
        },
      )
    } else {
      console.log('Form is invalid')
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
    this.classForm.reset({
      className: '',
      classStudent: '',
      classSubject: '',
      aboutClass: '',
      classImage: null,
      isActive: 1,
    })
  }
}
