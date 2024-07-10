import { Component } from '@angular/core'
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
  selector: 'app-add-class',
  templateUrl: './add-class.component.html',
  styleUrls: ['./add-class.component.css'],
})
export class AddClassComponent {
  classForm: FormGroup
  user: any
  images: string[] = []

  constructor(private fb: FormBuilder) {
    this.classForm = this.fb.group({
      className: new FormControl('', [Validators.required]),

      classStudent: new FormControl('', [Validators.required]),
      aboutClass: new FormControl('', [Validators.required]),
      classSubject: new FormControl('', [Validators.required]),
      classImage: new FormControl('', [Validators.required]),
    })
  }

  getControl(value: any) {
    return this.classForm.get(value)
  }
  onFileChange(event: any) {
    if (event.target.files && event.target.files.length) {
      const files = event.target.files
      this.classForm.value.img = files
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader()
        reader.onload = (e: any) => {
          this.images.push(e.target.result)
        }
        reader.readAsDataURL(files[i])
      }
    }
  }

  addClass() {
    console.log('tform', this.classForm.value, this.classForm)
    if (this.classForm.valid) {
    }
  }
}
