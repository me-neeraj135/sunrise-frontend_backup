import { Component } from '@angular/core'

import { EventService } from '../../services/event.service'
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
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent {
  eventForm: FormGroup
  user: any
  images: string[] = []
  currentYear: number = new Date().getFullYear()

  banner: any = {
    pagetitle: 'Add New EVENT',
    bg_image: 'assets/images/banner/bnr5.jpg',
    title: 'Add New Event',
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

  yearValidator(control: AbstractControl): ValidationErrors | null {
    const year = control.value
    const currentYear = new Date().getFullYear()
    if (year < 1900 || year > currentYear) {
      return { invalidYear: true }
    }
    return null
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private eventService: EventService,
    private dialog: MatDialog,
  ) {
    this.eventForm = this.fb.group({
      organizerName: ['', Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required],

      aboutEvent: ['', Validators.required],
      eventHighLight: ['', Validators.required],

      eventAddress: ['', Validators.required],
      eventTitle: ['', Validators.required],
      eventLabel: ['', Validators.required],
      eventImage: [null],
      eventYear: ['', [Validators.required, this.yearValidator]],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      isActive: [1],
    })
  }
  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser')

    if (userData) {
      this.user = JSON.parse(userData)
    }
  }
  getControl(value: any) {
    return this.eventForm.get(value)
  }

  onFileChange(event: any) {
    this.images = [] // Reset images array

    if (event.target.files.length > 0) {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.readAsDataURL(file)

      console.log('evt-valid--', this.eventForm)
      reader.onload = (e: any) => {
        this.images.push(e.target.result) // Preview image
        this.eventForm.patchValue({ eventImage: reader.result }) // Clear the form control if no files
      }
    } else {
      this.eventForm.patchValue({ eventImage: null }) // Clear the form control if no files
    }
  }

  onSubmit() {
    console.log('Form Submitted!', this.eventForm.valid)

    if (this.eventForm.valid) {
      console.log('Form Submitted!', this.eventForm)
      this.eventService.addEvent(this.eventForm.value).subscribe(
        (response) => {
          console.log('event added successfully!', response)
          this.openSuccessDialog('event is saved successfully!')
        },
        (error) => {
          this.openSuccessDialog('Failed to save event. Please try again.')
        },
      )
    } else {
      console.log('Form is invalid', this.eventForm)
      this.eventForm.markAllAsTouched() // Mark all fields as touched to show validation messages
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
    this.eventForm.reset({
      organizerName: '',
      startDate: '',
      endDate: '',
      startTime: '',
      endTime: '',

      aboutEvent: '',
      eventAddress: '',
      eventTitle: '',
      eventLabel: '',
      eventImage: null,
      eventHighLight: '',
      eventYear: '',
      email: '',
      phone: '',
      isActive: [1],
    })
  }
}
