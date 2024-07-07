import { Component } from '@angular/core'

import { TeacherService } from '../services/teacher.service'
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
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css'],
})
export class AddTeacherComponent {
  teacherForm: FormGroup
  user: any
  images: string[] = []

  constructor(private fb: FormBuilder) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      img: [null, Validators.required],
      position: ['', Validators.required],

      subject: ['', Validators.required],
    })
  }
  ngOnInit(): void {
    const userData = localStorage.getItem('currentUser')

    if (userData) {
      this.user = JSON.parse(userData)
    }
  }

  getControl(value: any) {
    return this.teacherForm.get(value)
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
    if (this.teacherForm.valid) {
      console.log('tform', this.teacherForm.value)
      // You can add your logic to send this data to your server here
    }
  }
}
