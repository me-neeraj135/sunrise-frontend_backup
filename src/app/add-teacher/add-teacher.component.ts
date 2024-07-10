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
  emailRegex = `^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$`
  genderOptions = ['Male', ' Female', 'Other']
  constructor(private fb: FormBuilder) {
    this.teacherForm = this.fb.group({
      name: new FormControl('', [Validators.required]),
      age: new FormControl(this.genderOptions[0], [Validators.required]),
      gender: new FormControl('', [Validators.required]),

      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(13),
        Validators.pattern(this.emailRegex),
      ]),
      img: new FormControl(null, [Validators.required]),
      position: new FormControl('', [Validators.required]),
      subject: new FormControl('', [Validators.required]),
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
  onSelectChange(event: any) {
    console.log('Selected value:', event.target.value)
    this.teacherForm.value.gender = event.target.value
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files
      this.teacherForm.value.img = files
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          this.images.push(e.target.result)
        }
        reader.readAsDataURL(files[i])
      }
    }
  }
  addTeacher() {
    console.log('tform', this.teacherForm.value, this.teacherForm)
    if (this.teacherForm.valid) {
    }
  }
}
