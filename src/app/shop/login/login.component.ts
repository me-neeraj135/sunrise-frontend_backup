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

import { AuthService } from 'src/app/services/auth.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  banner: any = {
    pagetitle: 'Login',
    bg_image: 'assets/images/banner/bnr4.jpg',
    title: 'Login',
  }

  integerRegex = /^\d+$/
  emailRegex = `^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$`

  loginForm: FormGroup
  isLoginSuccess: boolean = false

  constructor(
    private authService: AuthService,
    private fb: FormBuilder,
    private router: Router,
  ) {
    this.loginForm = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(30),
        Validators.minLength(13),
        Validators.pattern(this.emailRegex),
      ]),

      password: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(15),
      ]),
    })
  }

  ngOnInit(): void {}
  // validation function

  getControl(value: any) {
    return this.loginForm.get(value)
  }

  onLogin() {
    console.log('loginForm', this.loginForm.value)

    if (this.loginForm.valid) {
      this.authService
        .login(this.loginForm.value.email, this.loginForm.value.password)
        .subscribe(
          (response) => {
            // Handle successful login
            console.log('Login successful', response)
            if (response === null) {
              console.log('user not registered')
            } else {
              setTimeout(() => {
                this.router.navigate(['/'])
              }, 2000)
            }
          },
          (error) => {
            // Handle login error
            console.error('Login failed', error)
          },
        )
    }
  }
}
