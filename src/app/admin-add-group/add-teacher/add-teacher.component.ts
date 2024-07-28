import { Component, OnInit } from '@angular/core';
import { TeacherService } from 'src/app/services/teacher.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { SuccessDialogComponent } from 'src/app/util/success-dialog/success-dialog.component';

@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.css']
})
export class AddTeacherComponent implements OnInit {
  teacherForm: FormGroup;
  user: any;
  images: string[] = [];
  emailRegex = `^(?=.{1,256})(?=.{1,64}@.{1,255}$)[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,4}$`;
  genderOptions = ['Male', 'Female'];

  banner: any = {
    pagetitle: 'Add New Teacher',
    bg_image: 'assets/images/banner/bnr5.jpg',
    title: 'Add New Teacher',
  };

  constructor(
    private fb: FormBuilder,
    private teacherService: TeacherService,
    public dialog: MatDialog
  ) {
    this.teacherForm = this.fb.group({
      name: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['Male', Validators.required],
      position: ['', Validators.required],
      subject: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      about: [''],
      duty: [''],
      experience: [''],
      img: ['assets/images/our-team/pic1.jpg'], // Placeholder for image
      isActive: [1]
    });
  }

  ngOnInit(): void {}

  getControl(controlName: string) {
    return this.teacherForm.get(controlName);
  }

  onFileChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.teacherForm.patchValue({
          img: reader.result
        });
      };
    }
  }

  addTeacher() {
    if (this.teacherForm.valid) {
      this.teacherService.addTeacher(this.teacherForm.value).subscribe(
        response => {
          console.log('Teacher added successfully!', response);
          this.openSuccessDialog('Teacher is saved successfully!');
        },
        error => {
          console.error('Error adding teacher:', error);
          this.openSuccessDialog('Failed to save teacher. Please try again.');
        }
      );
    } else {
      this.teacherForm.markAllAsTouched(); // Mark all fields as touched to show validation messages
    }
  }
  openSuccessDialog(message: string): void {
    this.dialog.open(SuccessDialogComponent, {
      data: {
        message,
        callback: () => this.clearForm() // Pass the callback to clear the form
      }
    });
  }

  clearForm(): void {
    this.teacherForm.reset({
      name: '',
      age: '',
      gender: 'Male',
      position: '',
      subject: '',
      email: '',
      about: '',
      duty: '',
      experience: '',
      img: 'assets/images/our-team/pic1.jpg', // Reset to placeholder
      isActive: 1
    });
  }
}
