import { Component } from '@angular/core';
import { FormBuilder, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  banner : any = {
		pagetitle: "Register",
		bg_image: "assets/images/banner/bnr5.jpg",
		title: "Register",
	}
  registrationForm: FormGroup;
  IsRegistrationSuccess: boolean = false;

  constructor(private fb: FormBuilder,private userService: UserService, private router: Router) {
    this.registrationForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  submitForm(): void {
    if (this.registrationForm.valid) {
      this.userService.addUser(this.registrationForm.value).subscribe(
        (response) => {
          console.log('User added successfully', response);
          this.IsRegistrationSuccess = true;
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 2000); // Redirect to login after 2 seconds
          // Reset form after successful submission
          //this.registrationForm.reset();
        },
        (error) => {
          console.error('Error adding user', error);
        }
      );
    }
  }
}
