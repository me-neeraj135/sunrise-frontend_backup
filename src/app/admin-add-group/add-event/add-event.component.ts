import { Component } from '@angular/core'

import { EventService } from '../../services/event.service'
import {
  FormBuilder,
  FormGroup,
  NgForm,
  Validators,
  FormControl,
} from '@angular/forms'
import { Router } from '@angular/router'
import { throwError } from 'rxjs'

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css'],
})
export class AddEventComponent {
  eventForm: FormGroup
  user: any
  images: string[] = []
  constructor(private fb: FormBuilder, private router: Router) {
    this.eventForm = this.fb.group({
      OrangierName: ['', Validators.required],
      startDate: ['', Validators.required],
      time: ['', Validators.required],
      email: ['', Validators.required],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      aboutEvent: ['', Validators.required],
      img: [null, Validators.required],
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
    if (this.eventForm.valid) {
      console.log('eventForm', this.eventForm.value)
      // You can add your logic to send this data to your server here
    }
  }
}
